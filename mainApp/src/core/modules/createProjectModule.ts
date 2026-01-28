
import React, { useContext, useEffect, useState } from "react"
import { SheetManager } from "react-native-actions-sheet"
import { AuthContext } from "../../data/authContext"
import { Alert } from "react-native"
import {apiService} from 'api-service'
import ImagePicker, { PermissionStatus } from 'expo-image-picker'
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
    const selectImgVars = [
        {id:1, title:'Загрузить из галереи'},
        {id:2, title:'Сфотографировать'}
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
    useEffect(() => {
    const loadCategories = async () => {
        const data = await apiService.getProjectCategories();
        console.log("КАТЕГОРИИ ИЗ БД:", data); 
        setProjectCategories(data);
    };
    loadCategories();
    }, []);
    const pickImage = ()=>{

    }
    const createProject = async()=>{
        try {
            let imageUrl = null;
            if (img) {
                const fileName = `${Date.now()}-${user.id}.jpg`;
                imageUrl = await apiService.uploadImage(img.uri, fileName, token);
            }
            const orderData = {
                projectName:projectName,image_url: imageUrl, user_id:user.id, category_id:selectedCategory.id, forWho:forWho, beginDate:beginDate.toISOString().split('T')[0], endDate:endDate.toISOString().split('T')[0]
            }
            await apiService.createProject(orderData, token); 
            Alert.alert('Проект успешно создан', 'успех' ,[
                {
                    text:'ok',
                    onPress:()=>{
                        clearProject()
                        navigation.navigate('ProjectsScreen')
                    }
                }
            ])
        }  catch (e) {
        console.error("ОШИБКА СОЗДАНИЯ:", e); 
        Alert.alert("Ошибка", e.message || "Не удалось создать проект. Проверьте консоль.");
    }
    }
    const openSheet = ()=>{
        SheetManager.show('category-project-sheet',{
            payload:{
                categories:projectCategories,
                onSelect:(item)=>{
                    setSelectedCategory(item)
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