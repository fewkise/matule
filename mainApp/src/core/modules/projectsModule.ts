import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../data/authContext';
import { apiService } from 'api-service';
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../navigation/navigator"
import { useError } from '../../data/errorContext'
type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateProjectScreen'>
export const useProjects = () => {
    const { showError } = useError(); 
    const { token, user } = useContext(AuthContext); 
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp>()
    const handleNavigate = ()=>{
        navigation.navigate('CreateProjectScreen')
    }
    const loadProjects = async () => {
        try {
            // if (!token || !user?.id) return;
            
            setLoading(true);
            const data = await apiService.getProjects(user.id, token);
            setProjects(data);
        } catch (e: any) {
            showError(e.message)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, [token, user?.id]);

    return { projects, loading, refresh: loadProjects, handleNavigate };
};
