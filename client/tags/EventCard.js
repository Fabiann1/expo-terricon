import React, { useContext } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { regEvent, getRegEvent } from '../fetch/BookEventFetch';
import { AuthContext } from '../hooks/AuthProvider';
import { BookEventContext } from '../contexts/BookEventContext';

const months = [
    "Января",   // January
    "Февраля",  // February
    "Марта",     // March
    "Апреля",   // April
    "Мая",      // May
    "Июня",     // June
    "Июля",     // July
    "Августа",   // August
    "Сентября", // September
    "Октября",  // October
    "Ноября",   // November
    "Декабря"   // December
  ];
  

const EventCard = ({ item }) => {

    const {user} = useContext(AuthContext);
    const {setEvent, setCount} = useContext(BookEventContext);

    async function reg(e){
        e.preventDefault();
        await regEvent(user.id, item.id);
        const data = await getRegEvent(user.id);
        setCount(data.length || 0);
        setEvent(data);
    }

    return (
    <View style={styles.itemContainer}>
      <Image source={require('../assets/book_back.jpg')} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={{fontWeight : '600', marginVertical : 15}}>{item.to.slice(5, 7) === item.from.slice(5, 7) && item.to.slice(8) === item.from.slice(8) ? `${parseInt(item.from.slice(8))} ${months[parseInt(item.from.slice(5, 7))-1]}` : `C ${parseInt(item.from.slice(8))} ${months[parseInt(item.from.slice(5, 7))-1]}           До ${parseInt(item.to.slice(8))} ${months[parseInt(item.to.slice(5, 7))-1]}`}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={(e) => {reg(e)}}>
        <Text>Записатся</Text>
      </TouchableOpacity>
    </View>
    )
};


  const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'column',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    image: {
      borderTopLeftRadius : 10,
      borderTopRightRadius : 10,
      width: 'auto',
      height: 100,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
      borderWidth : 0.2,
      borderTopWidth : 0,
      borderBottomWidth : 0,
      borderColor : '#ffc300',
      marginRight : 10,
      padding : 8,
      borderBottomLeftRadius : 10,
      borderBottomRightRadius : 10
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom : 5,
    },
    description: {
      fontSize: 10,
      color: '#666',
    },
    amount: {
      fontSize: 12,
      color: '#333',
    },
    button : {
        backgroundColor : '#ffc300',
        paddingVertical : 10,
        paddingHorizontal : 15,
        borderRadius : 10,
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        marginHorizontal : 40,
        height : 50,
        marginVertical : 10
    }
  });

export default EventCard