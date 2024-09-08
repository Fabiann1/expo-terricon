import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getBooks } from '../../fetch/BookEventFetch';
import BookCard from '../../tags/BookCard';


function Home({navigation}) {

    return (
      <View>
        <Image source={require('../../assets/logo.png')} style={style.img}/>
        <Text style={style.title}>Добро Пожаловать</Text>
        <View style={style.container}>
          <TouchableOpacity style={style.box} onPress={() => {navigation.navigate('Book')}}>
            <Image source={require('../../assets/books.png')}/>
            <Text style={style.subtitle}>Книги</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.box} onPress={() => {navigation.navigate('Event')}}>
          <Image source={require('../../assets/event.png')}/>
          <Text style={style.subtitle}>Событие</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.box} onPress={() => {navigation.navigate('Wordle')}}>
          <Image source={require('../../assets/game.png')}/>
          <Text style={style.subtitle}>Игра</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.box}>
          <Image source={require('../../assets/navigation.png')}/>
          <Text style={style.subtitle}>Навигация</Text>
          </TouchableOpacity>
      </View>
      </View>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center', 
    flex: 1, 
  },
  box: {
    width: '40%',
    height: 150, 
    margin: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowRadius : 10,
    borderRadius : 10
  },
  img : {
    width : 100,
    height : 100,
    marginHorizontal : 'auto'
  },
  title : {
    fontWeight : '500',
    fontSize : 20,
    textAlign : 'center',
    marginBottom : 30
  },
  subtitle : {
    fontWeight : '500',
    fontSize : 20,
    marginTop : 3,
  }
})

export default Home