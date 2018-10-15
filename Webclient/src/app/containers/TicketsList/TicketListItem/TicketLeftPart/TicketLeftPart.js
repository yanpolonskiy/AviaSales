import React, { Component } from 'react';

import './TicketLeftPart.less';

export default class TicketLeftPart extends Component {
    render() {
        const { carrier, currency, price } = this.props;

        return (
            <div className="ticket-list-item__leftpart">
                <div className="ticket-list-item__leftpart__logo">
                    <img src={'./img/' + carrier + '.png'} alt="" />
                </div>
                <button className="ticket-list-item__leftpart__button">
                    <span>Купить</span>{' '}
                    <span>
                        {price} ​{currency.symbol}
                    </span>
                </button>
            </div>
        );
    }
}
