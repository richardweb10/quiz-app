import { AxiosInstance } from "axios";

export default function (api:AxiosInstance){
    return {
        register: (params:any) => api.post(`/v1/api/register/signup`, params),
        login: (params:any) => api.post(`/auth/signin`, params),
        logout: (params:any) => api.post(`/auth/logout`, params),
    }
}