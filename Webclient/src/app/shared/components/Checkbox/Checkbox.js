import React, { Component } from 'react';
import './Checkbox.less';

export default class Checkbox extends Component {
    render() {
        const { text, checked, hiddenText, value, checkboxHandler } = this.props;
        const className = this.props.className ? ' ' + this.props.className : '';

        return (
            <div className={"checkbox-wrapper" + className}>
                <div className="checkbox-wrapper__checkbox">
                    <label className={"checkbox-wrapper__checkbox--marker" + (checked ? " checked" : "")} onClick={() => {checkboxHandler(value)}}/>
                <span className="checkbox-wrapper__checkbox--description">{text}</span>
                </div>
                {hiddenText && <span className="hidden-element" onClick={() => checkboxHandler(value, true)}>{hiddenText}</span>}
            </div>
        );
    }
}
