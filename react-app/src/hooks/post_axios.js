import axios from 'axios';

export const post_axios = async (url, data) => {
    const response = await axios.post(url, data);
    return response;
}