import React, { Component } from 'react';
import './RadioGroup.less';

export default class RadioGroup extends Component {
    render() {
        const { buttons, name, onChange, defaultChecked } = this.props;
        const className = this.props.className ? ' ' + this.props.className : '';

        const elements = [];
        buttons.forEach((element, index) => {
            elements.push(
                <input
                    type="radio"
                    id={name + '-option-' + index}
                    key={'input-' + index}
                    name={name}
                    value={element}
                    defaultChecked={defaultChecked === element}
                />
            );
            elements.push(
                <label
                    htmlFor={name + '-option-' + index}
                    key={'label-' + index}
                    className="radio-label">
                    {element}
                </label>
            );
        });

        return (
            <form className={'radio-form' + className}>
                <div className={'radio-group'} onChange={onChange}>
                    {elements}
                </div>
            </form>
        );
    }
}
