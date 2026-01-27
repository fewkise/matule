import React from 'react'
import {InputField, Button} from 'uikit'
import { SafeAreaView } from 'react-native-safe-area-context'
import { usePassword } from '../../core/modules/passwordModule'
const PasswordScreen = () => {
    const {password, setPassword, handleRegister} = usePassword()
  return (
    <SafeAreaView>
        <InputField value={password} secureTextEntry={true} onChangeText={setPassword}/>
        <Button title='Зарегистрироваться' onPress={handleRegister}/>
    </SafeAreaView>
  )
}

export default PasswordScreen
