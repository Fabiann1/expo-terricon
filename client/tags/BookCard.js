import React, { useContext, useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, Platform } from 'react-native'
import { getRentBook, postBook } from '../fetch/BookEventFetch';
import { AuthContext } from '../hooks/AuthProvider';
import { BookRentContext } from '../contexts/BookRentContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookCard = ({ item }) => {

    const {user} = useContext(AuthContext);
    const {setBook, setCount} = useContext(BookRentContext);

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false); 
  
    const onChange = ({type}, selectedDate) => {
      if (type == "set") {
        const currentDate = selectedDate;
        setDate(currentDate);
        if (Platform.OS === 'android') {
          setShow(!show);
          setDate(currentDate)
        }
      } else {
        setShow(!show);
      }
    }

    async function booking(e){
        e.preventDefault();
        await postBook(item.id, user.id, date.toISOString().slice(0, 10));
        const data = await getRentBook(user.id);
        setCount(data.length || 0);
        setBook(data);
    }

    return (
    <View style={styles.itemContainer}>
      <Image src={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.amount}>Осталось : {item.limit}</Text>
      </View>
      <View>
      <TouchableOpacity style={styles.button} onPress={(e) => {booking(e)}}>
        <Text>Добавить</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {setShow(true)}}>
        <Text>Дата</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      </View>
    </View>
    )
};


  const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    description: {
      fontSize: 14,
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
      alignItems : 'center',
      borderRadius : 10,
      height : 40,
      marginTop : 20
    }
  });

export default BookCard