import axios from 'axios';
const baseURL = 'http://127.0.0.1:9091';

class Api {
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

class ValuteApi extends Api {
    getValuteCourse = () => this.sendRequest('/daily_json.js', 'get', {});
}

class AviasalesApi extends Api {
    getTickets = () => this.sendRequest('/Tickets', 'get', {});
}

const api = { valuteApi: new ValuteApi('https://www.cbr-xml-daily.ru/'), aviasalesApi: new AviasalesApi(baseURL) };
export default api;
