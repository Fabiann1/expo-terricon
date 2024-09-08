import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react'
import { getRentBook } from '../fetch/BookEventFetch';
import * as Notifications from 'expo-notifications';

export const BookRentContext = createContext({});

export default function BookRentProvider({children}) {
    const [book, setBook] = useState([]);
    const [count, setCount] = useState(0);
    

    useEffect(() => {
        async function fetch(){
            let user_object = await AsyncStorage.getItem('user');
            if (user_object){
                user = JSON.parse(user_object);
                const data = await getRentBook(user.id);
                setCount(data.length || 0);
                setBook(data);
            }
        } 
        fetch()
    },[])

    return (
        <BookRentContext.Provider value={{ book, setBook, count, setCount}}>
            {children}
        </BookRentContext.Provider>
  )
}