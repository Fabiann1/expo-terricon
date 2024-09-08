import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getBooks, getRentBook } from '../fetch/BookEventFetch';
import BookCard from './BookCard'
import { AuthContext } from '../hooks/AuthProvider';
import { BookRentContext } from '../contexts/BookRentContext';

const Book = ({navigation}) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthContext);
    const { count, setBook } = useContext(BookRentContext);

  useEffect(() => {
    async function fetch(){
      try {
        const booksData = await getBooks();
        setBooks(booksData);
        const rentedBooksData = await getRentBook(user.id);
        setBook(rentedBooksData);
      } catch (e) {
        console.error('Error', e);
      } finally {
        setLoading(false);
      }
    }
    fetch();
    setLoading(false);
  }, [])

  if (loading) {
    return (
      <View style={{flex : 1, justifyContent : 'center', alignContent : 'center'}}>
        <Text>Loading...</Text>
      </View>
    )
  }

    return (
      <View style={{flex : 1}}>
            <View style={style.prof}>
                <Text style={style.text}>{user.first_name} {user.last_name}</Text>
                <TouchableOpacity onPress={() => {navigation.navigate('BookDetails')}} style={{width : 30, height : 30, backgroundColor : 'white', borderRadius : 15}}>
                    <View style={{textAlign : 'center', width : 15, height : 15, marginLeft : 15, borderRadius : 10, backgroundColor : 'red'}}>
                    <Text style={{marginLeft : 4, fontSize : 10, color : 'white', fontWeight : '500'}}>{count}</Text>
                    </View>
                </TouchableOpacity>
            </View>
          <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookCard item={item} navigation={navigation} />}/>
      </View>
  )
}

const style = StyleSheet.create({
    prof : {
        height: 60,
        backgroundColor: '#ffc300',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    text : {
        fontSize : 20,
        fontWeight : '600'
    }
})

export default Book