import React, { Component } from 'react';

import Checkbox from 'app/shared/components/Checkbox/Checkbox';

import './StopsFilter.less';

export default class StopsFilter extends Component {
    render() {
        const { checkboxHandler, stopsFilter, headCheckboxHandler, hiddenTextHandler } = this.props;
        const options = stopsFilter.filters.map((filter, index) => (
            <Checkbox
                value={filter.value}
                checkboxHandler={checkboxHandler}
                text={filter.name}
                checked={filter.isChecked}
                className="stops-filter__checkboxes__checkbox"
                hiddenText="ТОЛЬКО"
                hiddenTextHandler={hiddenTextHandler}
                key={index}
            />
        ));
        return (
            <div className="stops-filter">
                <span className="stops-filter__title">КОЛИЧЕСТВО ПЕРЕСАДОК</span>
                <div className="stops-filter__checkboxes">
                    <Checkbox
                        text="Всё"
                        checked={stopsFilter.isAllChecked}
                        className="stops-filter__checkboxes__checkbox"
                        checkboxHandler={headCheckboxHandler}
                    />
                    {options}
                </div>
            </div>
        );
    }
}