import React, { useState } from "react"
import {apiService} from 'api-service'

import { SheetManager } from "react-native-actions-sheet"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../navigation/navigator"
type NavigationProp = StackNavigationProp<RootStackParamList, 'PasswordScreen'>
export const useRegister = ()=>{
    const [showDate, setShowDate] = useState(false)
    const navigation = useNavigation<NavigationProp>()
    const genders = [
        {id:1, name:'Мужской'},
        {id:2, name:'Женский'}
    ]
    const openSheet = ()=>{
        SheetManager.show('category-gender-sheet',{
            payload:{
                categories:genders,
                onSelect:(item)=>{
                    updateForm('gender', item.name)
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
    // const { firstName, lastName, email, gender, birthDate } = form;
    // if (!firstName || !lastName || !email || !gender) {
    //     alert("Пожалуйста, заполните все обязательные поля");
    //     return;
    // }
    // const emailRegex = /\S+@\S+\.\S+/;
    // if (!emailRegex.test(email)) {
    //     alert("Введите корректный адрес почты");
    //     return;
    // }

    navigation.navigate('PasswordScreen', { userData: form });
};  
    return {
        updateForm, handleNavigate, form, openSheet, showDate, setShowDate
    }
}