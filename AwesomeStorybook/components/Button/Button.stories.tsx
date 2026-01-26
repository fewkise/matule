import React from 'react'
import {Button} from 'uikit'
import {View, Alert} from 'react-native'
import  {Meta, StoryObj} from '@storybook/react-native'

const meta:Meta <typeof Button>= {
  args:{
    title:'Добавить',
    onPress:()=>Alert.alert('Нажата кнопка')
  },
  component:Button,
  decorators:[
    (Story)=>(
      <View style={{padding:10}}>
        <Story/>
      </View>
    )
  ],
  title:'components/Button'
}
export default meta
type Story = StoryObj<typeof meta>

export const Default:Story ={
  args:{
    title:'Добавить',
    mode:'contained'
  }
}
export const Outlined:Story ={
  args:{
    title:'Добавить',
    mode:'outlined'
  }
}