import React, { useState } from "react"
import {apiService} from 'api-service'
import { useError } from '../../data/errorContext'
import { SheetManager } from "react-native-actions-sheet"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../navigation/navigator"
type NavigationProp = StackNavigationProp<RootStackParamList, 'PasswordScreen'>
export const useRegister = ()=>{
    const { showError } = useError(); 
    const [showDate, setShowDate] = useState(false)
    const navigation = useNavigation<NavigationProp>()
    const genders = [
        {id:1, title:'Мужской'},
        {id:2, title:'Женский'}
    ]
    const openSheet = ()=>{
        SheetManager.show('category-gender-sheet',{
            payload:{
                categories:genders,
                onSelect:(item)=>{
                    updateForm('gender', item.title)
                    SheetManager.hide('category-gender-sheet')
                }
            }
        }
        )
    }
    const [form, setForm] = useState ({
        email:'',
        firstName:'',
        lastName:'',
        birthDate:new Date(),
        patronymic:'',
        gender:''
    })
    const updateForm  = (field:string, value:any)=>{
        setForm((prev)=>({...prev, [field]:value}))
    }
    const handleNavigate = () => {
    const { firstName, lastName, email, gender, birthDate } = form;
    if (!firstName || !lastName || !email || !gender) {
        showError('Заполните все поля')
        return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        showError('Введите корректный адрес почты')
        return;
    }

    navigation.navigate('PasswordScreen', { userData: form });
};  
    return {
        updateForm, handleNavigate, form, openSheet, showDate, setShowDate
    }
}