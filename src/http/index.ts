import axios, {
    AxiosRequestConfig,
    AxiosRequestHeaders,
    AxiosResponse,
} from "axios";

const state = {
    ok: 0,//请求成功状态码
    401: "ERR_BAD_REQUEST"
};

//返回数据规则
interface IResponseData<T> {
    status: number;
    message?: string;
    data: T;
    code: string;
}

//请求默认配置规则
type TOption = {
    baseURL: string;
    timeout: number;
};

//默认配置
const config = {
    baseURL: "",
    timeout: 30 * 1000,
    withCredentials: true,
};

class Http {
    service: any;
    constructor(config: TOption) {
        //实例化请求配置
        this.service = axios.create(config);

        //请求拦截
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig) => {

                return config;
            },
            (error: any) => {

                return Promise.reject(error);
            }
        );

        //响应拦截
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {

                return response.data;
            },
            (error: any) => {

                if (error.code === state[401]) {

                    return Promise.reject(error);
                }
            }
        );
    }

    get<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
        return this.service.get(url, { params, ...data });
    }

    post<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
        return this.service.post(url, params, data);
    }

    put<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
        return this.service.put(url, params, data);
    }

    delete<T>(
        url: string,
        params?: object,
        data = {}
    ): Promise<IResponseData<T>> {
        return this.service.delete(url, { params, ...data });
    }
}

export default new Http(config)
