import React, { Component } from 'react';

import './TicketLeftPart.less';

const currencySymbol = {
    RUB: '₽',
    EUR: '€',
    USD: '$ '
};

export default class TicketLeftPart extends Component {
    render() {
        const { carrier, currency } = this.props;
        let price = this.props.price;
        
        if (currency.valuteCourse.Valute && currency.valuteCourse.Valute[currency.currentValute]) {
            price = price / currency.valuteCourse.Valute[currency.currentValute].Value;
            price = Math.round(price * 100) / 100;
        }
        return (
            <div className="ticket-list-item__leftpart">
                <div className="ticket-list-item__leftpart__logo">
                    <img src={'./img/' + carrier + '.png'} alt="" />
                </div>
                <button className="ticket-list-item__leftpart__button">
                    <span>Купить</span>{' '}
                    <span>
                        {price} ​{currencySymbol[this.props.currency.currentValute] || '₽'}
                    </span>
                </button>
            </div>
        );
    }
}
