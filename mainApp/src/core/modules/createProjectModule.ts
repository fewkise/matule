
import React, { useContext, useEffect, useState } from "react"
import { SheetManager } from "react-native-actions-sheet"
import { AuthContext } from "../../data/authContext"
import { Alert } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../navigation/navigator"
type NavigationProp = StackNavigationProp<RootStackParamList, 'MainApp'>
export const useCreateProject = ()=>{
    const navigation = useNavigation<NavigationProp>()
    const [projectName, setProjectName] = useState('')
    const [forWho, setForWho] = useState('')
    const [beginDate, setBeginDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [projectCategories, setProjectCategories] = useState([])
    const [showBegin, setShowBegin] = useState(false)
    const [showEnd, setShowEnd] = useState(false)
    const [img, setImg] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const {user, token} = useContext(AuthContext)
    const isMock = true
    const selectImgVars = [
        {id:1, name:'Загрузить из галереи'},
        {id:2, name:'Сфотографировать'}
    ]
    const openImgSheet = ()=>{
        SheetManager.show('img-sheet', {
            payload:{
                categories:selectImgVars,
                onSelect:()=>{
                    SheetManager.hide('img-sheet')
                }
            }
        })
    }
    const mock_categories = [
        {id:1, name:'Хобби'},
        {id:2, name:'Дом'},
        {id:3, name:'Работа'}
    ]
    const clearProject = ()=>{
        setProjectName('')
        setForWho('')
        setEndDate(new Date())
        setBeginDate(new Date())
        setSelectedCategory(null)
    }
    const removeImg = ()=>{
        setImg(null)
    }
    const loadCategories =async ()=>{
        try {
            if (isMock){
                setProjectCategories(mock_categories)
            }
        } catch (e){
            console.log(e.message)
        }
    }
    useEffect (()=>{    
        loadCategories()
    }, [])
    const pickImage = ()=>{

    }
    const createProject = async()=>{
        try {
            if (img){
                let image_url = null
                const fileName = `${Date.now()}-${user.id}`
                image_url = await apiService.uploadImage(fileName, token, image.uri)
            }
            const projectData = {
                projectName:projectName,
                forWho:forWho,
                beginDate:beginDate.toISOString().split('T')[0],
                endDate:beginDate.toISOString().split('T')[0],
                user_id:user.id,
                selectedCategory:selectedCategory,
                image:image_url
            }
            await apiService.createProject(projectData)
            Alert.alert('Проект успешно создан','Успех',[
                {
                    text:'Ок',
                    onPress:()=>{
                        navigation.navigate('MainApp')
                    }
                }
            ])
        } catch (e){
            console.log(e.message)
        }
    }
    const openSheet = ()=>{
        SheetManager.show('category-project-sheet',{
            payload:{
                categories:projectCategories,
                onSelect:(item)=>{
                    setSelectedCategory(item.name)
                    SheetManager.hide('category-project-sheet')
                }
            }
        })
    }
    return {
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
    }
}