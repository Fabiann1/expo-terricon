import React, { useContext } from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text, FlatList } from 'react-native';
import { BookEventContext } from '../contexts/BookEventContext';
import { AuthContext } from '../hooks/AuthProvider';
import { getRegEvent, removeReg } from '../fetch/BookEventFetch';

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

const BookEventCard = ({ item }) => {

  const {user} = useContext(AuthContext);
  const {setEvent, setCount} = useContext(BookEventContext);

  async function delete_reg(){
    await removeReg(user.id, item.id);
    const data = await getRegEvent(user.id);
    setEvent(data);
    setCount(data.length || 0);
  }

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title}>{item.to.slice(5, 7) === item.from.slice(5, 7) && item.to.slice(8) === item.from.slice(8) ? `${parseInt(item.from.slice(8))} ${months[parseInt(item.from.slice(5, 7))-1]}` : `C ${parseInt(item.from.slice(8))} ${months[parseInt(item.from.slice(5, 7))-1]}           До ${parseInt(item.to.slice(8))} ${months[parseInt(item.to.slice(5, 7))-1]}`}</Text>
        <TouchableOpacity style={{marginVertical : 5, paddingHorizontal : 10, paddingVertical : 5, backgroundColor : '#ffc300'}} onPress={() => {delete_reg()}}>
            <Text style={{fontSize : 10}}>Удалить</Text>
        </TouchableOpacity>
      </View>
    );
};

const EventDetails = () => {
    const {event} = useContext(BookEventContext);
  return (
    <View>
        <Text style={{marginVertical : 30, borderBottomWidth : 1, paddingBottom : 15, fontSize : 20, fontWeight : '500', textAlign : 'center'}}>Записанные Событие:</Text>
        <FlatList
        data={event}
        keyExtractor={(item) => item.id.toString() + Math.random() * 100}
        renderItem={({ item }) => <BookEventCard item={item} />}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    display : 'flex',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    border : 1,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ffc300',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  }
});

export default EventDetails;