import React, { useContext } from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text, FlatList } from 'react-native';
import { getRentBook, removeBook } from '../fetch/BookEventFetch';
import { AuthContext } from '../hooks/AuthProvider';
import { BookRentContext } from '../contexts/BookRentContext';

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

const BookRentCard = ({ item }) => {

  const {user} = useContext(AuthContext);
  const {setBook, setCount} = useContext(BookRentContext);

  async function delete_book(){
    await removeBook(user.id, item.id);
    const data = await getRentBook(user.id);
    setBook(data);
    setCount(data.length || 0);
  }

    return (
      <View style={styles.itemContainer}>
        <Image src={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={{fontWeight : '600', marginVertical : 15}}>{`До ${item.to.slice(8, 10)} ${months[parseInt(item.to.slice(5, 7))-1]}`}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {delete_book()}}>
          <Text>Сдать Книгу</Text>
        </TouchableOpacity>
      </View>
    );
};

const BookDetails = () => {
    const {book} = useContext(BookRentContext);
  return (
    <View style={{marginBottom : 100 }}>
        <Text style={{marginVertical : 20, fontSize : 20, fontWeight : '500', textAlign : 'center'}}>Книги взятые</Text>
        <FlatList
        data={book}
        numColumns={2}
        columnWrapperStyle={{gap : 2, paddingHorizontal : 10}}
        keyExtractor={(item) => item.id.toString() + Math.random() * 100}
        renderItem={({ item }) => <BookRentCard item={item} />}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    display : 'flex',
    width : 190,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
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
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ffc300',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  }
});

export default BookDetails;
