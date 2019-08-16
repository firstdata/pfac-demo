import React from 'react';
import FancyField from './parent';
import cx from 'classnames';
import './ac.css';


import Autocomplete from 'react-autocomplete';


/**
 * fancy input element
 */
export default class FancyFieldAutocomplete extends FancyField {


  /**
   * render function
   * @return {XML}
   */
  render() {
    const props = Object.assign({}, this.props);
    const {defaultValue} = this.state;

    const nodiv = props.nodiv;

    const formErrors = props.formErrors ? props.formErrors[props.name] : null;
    let externalErrorMessage = props.externalErrorMessages ? props.externalErrorMessages[props.name] : null;

    // const labelStyle = this.props.labelStyle || {};

    const labelClasses = ['fancy-field', 'autocomplete'];
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


    let inputProps = Object.assign({}, props);
    inputProps.className = this.state.inputHasvalue;
    // inputProps.style = labelStyle;

    inputProps.onBlur = this.onBlur;
    inputProps.onFocus = this.onFocus;
    inputProps.autoComplete ='nope';

    delete inputProps.renderItem;
    delete inputProps.shouldItemRender;
    delete inputProps.selectOnBlur;
    delete inputProps.items;
    delete inputProps.onChange;
    delete inputProps.onSelect;
    // delete inputProps.onBlur;



    const html = (
      <div className={cx(labelClasses)} htmlFor={props.id}>
        <span>{props.placeholder}</span>
        <Autocomplete
          {...props}
          menuStyle={{
            borderRadius: '3px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 1)',
            padding: '0',
            fontSize: '90%',
            position: 'absolute',
            top: 'auto',
            overflow: 'auto',
            maxHeight: '50%',
            zIndex: '1000',
            marginBottom: '20px',
          }}
          inputProps={inputProps}
          wrapperStyle={{}}
          // style={ labelStyle }
          value={ defaultValue }
          // onFocus={ this.onFocus }
          // onBlur={ this.onBlur }
          onChange={ this.onChange }
          onSelect = { this.onSelect }
          // onKeyUp={ this.onKeyUp }
          getItemValue={(item) => item.name}
          // renderMenu={children => (
          //   <div className="menu">
          //     {children}
          //   </div>
          // )}
        />
      </div>
    );

    return nodiv ? html : (
      <div className="form-element">
        {html}
        {((formErrors && formErrors.$error && formErrors.$touched && errorMessage) || externalErrorMessage) && <p className='form-error-detail'>{errorMessage}</p>}
      </div>
    );
  }
}