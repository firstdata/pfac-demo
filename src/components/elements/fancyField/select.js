import React from 'react';
import FancyField from './parent';
import cx from 'classnames';

/**
 * Fancy select element
 */
export default class FancyFieldSelect extends FancyField {

  /**
   * Render function
   * @return {XML}
   */
  render() {

    const {defaultValue} = this.state;

    let options = [];

    let option = <option key="-1" value=''>{this.props.placeholder}</option>;
    options.push(option);

    for (let i = 0; i < this.props.options.length; i++) {
      let option;
      option = <option key={i} value={this.props.options[i].defaultValue}>{this.props.options[i].label}</option>;
      options.push(option);
    }

    const props = Object.assign({}, this.props);

    const nodiv = props.nodiv;

    const formErrors = this.props.formErrors ? this.props.formErrors[props.name] : null;
    let externalErrorMessage = props.externalErrorMessages ? props.externalErrorMessages[props.name] : null;

    const labelStyle = this.props.labelStyle || {};

    const labelClasses = ['fancy-field'];
    labelClasses.push(this.state.labelFocused);
    labelClasses.push(this.state.labelActive);

    if (props.labelClassName) {
      labelClasses.push(props.labelClassName);
    }
    if (props.required) {
      labelClasses.push('required');
    }

    if (externalErrorMessage || (formErrors && formErrors.$error && formErrors.$touched)) {
      labelClasses.push('error');
    }

    if (props.isDisabled && props.isDisabled === 'true') {
      props.disabled = true;
    }

    let errorMessage;

    if (externalErrorMessage) {
      errorMessage = externalErrorMessage;
    } else {
      if (props.errorMessages) {
        for (let i in formErrors) {
          if (props.errorMessages[i]) {

            errorMessage = props.errorMessages[i];
            break;
          }
        }
      }
    }


    delete props.inputChanged;
    delete props.options;
    delete props.formErrors;
    delete props.rules;
    delete props.nodiv;
    delete props.labelClassName;
    delete props.defaultValue;
    delete props.labelStyle;
    delete props.isDisabled;
    delete props.errorMessages;
    delete props.externalErrorMessages;

    const html = (
      <label className={cx(labelClasses)} htmlFor={props.id}>
        <span>{props.placeholder}</span>
        <select
          {...props}
          style={ labelStyle }
          value={defaultValue}
          onFocus={ this.onFocus }
          onBlur={ this.onBlur }
          onChange={ this.onChange }
          className={`${this.state.inputHasvalue}`}
        >
          {options}

        </select>

      </label>
    );

    return nodiv ? html : (
      <div className="form-element">
        {html}
        {((formErrors && formErrors.$error && formErrors.$touched && errorMessage) || externalErrorMessage) && <p className='form-error-detail'>{errorMessage}</p>}
      </div>
    );
  }
}