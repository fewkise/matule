import React from "react";
import {Meta, StoryObj} from '@storybook/react-native'
import {View} from 'react-native'
import {CartItem}from 'uikit'
const meta:Meta <typeof CartItem> = {
    args:{
        item:{
            title:'Название товара',
            price:1111,
            quantity:1
        },
        onChangeQuantity:()=>{},
        onRemove:()=>{}
    },
    decorators:[
        (Story)=>(
            <View style={{padding:10}}>
                <Story/>
            </View>
        )
    ],
    component:CartItem,
    title:'components/CartItem'
}
export default meta

type Story = StoryObj<typeof meta>

export const WithProduct:Story ={
    args: {
        item:{
            title:'Тапочки',
            price:666,
            quantity:2
        }
    }
}