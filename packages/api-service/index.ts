const URL = 'https://ewwkuaqdvmxyasybbslp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3d2t1YXFkdm14eWFzeWJic2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMDM2OTgsImV4cCI6MjA4MjU3OTY5OH0.AQUYNsKWSboZJAqIchcffiVeOiXZ85BO79IBD0H-2x0'
import { IUser } from "./types";
import { request } from "./client";

export const apiService = {
    login: async(email:string, password:string):Promise <IUser>=>{
        return {
            id: "user-uuid-12345",
            email: email,
            access_token:'12345'
        };
        // return request('/auth/v1/token?grant_type=password', {
        //     headers:{
        //         Authorization: `Bearer ${supabaseKey}`,
        //     },
        //     body:JSON.stringify({email, password})
        // })
    },
    registerUser:async(email:string,password:string, userData:any)=>{
        return {
            id: "new-user-uuid",
            email: email,
            user_metadata: userData,
            error: null
        };
        // return request ('auth/v1/signup',{
        //     headers:{
        //         Authorization:`Bearer ${supabaseKey}`
        //     },
        //     body:JSON.stringify({email, password, data:userData})
        // })
    }
}