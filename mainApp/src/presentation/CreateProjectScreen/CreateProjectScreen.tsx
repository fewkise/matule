import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCreateProject } from '../../core/modules/createProjectModule'
import {View, TouchableOpacity,Text} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import {CategorySheet, InputField, Select} from 'uikit'
const CreateProjectScreen = () => {
    const {
        projectName,
        setProjectName,
        forWho,
        setForWho,
        openSheet,
        selectedCategory,
        setSelectedCategory,
        beginDate,
        setBeginDate,
        endDate,
        setEndDate,
        createProject,
        clearProject,
        removeImg,
        img,
        setImg,
        pickImage,
        showEnd,
        showBegin,
        setShowBegin,
        setShowEnd,
        openImgSheet
    } = useCreateProject()
    
  return (
    <SafeAreaView>
        <InputField value={projectName} onChangeText={setProjectName} label='Введите название проекта'/>
        <InputField value={forWho} onChangeText={setForWho} label='Введите для кого проект'/>
        <Select label='Категория' value={selectedCategory} onPress={openSheet}/>
        <TouchableOpacity onPress={()=> setShowBegin(true)}> 
            <View pointerEvents='none'>
                <Select label='Дата начала' value={beginDate.toLocaleDateString('ru-RU')}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> setShowEnd(true)}> 
            <View pointerEvents='none'>
                <Select label='Дата завершения' value={endDate.toLocaleDateString('ru-RU')}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={openImgSheet}>
            <Text>Выбрать фото</Text>
        </TouchableOpacity>
        {showBegin && <DateTimePicker mode='date' value={beginDate} onChange={(event, date)=>{
            setBeginDate(date)
            setShowBegin(false)
        }}/>}
        {showEnd && <DateTimePicker mode='date' value={endDate} onChange={(event, date)=>{
            setEndDate(date)
            setShowEnd(false)
        }}/>}

    </SafeAreaView>
  )
}

export default CreateProjectScreen
