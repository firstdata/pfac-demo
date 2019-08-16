import React from 'react';
import FancyField from './parent';
import cx from 'classnames';
import $ from 'jquery';

/**
 * fancy input element
 */
export default class FancyFieldInput extends FancyField {

  el = React.createRef();

  /**
   * @method componentWillMount
   */
  componentDidMount() {

    this.setIconWidth();

    //format currency
    if (this.props.mask === 'true' && this.props.defaultValue !== undefined && this.props.defaultValue.toString().indexOf('$') === -1){
      let value = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(this.props.defaultValue);
      this.props.inputChanged(value, true);
    }

    if (this.props.datepicker) {
      const props = this.props;

      $(`#${this.props.id}`).datepicker({
        onClose: (date) => {
          this.validate(date);
          if (props.inputChanged) {
            props.inputChanged(date, true);
          }
        },
        minDate: props.minDate === 0 ? 0 : ''

      });
    }

  }

  /**
   * @method componentWillUnmount
   */
  componentWillUnmount() {
    if (this.props.datepicker) {
      $(`#${this.props.id}`).datepicker('destroy');
    }
  }

  /**
   * setIconWidth
   */
  setIconWidth = () => {

    const iconOffset = 34;
    const elWidth = this.el.current && this.el.current.offsetWidth;
    const icomnMarginLeft = elWidth ? elWidth - iconOffset : 0;

    this.setState({ icomnMarginLeft });
  }


  /**
   * render function
   * @return {XML}
   */
  render() {
    const props = Object.assign({}, this.props);
    const { defaultValue, icomnMarginLeft } = this.state;

    const nodiv = props.nodiv;
    const icon = props.icon || null;

    const formErrors = props.formErrors ? props.formErrors[props.name] : null;
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
    delete props.formErrors;
    delete props.rules;
    delete props.nodiv;
    delete props.datepicker;
    delete props.labelClassName;
    delete props.defaultValue;
    delete props.mask;
    delete props.minDate;
    delete props.labelStyle;
    delete props.errorMessages;
    delete props.externalErrorMessages;
    delete props.icon;

    const html = (
      <label className={cx(labelClasses)} htmlFor={props.id}>
        <span>{props.placeholder}</span>
        <input
          ref={this.el}
          {...props}
          style={ labelStyle }
          value={ defaultValue }
          onFocus={ this.onFocus }
          onBlur={ this.onBlur }
          onChange={ this.onChange }
          onKeyUp={ this.onKeyUp }
          className={`${this.state.inputHasvalue}`}
        />
        {!!icon && <i ref={this.icon} {...icon} style={{ position: 'absolute', marginLeft: icomnMarginLeft, marginTop: '-35px' }}></i>}
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