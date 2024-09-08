import React, { useContext, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../../hooks/AuthProvider';

const Settings = () => {
    const {user} = useContext(AuthContext);

  return (
    <View>
        <View style={style.container}>
        <View style={style.profile}>
            <View style={style.img}>
                <Text style={{color : 'white', fontSize : 30}}>{user.first_name[0]}{user.last_name[0]}</Text>
            </View>
            <Text style={{fontSize : 30, fontWeight : '500'}}>{user.first_name} {user.last_name}</Text>
        </View>
        </View>
    </View>
  )
}

const style = StyleSheet.create({
    img : {
        padding : 15,
        width : 80,
        height : 80,
        borderRadius : 50,
        backgroundColor : 'black',
    },
    container : {
        flex : 1,
        flexDirection : 'row',
    },
    profile : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
        height : 100,
        paddingVertical : 10,
        width : 'auto',
        backgroundColor : '#DCDCDC',
        
    }
})

export default Settings