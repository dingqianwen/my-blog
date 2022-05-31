import axios from 'axios'

const createBaseInstance = () => {
    const instance = axios.create({
        // baseURL: BASE_URL,
    })
    instance.interceptors.request.use(handleRequest, handleError)
    instance.interceptors.response.use(handleResponse, handleError)
    return instance
}
export const request = createBaseInstance()

function handleError(e) {
    $error("系统异常或维护中，请稍后重试！")
    throw e
}

function handleRequest(request) {
    return request;
}


function handleResponse(response) {
    return response.data
}
