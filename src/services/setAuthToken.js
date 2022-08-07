import axios from 'axios';
import { HOST } from '../environment';

export const setAuthToken = async () => {
    axios.defaults.withCredentials = true;
    try {
        const token = localStorage.getItem("token");
        let result = await axios.post(`${HOST}/user/authen`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (result.data.status === "success") {
            return true
        }
    } catch (e) {
        localStorage.removeItem('token')
        return false
    }
}