import axios from "axios";

const baseApi = axios.create({
    baseURL: "http://localhost:9091"
});

export const googleAuth = async () => {
    const response = await baseApi.get(`/oauth2/authorization/google`);
    return response.data;
}