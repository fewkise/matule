import React from 'react'
import {Chip as MyChip} from 'react-native-paper'
import {View, StyleSheet} from 'react-native'
import { colors } from '../../theme/colors'

interface ChipI {
    title:string,
    id:number,
    onPress:()=>void,
    isActive:boolean
}

/**
 * Компонент Chip — интерактивный элемент интерфейса (чип) для выбора категорий или фильтров.
 * Автоматически меняет цветовую схему в зависимости от состояния активности.
 * 
 * @param {string} title - Текст, отображаемый внутри чипа.
 * @param {number} id - Уникальный идентификатор элемента.
 * @param {() => void} onPress - Функция-обработчик нажатия на чип.
 * @param {boolean} isActive - Флаг активного состояния (меняет фон на акцентный и текст на белый).
 */
const Chip:React.FC<ChipI> = ({title, id, onPress, isActive})=>{
    return (
        <View>
            <MyChip style={[
                    styles.chip, 
                    { backgroundColor: isActive ? colors.accent : 'transparent' }
                ]} textStyle={{ color: isActive ? colors.white : colors.accent}} id={id} onPress={onPress} mode={isActive ? 'contained' : 'outlined'} >
                {title}
            </MyChip>
        </View>
    )
}

const styles = StyleSheet.create({
    chip:{
        width:'30%'
    }
})

export default Chip
