import React, { Component } from 'react';

import RadioGroup from "app/shared/components/RadioGroup/RadioGroup";

import './Currency.less';

const currencies = ['RUB', 'USD', 'EUR'];

export default class Currency extends Component {
    render() {
        const { currencyChangeHandler, defaultChecked } = this.props;
        return (
            <div className="currency">
                <span className="currency__title">ВАЛЮТА</span>
                    <RadioGroup buttons={currencies} defaultChecked={defaultChecked} name="currency" onChange={currencyChangeHandler} className="currency__radios"/>
            </div>
        );
    }
}
