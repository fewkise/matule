import React from 'react'
import {InputField, Button} from 'uikit'
import { useLogin } from '../../core/modules/loginModule'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Text, View} from 'react-native'
const LoginScreen = () => {
  const {email, password, setEmail, setPassword,goToRegister,handleLogin } = useLogin()
  return (
    <SafeAreaView>
      <View>
        <View>
          <Text>Добро пожаловать</Text>
        </View>
        <View>
          <InputField value={email} onChangeText={setEmail} label='Почта' placeholder='Введите почту'/>
          <InputField value={password} onChangeText={setPassword} label='Пароль' secureTextEntry={true} placeholder='Введите пароль'/>
          <Button onPress={handleLogin} title='Войти'/> 
        </View>
        <View>
          <Button title='Зарегистрироваться' onPress={goToRegister}/>
          <Text>Войти с помощью</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen
