
import React from "react"
import { createContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import {apiService}from 'api-service'
import { useError } from './errorContext'
interface AuthContextType{
    user:string | null,
    token: string | null,
    pin: string | null,
    savePin:(pin:string)=>void,
    login:(email:string, password:string)=>Promise<void>,
    logout:()=>void,
    isLoading:boolean
} 

export const AuthContext = createContext<AuthContextType>({}as AuthContextType)

export const AuthProvider = ({children}:{children:React.ReactNode})=> {
    const { showError } = useError(); 
    const [user, setUser] = useState <string | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [pin, setPin] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        const loadStorage = async()=>{
            const [sUser, sToken, sPin] = await Promise.all([
                AsyncStorage.getItem('user'),
                AsyncStorage.getItem('token'),
                AsyncStorage.getItem('pin')
            ])
            await new Promise(resolve => setTimeout(resolve, 2000));
            if (sUser) setUser(JSON.parse(sUser));
            if (sToken) setToken (sToken)
            if (sPin) setPin (sPin)
            setIsLoading(false);
        }
        loadStorage()
    }, [])
    const login = async (email:string, password:string) =>{
        try {
            const data = await apiService.login(email, password)
            await AsyncStorage.setItem('token', data.access_token)
            await AsyncStorage.setItem('user', JSON.stringify(data.user))
            setToken(data.access_token)
            setUser(data.user);
        } catch (e){
            showError(e.message)
        }
    }
    const logout = async () => {
    try {
        if (token) {
            await apiService.logout(token);
        }
    } catch (e) {
        showError(e.message)
    } finally {

        await Promise.all([
            AsyncStorage.removeItem('user'),
            AsyncStorage.removeItem('token'),
            AsyncStorage.removeItem('pin')
        ]);
        setToken(null);
        setUser(null);
        setPin(null);
    }
};

    const savePin = (newPin:string)=>{
        AsyncStorage.setItem('pin',newPin)
        setPin(newPin)
    }
    return (
        <AuthContext.Provider value={{login, logout, savePin, pin, token, user, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}