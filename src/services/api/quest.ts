import { AxiosInstance } from "axios";

export default function (api:AxiosInstance){
    return {
        create: (params:any) => api.post(`/v1/api/quest/create`, params),
        
    }
}