import React, { PureComponent } from 'react';
import { STOPS_PLURALS } from 'app/constants/ticketitem';
import helper from 'app/utils/helper';

import './TicketRightPart.less';

export default class TicketRightPart extends PureComponent {
    render() {        
        const {
            origin,
            origin_name,
            destination,
            destination_name,
            departure_date,
            departure_time,
            arrival_date,
            arrival_time,
            stops
        } = this.props;
        
        const departureDate = helper.ticketDateFormatter(departure_date);
        const arrivalDate = helper.ticketDateFormatter(arrival_date);
        const stopsCount = stops === 0 ? '' : stops + ' ' + helper.declOfNum(stops, STOPS_PLURALS);

        return (
            <div className="ticket-list-item__rightpart">
                <div className="ticket-list-item__rightpart__travel">
                    <span className="ticket-list-item__rightpart__travel--time">{departure_time}</span>
                    <span className="ticket-list-item__rightpart__travel--city">{origin}, {origin_name}</span>
                    <span className="ticket-list-item__rightpart__travel--date">{departureDate}</span>
                </div>
                <div className="ticket-list-item__rightpart__stops">
                    <span>{stopsCount}</span>
                    <img className="ticket-list-item__rightpart__stops--plane" src="./img/plane.png"></img>
                </div>
                <div className="ticket-list-item__rightpart__travel arrival">
                    <span className="ticket-list-item__rightpart__travel--time">{arrival_time}</span>
                    <span className="ticket-list-item__rightpart__travel--city">{destination_name}, {destination}</span>
                    <span className="ticket-list-item__rightpart__travel--date">{arrivalDate}</span>
                </div>
            </div>
        );
    }
}
