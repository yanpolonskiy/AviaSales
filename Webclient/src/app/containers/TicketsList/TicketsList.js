import React, { Component } from 'react';
import TicketListItem from './TicketListItem/TicketListItem';

import './TicketsList.less';

export default class TicketsList extends Component {
    render() {
        const list = this.props.tickets.map((ticket, index) => (
            <TicketListItem key={index} ticket={ticket} currency={this.props.currency} />
        ));
        return <div className="tickets-list">{list}</div>;
    }
}
