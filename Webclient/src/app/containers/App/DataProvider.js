import React from 'react';
import api from 'app/api/api';

const stopsFilters = [
    {
        value: 0,
        isChecked: true,
        name: 'Без пересадок'
    },
    {
        value: 1,
        isChecked: true,
        name: '1 пересадка'
    },
    {
        value: 2,
        isChecked: true,
        name: '2 пересадки'
    },
    {
        value: 3,
        isChecked: true,
        name: '3 пересадки'
    }
];

export default function(WrappedComponent) {
    return class DataProvider extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                tickets: [],
                stopsFilter: {
                    isAllChecked: true,
                    filters: stopsFilters
                },
                currency: {
                    currentValute: 'RUB',
                    valuteCourse: {}
                }
            };
        }

        componentDidMount() {
            this.getValuteCourse();
            this.getTickets();
        }

        getValuteCourse = async () => {
            try {
                const { data } = await api.valuteApi.getValuteCourse();
                this.setState({
                    currency: { ...this.state.currency, valuteCourse: data }
                });
            } catch (e) {
                console.error(e);
            }
        };

        getTickets = async () => {
            try {
                const { data } = await api.aviasalesApi.getTickets();
                
                this.setState({
                    tickets: data
                });
            } catch (e) {
                console.error(e);
            }
        };

        currencyChangeHandler = e => {
            this.setState({
                currency: { ...this.state.currency, currentValute: e.target.value }
            });
        };

        checkboxHandler = (value, isOnly) => {
            const newFilters = this.state.stopsFilter.filters.map(filter => {
                if (isOnly)
                    return filter.value === value
                        ? filter.isChecked
                            ? filter
                            : { ...filter, isChecked: true }
                        : !filter.isChecked
                            ? filter
                            : { ...filter, isChecked: false };
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
            let isAllChecked = true;
            filters.forEach(item => {
                if (!item.isChecked) {
                    isAllChecked = false;
                }
            });
            return isAllChecked;
        };

        headCheckboxHandler = () => {
            const { stopsFilter } = this.state;

            const newStopsFilter = {
                ...stopsFilter,
                isAllChecked: !stopsFilter.isAllChecked,
                filters: stopsFilter.filters.map(filter => {
                    if (stopsFilter.isAllChecked)
                        return filter.isChecked ? { ...filter, isChecked: false } : filter;
                    return !filter.isChecked ? { ...filter, isChecked: true } : filter;
                })
            };

            this.setState({
                stopsFilter: newStopsFilter
            });
        };

        render() {
            const { currency, stopsFilter } = this.state;

            const tickets = this.state.tickets.filter(ticket =>
                stopsFilter.filters.find(
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
