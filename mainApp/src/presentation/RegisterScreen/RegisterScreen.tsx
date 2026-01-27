import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {InputField, Button,  CategorySheet, Select} from 'uikit'
import { useRegister } from '../../core/modules/registerModule'
import DateTimePicker from '@react-native-community/datetimepicker'
import {TouchableOpacity, View} from 'react-native'
const RegisterScreen = () => {
    const {form, updateForm, handleNavigate, openSheet, showDate, setShowDate} = useRegister()
  return (
    <SafeAreaView>
        <View>
            <InputField value={form.firstName} label='Введите имя' onChangeText={(t)=>updateForm('firstName', t)}/>
            <InputField value={form.lastName} label='Введите фамилию' onChangeText={(t)=>updateForm('lastName', t)}/>
            <InputField value={form.patronymic} label='Введите отчество' onChangeText={(t)=>updateForm('patronymic', t)}/>
            <TouchableOpacity onPress={()=>setShowDate(true)}>
              <View pointerEvents='none'>
                <Select value={form.birthDate.toLocaleDateString('ru-RU')}/>
              </View>
            </TouchableOpacity>
            <Select value={form.gender} label='Пол' onPress={openSheet} />
            <InputField keyboardType='email' value={form.email} label='Введите почту' onChangeText={(t)=>updateForm('email', t)}/>
            <Button title='дальше' onPress={handleNavigate} />
            {showDate && <DateTimePicker value={form.birthDate} mode='date' onChange={(event, date)=>{
              if (date) updateForm('birthDate', date)
              setShowDate(false)
            }}/>}
        </View>
    </SafeAreaView>
  )
}

export default RegisterScreen
