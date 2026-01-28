
import React, { useContext, useEffect, useState } from "react"
import { SheetManager } from "react-native-actions-sheet"
import { AuthContext } from "../../data/authContext"
import { Alert } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import {apiService} from 'api-service'
import { PermissionStatus } from 'expo-image-picker'
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../navigation/navigator"
import { useError } from '../../data/errorContext'
type NavigationProp = StackNavigationProp<RootStackParamList, 'MainApp'>
export const useCreateProject = ()=>{
    const { showError } = useError();
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
    const openImgSheet = () => {
        SheetManager.show('img-sheet', {
            payload: {
                categories: selectImgVars,
                onSelect: (item: { id: number }) => {
                    SheetManager.hide('img-sheet');
                    if (item.id === 1) {
                        pickImage('gallery');
                    } else {
                        pickImage('camera');
                    }
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
    const pickImage = async (mode: 'gallery' | 'camera') => {
        try {
            const permission = mode === 'gallery' 
                ? await ImagePicker.requestMediaLibraryPermissionsAsync()
                : await ImagePicker.requestCameraPermissionsAsync();

            if (!permission.granted) {
                showError(`Нужен доступ к ${mode === 'gallery' ? 'галерее' : 'камере'}`);
                return;
            }
            const result = mode === 'gallery'
                ? await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 0.5,
                })
                : await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 0.5,
                });

            if (!result.canceled) {
                setImg(result.assets[0]);
            }
        } catch (e) {
            showError("Не удалось получить изображение");
        }
    };
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
        showError(e.message) 
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