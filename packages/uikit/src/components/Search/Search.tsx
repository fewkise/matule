import React from 'react'
import {Searchbar} from 'react-native-paper'
import {StyleSheet, View} from 'react-native'
import { colors } from '../../theme/colors'
interface SearchBarI{
    placeholder:string,
    value:string,
    onChangeText:()=>void
}

const Search:React.FC<SearchBarI> = ({value, onChangeText, placeholder})=>{
    return (
    <View style={styles.container}>
        <Searchbar style={styles.search} value={value} onChangeText={onChangeText} placeholder={placeholder}/>
    </View>
    )
    
}

const styles = StyleSheet.create({
    container:{
    marginBottom: 15,
    width: '100%',
    },
    search:{
    backgroundColor:colors.input_bg
    }
})

export default Search