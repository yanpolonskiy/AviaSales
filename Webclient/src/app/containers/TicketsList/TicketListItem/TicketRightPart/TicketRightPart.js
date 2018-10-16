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
        
        const stopsCount = stops === 0 ? '' : stops + ' ' + helper.declOfNum(stops, STOPS_PLURALS);
        const departure = helper.ticketDateFormatter(departure_date, departure_time);
        const arrival = helper.ticketDateFormatter(arrival_date, arrival_time);
        
        return (
            <div className="ticket-list-item__rightpart">
                <div className="ticket-list-item__rightpart__travel">
                    <div className="ticket-list-item__rightpart__travel--time"><span>{departure.time}</span></div>
                    <div className="ticket-list-item__rightpart__travel--city"><span>{origin}, {origin_name}</span></div>
                    <div className="ticket-list-item__rightpart__travel--date"><span>{departure.date}</span></div>
                </div>
                <div className="ticket-list-item__rightpart__stops">
                    <div>{stopsCount}</div>
                    <img className="ticket-list-item__rightpart__stops--plane" src="./img/plane.png"></img>
                </div>
                <div className="ticket-list-item__rightpart__travel arrival">
                    <div className="ticket-list-item__rightpart__travel--time"><span>{arrival.time}</span></div>
                    <div className="ticket-list-item__rightpart__travel--city"><span>{destination_name}, {destination}</span></div>
                    <div className="ticket-list-item__rightpart__travel--date"><span>{arrival.date}</span></div>
                </div>
            </div>
        );
    }
}
