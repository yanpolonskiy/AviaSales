import Api from './api';

const baseURL= "https://www.cbr-xml-daily.ru/";

class ValuteApi extends Api {
    getValuteCourse = () => this.sendRequest('/daily_json.js', 'get', {});
};

export default new ValuteApi(baseURL);