export interface IUser {
    id: string;
    email: string;
    user_metadata: {
        firstName?: string;
        lastName?: string;
        patronymic?: string;
        birthDate?: string;
        gender?: string;
    };
    aud: string;
    role: string;
}
export interface IProduct {
    id: number;
    title: string;
    description?: string;
    price: number;
    image_url?: string;
    category_id: number;
}
export interface IAuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    user: IUser;
}

export interface ICategory {
    id: number;
    category: string;
}
export interface ICartItem {
    id?: number;
    user_id: string;
    product_id: number | string;
    quantity: number;
}
export interface IProjectCategory {
    id: number;
    title: string;
    created_at?: string;
}
export interface IProject {
    id?: number;
    projectName: string;
    forWho: string;
    beginDate: string;
    endDate: string;
    category_id: number;
    user_id: string;
    image_url?: string;
}
export interface IOrder {
    id?: number;
    user_id: string;
    package_contents: any[];
    cost: number;
}