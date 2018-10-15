import axios from 'axios';

export default class Api {
    constructor(url) {
        this.url = url;
    }

    sendRequest = async (shortUrl, method, data) => {
        let url = this.url + shortUrl;
        let response;
        switch (method) {
            case 'get':
                response = await axios.get(url, { params: data });
                break;
            case 'post':
                response = await axios.post(url, data);
                break;
            case 'put':
                response = await axios.put(url, data);
                break;
            case 'delete':
                response = await axios.delete(url + data);
                break;
            default:
                response = null;
                break;
        }

        return response;
    };
}

