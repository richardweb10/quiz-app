import { AxiosInstance } from "axios";

export default function (api:AxiosInstance){
    return {
        create: (params:any) => api.post(`/v1/api/quest/create`, params),
        getQuestionnaire: (params:any) => api.get(`/v1/api/quest`, params),
        deleteQuest: (params:any) => api.delete(`/v1/api/quest/`+params.idQuest),
        getByIdQuest: (params:any) => api.get(`/v1/api/quest/`+params.idQuest),
        updateQuest: (params:any) => api.patch(`/v1/api/quest/`+params.idQuest, params),
    }
}