import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../data/authContext';
import { apiService } from 'api-service';
export const useProjects = () => {
    const { token, user } = useContext(AuthContext); 
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadProjects = async () => {
        try {
            // if (!token || !user?.id) return;
            
            setLoading(true);
            const data = await apiService.getProjects(user.id, token);
            setProjects(data);
        } catch (e: any) {
            console.error("Ошибка загрузки проектов:", e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, [token, user?.id]);

    return { projects, loading, refresh: loadProjects };
};
