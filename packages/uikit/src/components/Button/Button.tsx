import React from 'react'
import { Button as MyButton } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'

interface ButtonI {
    title: string,
    onPress: () => void,
    disabled?: boolean,
    mode?: 'contained' | 'outlined'
}

/**
 * Компонент Button — универсальная кнопка, построенная на базе react-native-paper.
 * Стандартизирует внешний вид, цвета и поведение кнопок в приложении.
 * 
 * @param {string} title - Текст, который будет отображаться внутри кнопки.
 * @param {() => void} onPress - Функция, вызываемая при нажатии на кнопку.
 * @param {boolean} [disabled] - Опциональный флаг: если true, кнопка становится неактивной и не реагирует на нажатия.
 * @param {'contained' | 'outlined'} [mode] - Опциональный стиль кнопки: 'contained' (с заливкой) или 'outlined' (с контуром).
 */
const Button: React.FC<ButtonI> = ({ title, onPress, disabled, mode }) => {
    return (
        <View>
            <MyButton 
                textColor={mode === 'contained' ? colors.white : colors.accent} 
                mode={mode} 
                style={[
                    styles.button, 
                    mode === 'outlined' && { backgroundColor: 'transparent', borderOutlineColor: colors.accent }
                ]}  
                onPress={onPress} 
                disabled={disabled}
            >
                {title}
            </MyButton>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        color: colors.white
    }
})

export default Button
