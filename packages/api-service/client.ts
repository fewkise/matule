
const URL = 'https://ewwkuaqdvmxyasybbslp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3d2t1YXFkdm14eWFzeWJic2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMDM2OTgsImV4cCI6MjA4MjU3OTY5OH0.AQUYNsKWSboZJAqIchcffiVeOiXZ85BO79IBD0H-2x0'
export const request = async (endpoint: string, options: any = {}) => {
    try {
        const response = await fetch(`${URL}${endpoint}`, {
            ...options,
            headers: {
                'apikey': supabaseKey,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = 
                errorData.error_description || 
                errorData.message || 
                errorData.msg || 
                errorData.error || 
                "Произошла ошибка при работе с сервером";
                
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (e: any) {
        if (e.message === 'Network request failed') {
            throw new Error('Отсутствует соединение с сетью Интернет');
        }
        throw e;
    }
};
