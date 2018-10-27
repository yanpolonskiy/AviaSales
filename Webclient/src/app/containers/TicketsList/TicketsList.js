import React, { PureComponent } from 'react';
import TicketListItem from './TicketListItem/TicketListItem';

import './TicketsList.less';

export default class TicketsList extends PureComponent {
    render() {
        const list = this.props.tickets.map((ticket) => (
            <TicketListItem key={ticket.id} ticket={ticket} currency={this.props.currency} />
        ));
        return <div className="tickets-list">{list}</div>;
    }
}
