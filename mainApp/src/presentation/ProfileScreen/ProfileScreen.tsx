import React, { useContext } from 'react'
import {SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../data/authContext'
import {Text} from 'react-native'
import { Button } from 'uikit'
const ProfileScreen = () => {
    const {user, logout} = useContext(AuthContext)
  return (
    <SafeAreaView>
        <Text>Анастасия</Text>
        <Button title='Выйти' onPress={logout}/>
    </SafeAreaView>
  )
}

export default ProfileScreen
