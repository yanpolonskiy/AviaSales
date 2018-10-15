import React, { Component } from 'react';

import RadioGroup from 'app/shared/components/RadioGroup/RadioGroup';

import './Currency.less';

export default class Currency extends Component {
    render() {
        const { currencyChangeHandler, currency } = this.props;
        return (
            <div className="currency">
                <span className="currency__title">ВАЛЮТА</span>
                <RadioGroup
                    buttons={currency.currencies}
                    defaultChecked={currency.currentValute}
                    name="currency"
                    onChange={currencyChangeHandler}
                    className="currency__radios"
                />
            </div>
        );
    }
}
