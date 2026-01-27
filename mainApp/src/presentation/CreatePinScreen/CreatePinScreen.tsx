import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {InputField, Button} from 'uikit'
import { useCreatePin } from '../../core/modules/createPinModule'
const CreatePinScreen = () => {
  const {pin, setPin,handleSavePin} = useCreatePin()
  return (
    <SafeAreaView>
        <InputField label='Введите пин-код' value={pin} onChangeValue={setPin}/>
        <Button title='Сохранить пинкод' onPress={handleSavePin}/>
    </SafeAreaView>
  )
}

export default CreatePinScreen
