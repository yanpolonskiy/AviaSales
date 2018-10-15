import React from 'react';
import api from 'app/api';
import { STOPS_FILTERS, CURRENCY_SYMBOLS, CURRENCIES } from "app/constants/DataProvider";

export default function(WrappedComponent) {
    return class DataProvider extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                tickets: [],
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
                
                this.setState({
                    tickets: data
                });
            } catch (e) {
                console.error(e);
            }
        };

        currencyChangeHandler = e => {
            const { value } = e.target;
            this.setState({
                currency: { ...this.state.currency, currentValute: value, symbol: CURRENCY_SYMBOLS[value] }
            });
        };

        checkboxHandler = (value, isOnly) => {
            const newFilters = this.state.stopsFilter.filters.map(filter => {
                if (isOnly)
                    return { ...filter, isChecked: filter.value === value }
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
                    return { ...filter, isChecked: !(stopsFilter.isAllChecked && filter.isChecked) }
                })
            };

            this.setState({
                stopsFilter: newStopsFilter
            });
        };

        render() {
            const { currency, stopsFilter } = this.state;

            const tickets = this.state.tickets.filter(ticket =>
                stopsFilter.filters.some(
                    filter => filter.value === ticket.stops && filter.isChecked
                )
            );

            return (
                <WrappedComponent
                    currency={currency}
                    stopsFilter={stopsFilter}
                    tickets={tickets}
                    checkboxHandler={this.checkboxHandler}
                    headCheckboxHandler={this.headCheckboxHandler}
                    hiddenTextHandler={this.hiddenTextHandler}
                    currencyChangeHandler={this.currencyChangeHandler}
                />
            );
        }
    };
}
