import React, { useContext } from "react"
import { useState } from "react"
import { AuthContext } from "../../data/authContext"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../navigation/navigator"
type NavigationProp = StackNavigationProp<RootStackParamList, 'MainApp'>
export const useCreatePin = ()=>{
    const navigation =useNavigation<NavigationProp>()
    const [pin, setPin] = useState('')
    const {savePin} = useContext(AuthContext)
    const handleSavePin = ()=>{
        if (pin.length === 4){
            savePin(pin)
            navigation.navigate('MainApp')
        }
    }
    return {
        pin, setPin, handleSavePin
    }

}