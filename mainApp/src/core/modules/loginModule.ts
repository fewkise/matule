import React, { useContext, useState } from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../navigation/navigator"
import { AuthContext } from "../../data/authContext"
import { useError } from '../../data/errorContext'
type NavigationProp = StackNavigationProp<RootStackParamList,'LoginScreen'>
export const useLogin = ()=>{
    const { showError } = useError();
    const navigation = useNavigation<NavigationProp>()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {pin, login} = useContext(AuthContext)
    const handleLogin = async()=>{
        try {
            await login (email, password)
            if (pin) {
                navigation.replace('MainApp')
            }
        } catch (e){
            showError(e.message)
        }
    }
    const goToRegister = ()=>{
        navigation.navigate('RegisterScreen')
    }
    return {
        handleLogin, email, password, setEmail,setPassword, goToRegister
    }
}