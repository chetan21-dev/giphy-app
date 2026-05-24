import axios from 'axios'

const SecureAxios = axios.create({
    baseURL : 'https://api.giphy.com/v1/gifs',
    params : {
        api_key : 'TZ0IHXR1tUbtta3BHmeaivzUWSFtXvsO'
    }
})

export default SecureAxios