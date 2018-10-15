import Api from './api';

const baseURL = 'http://127.0.0.1:9091';

class AviasalesApi extends Api {
    getTickets = () => this.sendRequest('/Tickets', 'get', {});
}

export default new AviasalesApi(baseURL);
