import React, { useEffect, useState } from "react"
import {apiService} from 'api-service'
import { useError } from '../../data/errorContext'
import { SheetManager } from "react-native-actions-sheet"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../navigation/navigator"
import AsyncStorage from "@react-native-async-storage/async-storage"
type NavigationProp = StackNavigationProp<RootStackParamList, 'PasswordScreen'>
const REGISTER_FORM_CACHE = 'register_form_draft';
export const useRegister = ()=>{
    const { showError } = useError(); 
    const [isReady, setIsReady] = useState(false)
    const [showDate, setShowDate] = useState(false)
    const navigation = useNavigation<NavigationProp>()
    const genders = [
        {id:1, title:'Мужской'},
        {id:2, title:'Женский'}
    ]
    useEffect(() => {
        const loadDraft = async () => {
            try {
                const saved = await AsyncStorage.getItem(REGISTER_FORM_CACHE);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setForm({
                        ...parsed,
                        birthDate: new Date(parsed.birthDate)
                    });
                }
            } catch (e) {
                showError(e.message)
            } finally {
                setIsReady(true);
            }
        }
        loadDraft()
    }, [])

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
    useEffect(() => {
        if (isReady) {
            AsyncStorage.setItem(REGISTER_FORM_CACHE, JSON.stringify(form))
        }
    }, [form, isReady])
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