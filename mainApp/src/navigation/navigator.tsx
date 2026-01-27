import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import React, { useContext } from 'react'
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
import { AuthContext } from '../data/authContext'
import LoginScreen from '../presentation/LoginScreen/LoginScreen'
import RegisterScreen from '../presentation/RegisterScreen/RegisterScreen'
import PasswordScreen from '../presentation/PasswordScreen/PasswordScreen'
import CreatePinScreen from '../presentation/CreatePinScreen/CreatePinScreen'
import MainScreen from '../presentation/MainScreen/MainScreen'
export type RootStackParamList ={
    LoginScreen:undefined,
    RegisterScreen:undefined,
    CreatePinScreen:undefined,
    PasswordScreen:{userData:{email:string, firstName:string, lastName:string, birthDate:Date, gender:string, patronymic:string}},
    MainApp:undefined
}
export type TabParamList = {

}

export const TabNavigator = ()=>{
    return (
        <Tab.Navigator>
            <Tab.Screen name='MainScreen' component={MainScreen}/>
        </Tab.Navigator>
    )
}
export const MainNavigator = ()=>{
    const {pin, token} = useContext(AuthContext)
    return (
        <Stack.Navigator>
            {/* {!token ? ( */}
                <>
                    <Stack.Screen name='LoginScreen' component={LoginScreen}/>
                    <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
                    <Stack.Screen name='PasswordScreen' component={PasswordScreen}/>
                </>
            {/* ) : !pin ? ( */}
                <>
                    <Stack.Screen name='CreatePinScreen' component={CreatePinScreen} />
                </>
            {/* ) : ( */}
                <>
                    <Stack.Screen name='MainApp' component={TabNavigator}/>
                </>
            {/* ) } */}
        </Stack.Navigator>
    )
}