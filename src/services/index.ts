import axios from 'axios';
import Auth from './api/auth';
import Quest from './api/quest';

import config from './../config';
const header:any = {
    'Cache-Control': 'no-cache',
    'content-type': 'application/json',
}

const create =  (headers:any = header, baseURL:any = config.url_api) =>{
    
    const api  = axios.create({
        baseURL,
        headers,
        timeout: 1000000
    });
    

    const auth = Auth(api);
    const quest = Quest(api);
    
    return {
        setHeader: (key: string, value: string) => api.defaults.headers.common[key] = value,
        auth,
        quest
    }
}

export default {create};
