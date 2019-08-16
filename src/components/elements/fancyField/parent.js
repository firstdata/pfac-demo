import React from 'react';
import validator from 'validator';
import {invalid_ssn} from '../../../const';

/**
 * Fancy field component (parent)
 */
export default class FancyField extends React.Component {

  

  /**
   * Class constructor
   * @constructor
   * @param {object} props - Component properties
   */
  constructor(props) {
    super(props);

    const value = (typeof props.defaultValue === 'undefined' || props.defaultValue === null) ? '' : props.defaultValue;

    this.state = {
      labelFocused: '',
      defaultValue: value,
    };

    if (typeof props.defaultValue === 'undefined' || props.defaultValue === null || !value.toString().length) {
      this.state.inputHasvalue = '';
      this.state.labelActive = '';
    } else {
      this.state.inputHasvalue = ' hasvalue';
      this.state.labelActive = ' active';
    }

    if (props.formErrors) {
      props.formErrors[props.name] = {
        $error: false,
        $touched: false
      };
    }

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.validate = this.validate.bind(this);

    this.validate(props.defaultValue);

  }

  /**
   * componentWillReceiveProps
   * @param {object} props - properties of the component
   */
  componentWillReceiveProps(props) {
    let value = (typeof props.defaultValue === 'undefined' || props.defaultValue === null) ? '' : props.defaultValue;

    if (typeof props.defaultValue === 'undefined' || props.defaultValue === null || !value.toString().length) {
      this.setState({inputHasvalue: ''});
      this.setState({labelActive: ''});
    } else {
      this.setState({inputHasvalue: ' hasvalue'});
      this.setState({labelActive: ' active'});
    }
    this.setState({defaultValue: value});
    this.validate(props.defaultValue);

    if (props.formErrors && !props.formErrors[props.name]) {
      props.formErrors[props.name] = {
        $error: false,
        $touched: false
      };
    }
  }


  /**
   * on field focused handler
   * @param {object} event - event object
   */
  onFocus(event) {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    this.setState({labelFocused: ' focused'});
  }

  /**
   * on field blurred handler
   * @param {object} event - event object
   */
  onBlur(event) {

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    let changedValue = event.target.value;

    if (this.props.mask && changedValue !== '') {
      //process currency values
      let options = {symbol: '$', require_symbol: false, allow_space_after_symbol: false, decimal_separator: '.' };
      if (validator.isCurrency(changedValue, options)) {
        if (changedValue.indexOf('$') !== -1) {
          changedValue = changedValue.substring(1); //eliminate dollar sign
        }
        if (changedValue.indexOf(',') !== -1) {
          changedValue = changedValue.replace(',', ''); //eliminate comma
        }
        changedValue = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(changedValue);

        this.setState({defaultValue: changedValue});
        this.props.inputChanged(changedValue, event);
      }
    }

    this.setState({labelFocused: ''});

    if (this.props.formErrors && this.props.formErrors[this.props.name] && !this.props.formErrors[this.props.name].$touched) {
      this.props.formErrors[this.props.name].$touched = true;
      if (this.props.inputChanged) {
        this.props.inputChanged(this.props.defaultValue, event);
      }
    }
  }

  /**
   * of select field select handler
   * @param {string} value - selected value
   * @param {object} value - selected value
   */
  onSelect(value, item) {

    if (this.props.onSelect) {
      this.props.onSelect(value, item);
    }

    if (this.props.formErrors && this.props.formErrors[this.props.name]) {
      this.props.formErrors[this.props.name].$touched = true;
    }
  }

  /**
   * of field changed handler
   * @param {object} event - event object
   */
  onChange(event) {
    let changedValue = event.target.value;

    if (this.props.formErrors && this.props.formErrors[this.props.name]) {
      this.props.formErrors[this.props.name].$touched = true;
    }

    //placeholder for mask
    this.setState({defaultValue: changedValue});

    if (this.props.inputChanged) {
      this.props.inputChanged(changedValue, event);
    }

    if (this.props.defaultValue === this.props.placeholder || !changedValue.length) {
      this.setState({inputHasvalue: ''});
      this.setState({labelActive: ''});
    } else {
      this.setState({inputHasvalue: ' hasvalue'});
      this.setState({labelActive: ' active'});
    }

    if (this.props.onChange) {

      const inp = {
        name: event.target.name,
        value: changedValue,
      };

      this.props.onChange(event, inp);
    }

    this.validate(changedValue);

  }

  /**
   * of field key up handler
   * @param {object} event - event object
   */
  onKeyUp(event) {

    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
    if (this.props.formErrors && this.props.formErrors[this.props.name]) {
      this.props.formErrors[this.props.name].$touched = true;
    }

  }

  /**
   * of field key down handler
   * @param {object} event - event object
   */
  onKeyDown(event) {

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
    if (this.props.formErrors && this.props.formErrors[this.props.name]) {
      this.props.formErrors[this.props.name].$touched = true;
    }

  }

  /**
   * static function check if error exists
   * @static
   * @param {object} formErrors
   */
  static hasErrors(formErrors){
    formErrors.$valid = true;

    for (let i in formErrors) {
      if (formErrors[i].$error) {
        formErrors.$valid = false;
        break;
      }
    }
  }

  /**
   * validate field
   * @param {string} value - value of field to validate
   */
  validate(value) {

    if (!this.props.formErrors) {
      return;
    }

    this.props.formErrors[this.props.name] = {
      $error: false,
      $touched: this.props.formErrors[this.props.name].$touched
    };

    value = (typeof value === 'undefined' || value === null) ? '' : value.toString();
    const rules = this.props.rules || [];

    rules.forEach((r) => {
      let rule;
      if ('string' === typeof r) {
        rule = r;
      } else if (Array.isArray(r) && r.length) {
        rule = r[0];
      } else {
        return;
      }

      switch (rule) {
        case 'required': {
          if ('undefined' === typeof value || null === value || validator.isEmpty(value)) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'email': {
          if (!validator.isEmail(value)) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'custom_email': {
          if (!validator.matches(value, /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+){1,3}$/)) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'name': {
          if (!validator.matches(value, /^([a-zA-Z]{2,24})\s([a-zA-Z]{1,24})+-{0,1}([a-zA-Z]{1,24})$/)) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'numeric': {
          if (!validator.isNumeric(value)) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'float': {
          if (!validator.isFloat(value)) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'ssn': {
          if (this.isNotSSN(value)) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'alphanumeric': {
          if (!validator.isAlphanumeric(value)) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'currency': {
          let options = {symbol: '$', require_symbol: false, allow_space_after_symbol: false, decimal_separator: '.' };
          if (!validator.isCurrency(value, options)) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'isAfter': {
          let date = (Array.isArray(r) && r[1]) ? r[1] : undefined;
          if (!validator.isAfter(value, date)) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'isBefore': {
          let date = (Array.isArray(r) && r[1]) ? r[1] : undefined;
          if (!validator.isBefore(value, date)) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'min': {
          let v = Number(value.replace(/[^0-9\.-]+/g,''));
          let vtoc = (Array.isArray(r) && r[1]) ? ('string' === typeof r[1] ? Number(r[1].replace(/[^0-9\.-]+/g,'')) : r[1]) : 0;
          if (v < vtoc){
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'max': {
          let v = Number(value.replace(/[^0-9\.-]+/g,''));
          let vtoc = (Array.isArray(r) && r[1]) ? ('string' === typeof r[1] ? Number(r[1].replace(/[^0-9\.-]+/g,'')) : r[1]) : 0;
          if (v > vtoc){
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'isLength': {
          if (!validator.isLength(value, r[1])) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'isHexColor': {
          if (!validator.isHexColor(value)) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'matches': {
          if (!validator.matches(value, r[1])) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
        case 'equalsTo': {
          const v = r[1] instanceof FancyField ? r[1].getValue() : null;
          if (value !== v) {
            this.props.formErrors[this.props.name].$error = true;
            this.props.formErrors[this.props.name][rule] = true;
          }
          break;
        }
      }
    });

    FancyField.hasErrors(this.props.formErrors);
  }

  /**
   * get default value
   */
  getValue(){
    return this.state.defaultValue;
  }

  /**
   * isNotSSN
   */
  isNotSSN = (value) => {
    let res = false, i=0;
    let clean_val = value.replace(/-/g, '');

    for (i; i < invalid_ssn.length; i++)  {
      if(invalid_ssn[i] === clean_val){
        res = true;
        break;
      }
    }

    return res;
  }

  /**
   * render function
   * @return {XML}
   */
  render() {
    const props = Object.assign({}, this.props);

    delete props.inputChanged;
    delete props.formErrors;
    delete props.rules;

    return (
      <div className="form-element">
        <label className={`fancy-field${this.state.labelFocused}${this.state.labelActive}`} htmlFor={props.id}>
          <span>{props.placeholder}</span>
          <input
            {...props}
            onFocus={ this.onFocus }
            onBlur={ this.onBlur }
            onChange={ this.onChange }
            onSelect={this.onSelect}
            onKeyUp={ this.onKeyUp }
            onKeyDown={ this.onKeyDown }
            className={`${this.state.inputHasvalue}`}
          />
        </label>
      </div>
    );
  }
}