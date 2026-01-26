import React from 'react'
import {Search}from 'uikit'
import {View}from 'react-native'
import {Meta, StoryObj} from '@storybook/react-native'

const meta:Meta <typeof Search> = {
    component:Search,
    args:{
        placeholder:'Введите запрос',
        onChangeText:()=>{}
    },
    decorators:[
        (Story)=>(
            <View style={{padding:10}}>
                <Story/>
            </View>
        )
    ],
    title:'components/Search'
}
export default meta

type Story = StoryObj<typeof meta>

export const Default:Story= {
    args:{
    placeholder:'Введите запрос',
    value:'Тапочки'
    }
    
}