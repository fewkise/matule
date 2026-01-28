const URL = 'https://ewwkuaqdvmxyasybbslp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3d2t1YXFkdm14eWFzeWJic2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMDM2OTgsImV4cCI6MjA4MjU3OTY5OH0.AQUYNsKWSboZJAqIchcffiVeOiXZ85BO79IBD0H-2x0'
import { IUser } from "./types";
import { request } from "./client";
export const apiService = {
    login: async (email: string, password: string) => {
        return request('/auth/v1/token?grant_type=password', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${supabaseKey}` },
            body: JSON.stringify({ email, password }),
        });
    },
    registerUser: async (email: string, password: string, userData: any) => {
        return request('/auth/v1/signup', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${supabaseKey}`, 'Prefer': 'return=representation' },
            body: JSON.stringify({ email, password, data: userData }),
        });
    },
    syncCartItem: async (userId, productId, quantity) => {
    const endpoint = `/rest/v1/cart?on_conflict=user_id,product_id`;
    return request(endpoint, {
        method: 'POST',
        headers: { 
            'Prefer': 'resolution=merge-duplicates'
        }, 
        body: JSON.stringify({ 
            user_id: userId, 
            product_id: productId, 
            quantity: quantity 
        })
    });
},

    getProducts: async (search = '', categoryId = null) => {
    let endpoint = '/rest/v1/products?select=*';
    if (search) {
        endpoint += `&title=ilike.*${encodeURIComponent(search)}*`;
    }
    if (categoryId) {
        endpoint += `&category_id=eq.${categoryId}`;
    }
    endpoint += '&order=title.asc';
    return request(endpoint, {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${supabaseKey}` 
        },
    });
    },
    getCategories: async () => {
        return request('/rest/v1/categories?select=*', {
            headers: { 'Authorization': `Bearer ${supabaseKey}` },
        });
    },

    getProjectCategories: async () => {
        return request('/rest/v1/projectCategories?select=*', {
            headers: { 'Authorization': `Bearer ${supabaseKey}` },
        });
    },

    getProjects: async (userId: string, token: string) => {
        return request(`/rest/v1/projects?user_id=eq.${userId}&select=*`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
    },

    createProject: async (projectData: any, token: string) => {
        return request('/rest/v1/projects', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Prefer': 'return=representation' 
            },
            body: JSON.stringify(projectData),
        });
    },

    createOrder: async (orderData: any) => {
        return request('/rest/v1/orders', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${supabaseKey}`, 
                'Prefer': 'return=representation' 
            },
            body: JSON.stringify(orderData),
        });
    },
    logout: async (token: string) => {
        return request('/auth/v1/logout', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'apikey': supabaseKey 
            }
        });
    },
    removeFromCartRequest: async (userId:string, productId:string) => {
        return request(`/rest/v1/cart?user_id=eq.${userId}&product_id=eq.${productId}`, {
            method: 'DELETE'
        });
    },
    uploadImage: async (uri: string, fileName: string, token: string) => {
        const formData = new FormData();
        formData.append('file', {
            uri,
            name: fileName,
            type: 'image/jpeg',
        });

        await request(`/storage/v1/object/projectImages/${fileName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'apikey': supabaseKey,
            },
            body: formData,
        });
        return `${URL}/storage/v1/object/public/projectImages/${fileName}`;
    },
}