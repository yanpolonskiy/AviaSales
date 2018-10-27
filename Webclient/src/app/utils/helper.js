
import moment from 'moment';
import 'moment/locale/ru';

class Helper {

	declOfNum(n, titles) { //получаем окончания для существительного
        return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
    }

    firstLetterToUpperCase(str) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }

    /*  не отрабатывала функция - moment.updateLocale('ru', {
            weekdaysShort : ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
        }); 
        причину искать времени, к сожалению, нет
    */

    ticketDateFormatter = (date, time) => {
        const parsedTime = time.split(':');
        const fullDate = moment(date, 'DD.MM.YY');
        fullDate.hour(parsedTime[0]);
        fullDate.minute(parsedTime[1]);
        let month = fullDate.format('D MMM YYYY, ');
        let day = this.firstLetterToUpperCase(fullDate.format('dd'));
        return { date: month + day, time: fullDate.format('HH:mm') };
    }

    comparePrices = (ticket1, ticket2) => {
        return ticket1.price - ticket2.price;
    }

   guid = () => {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }
}

const helper = new Helper();

export default helper;