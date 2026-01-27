const URL = 'https://ewwkuaqdvmxyasybbslp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3d2t1YXFkdm14eWFzeWJic2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMDM2OTgsImV4cCI6MjA4MjU3OTY5OH0.AQUYNsKWSboZJAqIchcffiVeOiXZ85BO79IBD0H-2x0'
import { IUser } from "./types";
import { request } from "./client";
const mock_categories = [
    {id:1, category:'Для женщин'},
    {id:2, category:'Для мужчин'},
    {id:3, category:'Для детей'}
]
const mock_products = [
    {id:1, title:'Мимимишки', price:1000, description:'Штаны воскресенье и вторник', category_id:1},
    {id:2, title:'Кофе', price:1500, description:'Штаны воскресенье и вторник', category_id:2},
    {id:3, title:'Памперсы', price:2440, description:'Штаны воскресенье и вторник', category_id:3},
]
const mock_projects = [
    {id:21, beginDate:'2026-01-16', endDate:'2026-01-23', forWho:'няня', projectName:'Почистить ковры', category_id:1},
    {id:22, beginDate:'2026-01-16', endDate:'2026-01-23', forWho:'няня', projectName:'Почистить ковры', category_id:1}
]
export const apiService = {
    login: async (email: string, password: string) => {
        return {
            user: { id: "123", email: email },
            access_token: '12345'
        };
    },
    registerUser:async(email:string,password:string, userData:any)=>{
        return {
            user: { id: "123", email: email },
            access_token: '12345'
        };
    },
    getProducts:async()=>{
        return mock_products
    },
    getCategories:async()=>{
        return mock_categories
    },
    getProjects:async()=>{
        return mock_projects
    }
}