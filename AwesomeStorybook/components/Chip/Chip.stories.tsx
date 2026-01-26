import React from 'react'
import {Chip} from 'uikit'
import {Meta, StoryObj} from '@storybook/react-native'
import {View, Alert} from 'react-native'
const meta:Meta <typeof Chip> = {
    args:{
        title:'Женщинам',
        onPress:()=>Alert.alert('Нажата категория')
    },
    decorators:[
        (Story)=>(
            <View style={{padding:10}}>
                <Story/>
            </View>
        )
    ],
    component:Chip,
    title:'components/Chip'
}
export default meta
type Story = StoryObj<typeof meta>

export const Default:Story = {
    args:{
        title:'Женщинам'
    }
}
export const Active:Story = {
    args:{
        title:'Женщинам',
        isActive:true
    }
}