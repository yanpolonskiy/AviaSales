import React, { PureComponent } from 'react';

import TicketLeftPart from './TicketLeftPart/TicketLeftPart';
import TicketRightPart from './TicketRightPart/TicketRightPart';

import './TicketListItem.less';

export default class TicketListItem extends PureComponent {
    render() {
        const { ticket, currency } = this.props;
        return (
            <div className="ticket-list-item">
                <TicketLeftPart price={ticket.price} carrier={ticket.carrier} currency={currency} />
                <TicketRightPart {...ticket} />
            </div>
        );
    }
}
