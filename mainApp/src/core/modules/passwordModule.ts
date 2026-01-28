import React, { useState } from "react"
import { RouteProp } from "@react-navigation/native"
import { useRoute } from "@react-navigation/native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../navigation/navigator"
import { validatePassword } from "../utils/validation"
import { useError } from '../../data/errorContext'
type NavigationProp = StackNavigationProp<RootStackParamList, 'PasswordScreen'>
type RouteProps = RouteProp<RootStackParamList, 'PasswordScreen'>
import {apiService} from 'api-service'
import { Alert } from "react-native"
export const usePassword = ()=>{
    const { showError } = useError();    
    const route = useRoute<RouteProps>()
    const navigation = useNavigation<NavigationProp>()
    const {userData} = route.params
    const [password, setPassword] = useState('')
    const handleRegister = ()=>{
        const validation = validatePassword(password);
        // if (!validation.isValid) {
        //     Alert.alert('Ошибка валидации', validation.message);
        //     return;
        // }
        try {
            apiService.registerUser(userData.email, password, {
            firstName:userData.firstName,
            lastName:userData.lastName,
            patronymic:userData.patronymic,
            birthDate:userData.birthDate,
            gender:userData.gender
            })
            apiService.login(userData.email, password)
            navigation.navigate('CreatePinScreen')
        } catch (e){
            showError(e.message)
        }
    }
    return {
        handleRegister, password, setPassword
    }
}