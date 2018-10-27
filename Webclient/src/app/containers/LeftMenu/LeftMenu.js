import React, { PureComponent } from 'react';
import Currency from './Currency/Currency';
import StopsFilter from './StopsFilter/StopsFilter';
import './LeftMenu.less';

export default class LeftMenu extends PureComponent {
    render() {
        const {
            checkboxHandler,
            stopsFilter,
            headCheckboxHandler,
            hiddenTextHandler,
            currencyChangeHandler,
            currency
        } = this.props;

        return (
            <div className="left-menu">
                <Currency currencyChangeHandler={currencyChangeHandler} currency={currency} />
                <StopsFilter
                    checkboxHandler={checkboxHandler}
                    headCheckboxHandler={headCheckboxHandler}
                    stopsFilter={stopsFilter}
                    hiddenTextHandler={hiddenTextHandler}
                />
            </div>
        );
    }
}
