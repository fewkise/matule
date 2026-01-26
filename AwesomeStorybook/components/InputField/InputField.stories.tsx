import React from 'react'
import {InputField} from 'uikit'
import {View} from 'react-native'
import {Meta, StoryObj} from '@storybook/react-native'
const meta:Meta <typeof InputField> = {
    args:{
        placeholder:'Введите текст',
        value:'',
        onChangeText: () => {}, 
    },
    component:InputField,
    title:'components/InputField',
    decorators:[
        (Story)=>(
            <View  style={{ padding: 20 }}>
                <Story/>
            </View>
        )
    ]
}
export default meta
type Story = StoryObj<typeof meta>

export const Default:Story = {
    args:{
        label:'Адрес почты',
        placeholder:'example@gmail.com',
    }
}
export const WithError:Story = {
    args:{
        label:'Адрес почты',
        placeholder:'example@gmail.com',
        error:'Некорректный адрес почты'
    }
}
export const Password:Story = {
    args:{
        label:'Пароль',
        secureTextEntry:true,
        value:'12345678'
    }
}