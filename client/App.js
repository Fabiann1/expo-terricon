import React, { useEffect, useContext, useState, useRef } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthProvider, { AuthContext } from './hooks/AuthProvider';
import BookRentProvider from './contexts/BookRentContext';
import BookEventProvider  from './contexts/BookEventContext';
import LoginPage from './components/LoginPage';
import SignPage from './components/SignPage';
import Home from './components/Pages/Home';
import Settings from './components/Pages/Settings';
import Book from './tags/Book';
import BookDetails from './tags/BookDetails';
import Navigation from './components/Pages/Navigation';
import Event from './tags/Event';
import EventDetails from './tags/EventDetails';
import Wordle from './tags/Wordle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRegEvent, getRentBook } from './fetch/BookEventFetch';

// Notification handler configuration
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} options={{ title: 'Главная' }} />
    <Tab.Screen name="Profile" component={Settings} options={{ title: 'Профиль' }} />
  </Tab.Navigator>
);

const MainStack = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="Home" component={Home} options={{ title: 'Главная' }} />
    <Stack.Screen name="Book" component={Book} options={{ title: 'Книги' }} />
    <Stack.Screen name="Profile" component={Settings} options={{ title: 'Профиль' }} />
    <Stack.Screen name="BookDetails" component={BookDetails} options={{ title: 'Подробности' }} />
    <Stack.Screen name="Navigation" component={Navigation} options={{ headerShown: false }} />
    <Stack.Screen name="Event" component={Event} options={{ title: 'Событие' }} />
    <Stack.Screen name="EventDetails" component={EventDetails} options={{ title: 'Подробности' }} />
    <Stack.Screen name="Wordle" component={Wordle} options={{ title: 'Игра' }} />
  </Stack.Navigator>
);

const AuthorizeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignUp" component={SignPage} />
    <Stack.Screen name="Login" component={LoginPage} />
  </Stack.Navigator>
);

const getExpoPushToken = async () => {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
    const pushTokenData = await Notifications.getExpoPushTokenAsync();
    return pushTokenData.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

const Root = () => {
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    if (token && user) {
      sendLoginNotification();
    }
  }, [token, user]);

  const sendLoginNotification = async () => {
    const expoPushToken = await getExpoPushToken();
    if (expoPushToken) {
      sendPushNotification(
        expoPushToken,
        'Добро пожаловать!',
        `Привет, ${user.email}! Вы успешно вошли в систему.`
      );
    }
  };

  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthorizeStack />}
    </NavigationContainer>
  );
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken, title, desc) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: desc,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    console.log('android')
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (true) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      '030e0f7e-1065-4312-ac7c-3c002a4bae3b'
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


      
    useEffect(() => {
      const interval = setInterval(async () => {
        const user_object = await AsyncStorage.getItem('user');
        const user = JSON.parse(user_object);
        const book = await getRentBook(user.id);
        if (expoPushToken === '' || !book) { console.log(expoPushToken)}
        else {
        book.forEach(b => {
        const today = new Date();
        const timeDiff = Math.ceil((new Date(b.to) - today) / (1000 * 60 * 60 * 24));
        if (timeDiff < 2 || timeDiff === 3){
          sendPushNotification(expoPushToken, `Задолженость книги : ${b.title.slice(0, 15)}...`, `Не забудьте вернуть книгу ${!timeDiff ? 'сегодня' : 'через ' + timeDiff + ' дней'}`)
        }
      })
    }
      }, 100000); 
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      const interval = setInterval(async () => {
        const user_object = await AsyncStorage.getItem('user');
        const user = JSON.parse(user_object);
        const event = await getRegEvent(user.id);
        if (expoPushToken === '' || !event) { return } 
        else {
        event.forEach(b => {
        const today = new Date();
        const timeDiff = Math.ceil((new Date(b.from) - today) / (1000 * 60 * 60 * 24));
        console.log("Книга день :", timeDiff);
        if (timeDiff < 3 || timeDiff === 3){
          sendPushNotification(expoPushToken, `${b.title}`, `Мероприятие пройдёт через: ${!timeDiff ? 'сегодня' : 'через ' + timeDiff + ' дней'}`)
        }
      })
    }
      }, 1000); 
      return () => clearInterval(interval);
    }, []);

  return (
    <AuthProvider>
      <BookRentProvider>
        <BookEventProvider>
          <Root />
        </BookEventProvider>
      </BookRentProvider>
    </AuthProvider>
  );
}
