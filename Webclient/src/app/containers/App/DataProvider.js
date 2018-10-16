import React from 'react';
import api from 'app/api';
import helper from 'app/utils/helper';
import { STOPS_FILTERS, CURRENCY_SYMBOLS, CURRENCIES } from 'app/constants/DataProvider';

export default function(WrappedComponent) {
    return class DataProvider extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                tickets: [],
                filteredTickets: [],
                stopsFilter: {
                    isAllChecked: true,
                    filters: STOPS_FILTERS
                },
                currency: {
                    currentValute: 'RUB',
                    valuteCourse: {},
                    currencies: CURRENCIES,
                    symbol: CURRENCY_SYMBOLS['RUB']
                }
            };
        }

        componentDidMount() {
            this.getValuteCourse();
            this.getTickets();
        }

        
           /*  
           Фильтрацию и переключение валюты при больших данных лучше выполнять на бэке. По заданию на бэке только отправка списка билетов. В примере ноды на бэке:
            app.get("/Tickets", function (req, res) {
                var items = data.tickets.filter(t => { return req.query.stops.split(',').some(x => +x === t.stops) }).map(item => {
                    item.price = item.price / 0.4;
                    item.price = ${ Math.round(item.price * 100) / 100 } ${ req.query.val };
                    return item;
                });
                res.send(items);
            }); 
            запрос вида http://127.0.0.1:9091/Tickets?stops=1,2,3&val=rub
            */
        

        static getDerivedStateFromProps(nextProps, prevState) {
            const { tickets, stopsFilter, currency } = prevState;
            const filteredTickets = tickets.filter(ticket =>
                    stopsFilter.filters.some(
                        filter => filter.value === ticket.stops && filter.isChecked
                    )
                ).map(ticket => {
                    if (currency.valuteCourse && currency.valuteCourse[currency.currentValute]) {
                        let price =
                            ticket.price / currency.valuteCourse[currency.currentValute].Value;
                        price = Math.round(price * 100) / 100;
                        return { ...ticket, price };
                    }
                    return ticket;
                });

            return {
                filteredTickets
            };
        }

        getValuteCourse = async () => {
            try {
                const { data } = await api.valute.getValuteCourse();
                this.setState({
                    currency: { ...this.state.currency, valuteCourse: data.Valute }
                });
            } catch (e) {
                console.error(e);
            }
        };

        getTickets = async () => {
            try {
                const { data } = await api.tickets.getTickets();
                const tickets = data.sort(helper.comparePrices);
                this.setState({
                    tickets
                });
            } catch (e) {
                console.error(e);
            }
        };

        currencyChangeHandler = e => {
            const { value } = e.target;
            this.setState({
                currency: {
                    ...this.state.currency,
                    currentValute: value,
                    symbol: CURRENCY_SYMBOLS[value]
                }
            });
        };

        checkboxHandler = (value, isOnly) => {
            const newFilters = this.state.stopsFilter.filters.map(filter => {
                if (isOnly) return { ...filter, isChecked: filter.value === value };
                return filter.value != value ? filter : { ...filter, isChecked: !filter.isChecked };
            });

            const isAllChecked = isOnly ? false : this.checkAllChecked(newFilters);
            this.setState({
                stopsFilter: {
                    isAllChecked,
                    filters: newFilters
                }
            });
        };

        checkAllChecked = filters => {
            return filters.every(item => item.isChecked);
        };

        headCheckboxHandler = () => {
            const { stopsFilter } = this.state;

            const newStopsFilter = {
                ...stopsFilter,
                isAllChecked: !stopsFilter.isAllChecked,
                filters: stopsFilter.filters.map(filter => {
                    return { ...filter, isChecked: !(stopsFilter.isAllChecked && filter.isChecked) };
                })
            };

            this.setState({
                stopsFilter: newStopsFilter
            });
        };

        render() {
            const { currency, stopsFilter, filteredTickets } = this.state;
            
            return (
                <WrappedComponent
                    currency={currency}
                    stopsFilter={stopsFilter}
                    tickets={filteredTickets}
                    checkboxHandler={this.checkboxHandler}
                    headCheckboxHandler={this.headCheckboxHandler}
                    hiddenTextHandler={this.hiddenTextHandler}
                    currencyChangeHandler={this.currencyChangeHandler}
                />
            );
        }
    };
}
