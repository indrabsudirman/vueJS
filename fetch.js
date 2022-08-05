// import { ref } from 'vue'

import axios from 'axios'

const BASE_URL = process.env.VUE_APP_API_URL || 'localhost:8888'

export function useFetch(method, endpoint, postData, headers) {
    return axios({
        method: method,
        url: BASE_URL + endpoint,
        data: postData,
        headers: headers || {}
    }).then(function(response) {
        return response
    })
    .catch(function(error) {
        return error.response
    })
}
