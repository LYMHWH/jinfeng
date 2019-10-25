import http from "@/utils/request";
import router from '../router'
import { Loading, Message, MessageBox } from 'element-ui';
export var get = (url, params) => {
    return http.get(url, { params }).then(({ data }) => {
        return data;
    })
}

export var post = (url, data) => {
    return http.post(url, data).then(({ data }) => {
        return data;
    })
}

/**
 * 
 * @param {*} options 
 */
var token = localStorage.getItem('token');
export var fetch = (options) => {
    const { headers = {}, url, autoLogin = true, loading = false, loadingText, method = 'get', errShow = true } = options;
    if (loading) {
        var loadingInstance = Loading.service({
            text: loadingText || (method.toLocaleLowerCase() === 'get' ? '加载中...' : '处理中...'),
            lock: true,
        });
    }
    return http({
        ...options,
        headers: {
            // 'content-type': 'application/x-www-form-urlencoded',
            'X-Token': token,
            ...headers
        },
        url: url
    }).then((data) => {
        if (loading) {
            loadingInstance.close();
        }
        var { errcode, message, result } = data
        if (errcode == 0) {
            // Message({
            //     message: message || '操作成功',
            //     type: 'success',
            //     duration: 3 * 1000
            // })
            return result
        } else if (errcode === 40002) {
            return fetch({ url: '/token/get' }).then((data) => {
                token = data['X-Token']
                localStorage.setItem(
                    'token',
                    token
                )
                options['headers'] = { 'X-Token': token };
                return fetch(options)
            })
        } else if (errcode === 40007) {
            router.replace('/login')
            // MessageBox.confirm('你已被登出，请重新登录', '确定登出', {
            //     confirmButtonText: '重新登录',
            //     showCancelButton: false,
            //     type: 'warning'
            // }).then(() => {
                
            // })
        }  else if (errcode === 10007) {
            router.replace('/home')
        } 
        else {
            Message({
                message: message || '服务器异常',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(data)
        }
    })
}

