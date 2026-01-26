import React from 'react';
import {TextInput} from 'react-native-paper'
import {StyleSheet, View, Text} from 'react-native'
import { colors } from '../../theme/colors'

interface InputFieldI {
    value:string,
    onChangeText:()=>void,
    placeholder:string,
    label:string,
    error?:string,
    secureTextEntry?:boolean,
    keyboardType?:'default' | 'email-address' | 'numeric' 
}

const InputField:React.FC<InputFieldI> = ({value, onChangeText, placeholder, label, error, secureTextEntry, keyboardType})=>{
    return (
        <View style={styles.container}>
        <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        label={label}
        placeholder={placeholder}
        error={!! error}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
    )
    
}
const styles = StyleSheet.create ({
    container: {
    marginBottom: 15,
    width: '100%',
  },
  input: {
    backgroundColor: colors.input_bg,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginLeft: 10,
    marginTop: 4,
  },
})

export default InputField