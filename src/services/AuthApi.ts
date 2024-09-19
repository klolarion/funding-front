import axios from "axios";
import { RegisterDto } from "../types/types";

const baseApi = axios.create({
    baseURL: "http://localhost:9091"
});

export const accountCheck = async (account: string) => {
    
    const response = await baseApi.post(`/api/f1/v1/auth/check-account/${account}`);
    return response;
}

export const register = async (registerDto: RegisterDto) => {
    const response = await baseApi.post<RegisterDto>(`/api/f1/v1/auth/register`, registerDto);
    return response;
}

export const lookAccount = async (account: string) => {
    const response = await baseApi.get<string>(`/api/f1/v1/auth/account/${account}`);
    return response;
}
export const lookTel = async (tel: string) => {
    const response = await baseApi.get<string>(`/api/f1/v1/auth/tel/${tel}`);
    return response;
}

