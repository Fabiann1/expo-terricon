import React, { useContext, useState, useEffect } from 'react'
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../hooks/AuthProvider';
import BookShelf from '../assets/bookshelf.jpg'
import { Link } from '@react-navigation/native';
import { login } from '../fetch/AuthFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginPage() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const {setToken, setUser} = useContext(AuthContext);

    useEffect(() => {
      async function fetch(){
        const token = await AsyncStorage.getItem('token');
        const user_object = await AsyncStorage.getItem('user');
        if (user_object && token) {
          const user = JSON.parse(user_object);
          
          setUser(user);
          setToken(token)
        }
      }
      fetch()
    },[])

    async function submit(e) {
      e.preventDefault();
      const rec = await login({password : password, email : email});
      if (rec.status){
        await AsyncStorage.setItem('token', rec.token);
        await AsyncStorage.setItem('user', JSON.stringify(rec.user));
        setUser(rec.user);
        setToken(rec.token);
      }
    }

    return (
        <View style={style.container}>
        <Image source={BookShelf} style={style.img}/>
        <View style={style.login}>
          <Text style={style.h1}>Вход</Text>
          <TextInput style={style.textInput} placeholder='Email' onChangeText={(e) => setEmail(e)}/>
          <TextInput style={style.textInput} placeholder='Password' onChangeText={(e) => setPassword(e)}/>
          <TouchableOpacity style={style.button} onPress={(e) => submit(e)}>
            <Text>Войти</Text>
          </TouchableOpacity>
          <Link to='/SignUp'>Нету аккаунт?</Link>
        </View>
    </View>
        
      )
}

const style = StyleSheet.create({
    container : {
      flex : 1,
      flexDirection : 'column',
    },
    img : {
      zIndex : -1,
      position : 'absolute',
    },
    login : {
      flex : 1,
      gap : 20,
      alignItems : 'center',
      width : 'auto',
      height : 450,
      backgroundColor : 'white',
      borderTopLeftRadius : 50,
      marginTop : 250,
      paddingHorizontal : 20
    },
    h1 : {
      marginTop : 20,
      fontSize : 30,
      fontWeight : '400',
      marginBottom : 20
    },
    textInput : {
      width : 300,
      paddingHorizontal : 10,
      overflow : 'hidden',
      paddingVertical : 5,
      height : 40,
      borderWidth : 1,
      borderRadius : 10,
      borderColor : '#ffc300',
    },
    button : {
      width : 'auto',
      height : 'auto',
      paddingHorizontal : 50,
      paddingVertical : 10,
      borderRadius : 10,
      fontWeight : '300',
      backgroundColor : '#ffc300'
    }
  })


export default LoginPage