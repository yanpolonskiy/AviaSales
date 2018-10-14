
import moment from 'moment';

class Helper {

	declOfNum(n, titles) { //получаем окончания для существительного
        return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
    }

    firstLetterToUpperCase(str) {
		return str.substr(0, 1).toUpperCase() + str.substr(1);
	}


    ticketDateFormatter = date => {
        moment.locale('ru');
        const stringDate = moment(date, "DD.MM.YYYY");
        let month = stringDate.format('MMM');
        month = month.substring(0, month.length - 1);
        let day = this.firstLetterToUpperCase(stringDate.format('dd'));
        return `${stringDate.format('D')} ${month} ${stringDate.format('YYYY')}, ${day}`;
    }
}

const helper = new Helper();

export default helper;