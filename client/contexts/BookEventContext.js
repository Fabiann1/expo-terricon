import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react'
import { getRegEvent  } from '../fetch/BookEventFetch';

export const BookEventContext = createContext({});

export default function BookEventProvider({children}) {
  const [event, setEvent] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
      async function fetch(){
          let user_object = await AsyncStorage.getItem('user');
          if (user_object){
              user = JSON.parse(user_object);
              const data = await getRegEvent(user.id);
              setCount(data.length || 0);
              setEvent(data);
          }
      }
      fetch()
  },[])

  return (
      <BookEventContext.Provider value={{event, setEvent, count, setCount}}>
          {children}
      </BookEventContext.Provider>
)
}