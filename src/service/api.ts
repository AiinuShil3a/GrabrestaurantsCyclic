import axios from 'axios';
import tokenService from "./token.service"

const URL = import.meta.env.VITE_BASE_URL;
const Username = import.meta.env.VITE_BASE_USERNAME;
const Password = import.meta.env.VITE_BASE_PASSWORD;

const instance = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type" : "application/json"
    },
    auth:{
        username: Username,
        password: Password,
    }
})

//Add...
instance.interceptors.request.use((config): any => {
    const TK = tokenService.getLocalAccessToken();
    if(TK){
        config.headers["x-access-token"] = TK;
    }
    return config
},
(error) => {
    return Promise.reject(error);
}
)
//Add... response obj
instance.interceptors.response.use((res) => {
    return res
},
async (err) => {
    const originalConfig = err.config;
    if(originalConfig.url !== "/api/auth/singin" && err.response){
        if(err.response.status === 401 && !originalConfig._retry){
            originalConfig._retry = true;
            try{
                const rs = await instance.post("/api/auth/refrechToken", {
                    refreshToken: tokenService.getLocalRefreshToken(),
                })
                const { accessToken } = rs.data;
                tokenService.setLocalAccessToken(accessToken);
                return instance(originalConfig)
            }catch (_error) {
                return Promise.reject(_error);
            }
        }
    }
    return Promise.reject(err)
})

export default instance;
