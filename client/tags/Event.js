import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getEvents, getRegEvent } from '../fetch/BookEventFetch';
import EventCard from './EventCard'
import { AuthContext } from '../hooks/AuthProvider';
import { BookEventContext } from '../contexts/BookEventContext';

const Event = ({navigation}) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthContext);
    const { count, setEvent } = useContext(BookEventContext);

  useEffect(() => {
    async function fetch(){
      const data = await getEvents();
      if(data) {
        setEvents(data);
        setLoading(false);
        const new_data = await getRegEvent(user.id);
        setEvent(new_data);
      }
    }
    fetch()
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
                <TouchableOpacity onPress={() => {navigation.navigate('EventDetails')}} style={{width : 30, height : 30, backgroundColor : 'white', borderRadius : 15}}>
                    <View style={{textAlign : 'center', width : 15, height : 15, marginLeft : 15, borderRadius : 10, backgroundColor : 'red'}}>
                    <Text style={{marginLeft : 4, fontSize : 10, color : 'white', fontWeight : '500'}}>{count}</Text>
                    </View>
                </TouchableOpacity>
            </View>
          <FlatList
          data={events}
          numColumns={1}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard item={item} navigation={navigation} />}/>
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

export default Event