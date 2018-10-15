import React, { Component } from 'react';

import './TicketLeftPart.less';

export default class TicketLeftPart extends Component {
    render() {
        const { carrier, currency, price } = this.props;
        let displayPrice = price;
        
        if (currency.valuteCourse && currency.valuteCourse[currency.currentValute]) {
            displayPrice = price / currency.valuteCourse[currency.currentValute].Value;
            displayPrice = Math.round(displayPrice * 100) / 100;
        }

        return (
            <div className="ticket-list-item__leftpart">
                <div className="ticket-list-item__leftpart__logo">
                    <img src={'./img/' + carrier + '.png'} alt="" />
                </div>
                <button className="ticket-list-item__leftpart__button">
                    <span>Купить</span>{' '}
                    <span>
                        {displayPrice} ​{currency.symbol}
                    </span>
                </button>
            </div>
        );
    }
}
