import React from 'react';
import LeftMenu from 'app/containers/LeftMenu/LeftMenu';
import TicketsList from 'app/containers/TicketsList/TicketsList';
import withData from './DataProvider';

import './App.less';

export function App(props) {
    const { 
        stopsFilter, 
        currency, 
        tickets, 
        checkboxHandler, 
        headCheckboxHandler,
        currencyChangeHandler
    } = props;

    return (
        <SearchApp
            stopsFilter={stopsFilter}
            currency={currency}
            tickets={tickets}
            checkboxHandler={checkboxHandler}
            headCheckboxHandler={headCheckboxHandler}
            currencyChangeHandler={currencyChangeHandler}
        />
    );
}

export class SearchApp extends React.Component {
    render() {
        const { stopsFilter, currency, tickets, checkboxHandler, headCheckboxHandler, currencyChangeHandler} = this.props;
        
        return (
            <div className="app">
                <div className="header">
                    <div className="logo">
                        <img src="./img/Logo.png" alt="" />
                    </div>
                </div>
                <div className="content">
                    <LeftMenu
                        stopsFilter={stopsFilter}
                        currency={currency}
                        checkboxHandler={checkboxHandler}
                        headCheckboxHandler={headCheckboxHandler}
                        currencyChangeHandler={currencyChangeHandler}
                    />
                    <TicketsList tickets={tickets} currency={currency} />
                </div>
            </div>
        );
    }
}

export default withData(App);
