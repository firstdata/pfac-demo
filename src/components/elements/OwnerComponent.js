import React from 'react';
import { Input, Select} from './fancyField';
import {titles, months, days, years, taxes, states, percentage, gender } from '../../const';
import Geocode from 'react-geocode';

/**
 * Owner component
 */
export default class OwnerComponent extends React.Component {

  /**
   * Class constructor
   * @constructor
   * @param {object} props - Component properties
   */
  constructor(props) {
    super(props);
    let titlesOptions = titles.map(t=> {return {defaultValue: t.abbr, label: t.name};});
    let monthsOptions = months.map(m=> {return {defaultValue: m.abbr, label: m.name};});
    let daysOptions = days.map(d => {return {defaultValue: d.abbr, label: d.name};});
    let yearsOptions = years.map(y => {return {defaultValue: y.abbr, label: y.name};});
    let taxesOptions = taxes.map(t => {return {defaultValue: t.abbr, label: t.name};});
    let statesOptions = states.map(s => {return {defaultValue: s.abbr, label: s.name};});
    let percentageOptions = percentage.map(p => {return {defaultValue: p.abbr, label: p.name};});
    let genderOptions = gender.map(g => {return {defaultValue: g.abbr, label: g.name}});

    this.state = {
      titlesOptions: titlesOptions,
      monthsOptions: monthsOptions,
      daysOptions: daysOptions,
      yearsOptions: yearsOptions,
      taxesOptions: taxesOptions,
      statesOptions: statesOptions,
      percentageOptions: percentageOptions,
      genderOptions: genderOptions,
      actionIcon: 'fancy-field-icon fa fa-eye',
      actionType: 'text',
    };

    Geocode.setApiKey('AIzaSyBG-Xskhm-9KiwwajAKuLJPj7_b6dl4YBg');

  }


  /**
   * updateOwnerInfo
   */
  updateOwnerInfo = (v, i, field_name) => {
    if (this.props.onUpdate) {
      this.props.onUpdate.call(this, v, i, field_name);
    }
  }

  /**
   * populateCityNState
   * use google geocode to fetch
   * City/State based on Zip
   */
  populateOwnerCityNState = (e, i) => {
    let {formErrors, ownerInfo} = this.props;
    //let self = this;

    if (formErrors && formErrors.owner_zip && formErrors.owner_zip.$error && formErrors.owner_zip.$touched){
      return;
    }

    if (ownerInfo.owner_zip === '') {
      return;
    }

    // Get city and state from address components.
    Geocode.fromAddress(ownerInfo.owner_zip).then(
        response => {

          const address_components = response.results[0].address_components;
          let city = this.fetchAddressType(address_components, 'locality');
          let state = this.fetchAddressType(address_components, 'administrative_area_level_1');

          if (this.props.onUpdate) {
            this.props.onUpdate.call(this, city, i, 'owner_city');
            this.props.onUpdate.call(this, state, i, 'owner_state');
            e.persist();
          }
        },
        error => {
          if (this.props.onUpdate) {
            this.props.onUpdate.call(this, '', i, 'owner_city');
            this.props.onUpdate.call(this, '', i, 'owner_state');
          }
        }
    );
  }

  /**
   * fetch city
   **/
  fetchAddressType(address_components, type) {

    let component = address_components.find(c => {
      let ix = c.types.findIndex(t => t === type);
      let component = (ix > -1) ? c: null;
      return component;
    });

    let name = component ? component.short_name : '';
    return name;
  }

  /**
   * deleteOwner
   */
  deleteOwner = () => {
    let {index} = this.props;

    if (this.props.onDelete) {
      this.props.onDelete.call(this, index);
    }
  }

  /**
   * iconClick()
   */
  iconClick = () => {
    let {actionIcon, actionType} = this.state;

    if (actionType === 'text') {
      actionIcon = 'fancy-field-icon fa fa-eye-slash';
      actionType = 'password';
    }
    else {
      actionIcon = 'fancy-field-icon fa fa-eye';
      actionType = 'text';
    }

    this.setState({actionIcon, actionType});
  }

  /**
   * formatPhone
   */
  formatPhone = (index, phone_type) => {

    if (this.props.formErrors[phone_type].$error){
      return;
    }

    let phone = this.props.ownerInfo.owner_phone;
    let position_1 = 4;
    let position_2 = 9;

    phone = phone.replace(/-/g, '');
    phone = phone.replace('(', '');
    phone = phone.replace(')', '');
    phone = phone.replace(' ', '');

    phone = '(' + phone;
    phone = [phone.slice(0, position_1), ') ', phone.slice(position_1)].join('');
    phone = [phone.slice(0, position_2), '-', phone.slice(position_2)].join('');

    this.updateOwnerInfo(phone, index, 'owner_phone');
  }

  /**
   * format EIN
   */
  formatSSN=(v, index)=>{

    let ssn = v;
    let position_1 = 3;
    let position_2 = 6;
    let newSSN = '';

    ssn = ssn.replace(/-/g, '');
    ssn = ssn.replace(' ', '');

    if((ssn.length > position_1) && (ssn.length < position_2)) {
      newSSN += ssn.substr(0, position_1) + '-';
      ssn = ssn.substr(position_1);
    }
    if (ssn.length > position_2-1) {
      newSSN += ssn.substr(0, position_1) + '-';
      newSSN += ssn.substr(position_1, 2) + '-';
      ssn = ssn.substr(position_2-1);
    }
    newSSN += ssn;

    this.updateOwnerInfo(newSSN, index, 'owner_ssn');
  }


  /**
   * render function
   * @return {XML}
   */
  render(){

    let {titlesOptions, monthsOptions, daysOptions, yearsOptions, taxesOptions, statesOptions,
      percentageOptions, actionIcon, actionType, genderOptions} = this.state;

    const zipLength = 5;
    const eyeIcon = {
      className: actionIcon,
      title: '',
      onClick: () => this.iconClick(),
    };

    //title comes from props
    //update will be callback
    //owner info comes from props
    //let ownerInfo = this.props.ownerInfo || {};

    let titleDiv = (this.props.index !== 0) ? <div className="column-12">
                  <h3 style={{marginBottom: '0'}}>Owner  {(this.props.index +1).toString()} <strong style={{fontSize: '14px'}}>
                    <a className="link remove-owner" onClick={()=>this.deleteOwner()}>Remove</a>
                  </strong>
                  </h3>
                </div> : '';
    return(
        <div>
          {titleDiv}
          <div className="column-6">
            <div className="form-element">
              <div className="column-8" style={{padding: '0px'}}>
                <Input name={`owner_name_${this.props.index}`}
                  placeholder='Name'
                  rules={['required']}
                  formErrors = {this.props.formErrors}
                  defaultValue={this.props.ownerInfo.owner_name}
                  inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_name')}
                  required
                  autoComplete='nope'
                  errorMessages={{
                    required: 'The field is required',
                  }}
                />
              </div>

              <div className="column-4" style={{padding: '0 0 0 8px'}}>

                <Select placeholder="Title"
                  name={`owner_title_${this.props.index}`}
                  options={titlesOptions}
                  rules={['required']}
                  formErrors={this.props.formErrors}
                  defaultValue={this.props.ownerInfo.owner_title}
                  inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_title')}
                  required
                  autoComplete='nope'
                  errorMessages={{
                    required: 'The field is required',
                  }}
                />

              </div>
            </div>

            <div className="form-element">
              <div className="column-8" style={{padding: '0px'}}>
              <Input placeholder='Phone Number'
                  name={`owner_phone_${this.props.index}`}
                  rules={['required', ['matches', /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/]]}
                  formErrors={this.props.formErrors}
                  defaultValue={this.props.ownerInfo.owner_phone}
                  inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_phone')}
                  required
                  autoComplete='nope'
                  errorMessages={{
                    matches: 'Invalid phone number',
                    required: 'The field is required',
                  }}
                  onBlur = {()=> {this.formatPhone(this.props.index, `owner_phone_${this.props.index}`);}}
              />
              </div>

              <div className="column-4" style={{padding: '0 0 0 8px'}}>

                <Select placeholder="Gender"
                  name={`owner_gender_${this.props.index}`}
                  options={genderOptions}
                  rules={['required']}
                  formErrors={this.props.formErrors}
                  defaultValue={this.props.ownerInfo.owner_gender}
                  inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_gender')}
                  required
                  autoComplete='nope'
                  errorMessages={{
                    required: 'The field is required',
                  }}
                />

              </div>
            </div>
            <div className="form-element">
              <Input placeholder='Email'
                name={`owner_email_${this.props.index}`}
                rules={['required', 'custom_email']}
                formErrors={this.props.formErrors}
                defaultValue={this.props.ownerInfo.owner_email}
                inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_email')}
                required
                autoComplete='nope'
                errorMessages={{
                  custom_email: 'Invalid Email',
                  required: 'The field is required',
                }}
              />

            </div>

            <div className="form-element">
              <div className="column-4" style={{padding: '0 8px 0 0'}}>
                <Select placeholder="DOB Month"
                  name={`owner_dob_month_${this.props.index}`}
                  options={monthsOptions} rules={['required']}
                  formErrors={this.props.formErrors}
                  defaultValue={this.props.ownerInfo.owner_dob_month}
                  inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_dob_month')}
                  required
                  autoComplete='nope'
                  errorMessages={{
                    required: 'The field is required',
                  }}
                />

              </div>
              <div className="column-4" style={{padding: '0'}}>
                <Select placeholder="DOB Day"
                  name={`owner_dob_day_${this.props.index}`}
                  options={daysOptions} rules={['required']}
                  formErrors={this.props.formErrors}
                  defaultValue={this.props.ownerInfo.owner_dob_day}
                  inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_dob_day')}
                  required
                  autoComplete='nope'
                  errorMessages={{
                    required: 'The field is required',
                  }}
                />

              </div>
              <div className="column-4" style={{padding: '0 0 0 8px'}}>
                <Select placeholder="DOB Year"
                  name={`owner_dob_year_${this.props.index}`}
                  options={yearsOptions} rules={['required']}
                  formErrors={this.props.formErrors}
                  defaultValue={this.props.ownerInfo.owner_dob_year}
                  inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_dob_year')}
                  required
                  autoComplete='nope'
                  errorMessages={{
                    required: 'The field is required',
                  }}
                />

              </div>
            </div>
            <div className="form-element">
              <Input placeholder='Social Security Number'
                name={`owner_ssn_${this.props.index}`}
                rules={['required', 'ssn', ['matches', /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/]]}
                type={actionType}
                formErrors={this.props.formErrors}
                defaultValue={this.props.ownerInfo.owner_ssn}
                inputChanged={(v) => this.formatSSN(v, this.props.index)}
                required
                autoComplete='nope'
                errorMessages={{
                  required: 'The field is required',
                  ssn: 'Invalid Social Security Number',
                  matches: 'Social Security Number should be 9 digit number'
                }}
                icon={eyeIcon}
                onBlur = {this.iconClick}
              />

            </div>
            <div className="form-element">
              <Select placeholder="For tax reporting purposes are you either of the following?"
                name={`owner_taxes_${this.props.index}`}
                options={taxesOptions} rules={['required']}
                formErrors={this.props.formErrors}
                defaultValue={this.props.ownerInfo.owner_taxes}
                inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_taxes')}
                required
                autoComplete='nope'
                errorMessages={{
                  required: 'The field is required',
                }}
              />

            </div>
          </div>

          <div className="column-6">
            <div className="form-element">
              <Input placeholder='Home Address'
                name={`owner_address_1_${this.props.index}`}
                rules={['required']}
                autoComplete='nope'
                formErrors={this.props.formErrors}
                defaultValue={this.props.ownerInfo.owner_address_1}
                inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_address_1')}
                required
                errorMessages={{
                  required: 'The field is required',
                }}

              />

            </div>
            <div className="form-element">
              <Input placeholder='Home Unit, Apt, Suite etc. (optional)'
                name={`owner_address_2_${this.props.index}`}
                rules={[]}
                formErrors={this.props.formErrors}
                defaultValue={this.props.ownerInfo.owner_address_2}
                inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_address_2')}

                autoComplete='nope'
              />
            </div>
            <div className="form-element">
              <Input placeholder="ZIP"
                name={`owner_zip_${this.props.index}`}
                rules={['required', 'numeric', ['isLength', {min:zipLength, max: zipLength}]]}
                formErrors={this.props.formErrors}
                defaultValue={this.props.ownerInfo.owner_zip}
                inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_zip')}
                onBlur={(e) => {this.populateOwnerCityNState(e, this.props.index);}}
                required
                autoComplete='nope'
                errorMessages={{
                  numeric: 'Only numeric values allowed',
                  required: 'The field is required',
                  isLength: 'Zip code length should be 5 digits'
                }}
              />

            </div>
            <div className="form-element">
              <Input placeholder="City"
                name={`owner_city_${this.props.index}`}
                rules={['required']}
                formErrors={this.props.formErrors}
                defaultValue={this.props.ownerInfo.owner_city}
                inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_city')}
                required
                autoComplete='nope'
                errorMessages={{
                  required: 'The field is required',
                }}
              />

            </div>
            <div className="form-element">
              <Select placeholder="State"
                name={`owner_state_${this.props.index}`}
                options={statesOptions} rules={['required']}
                formErrors={this.props.formErrors}
                defaultValue={this.props.ownerInfo.owner_state}
                inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_state')}
                required
                autoComplete='nope'
                errorMessages={{
                  required: 'The field is required',
                }}
              />

            </div>
            <div className="form-element">
              <Select placeholder="% owned"
                name={`owner_percent_${this.props.index}`}
                options={percentageOptions} rules={['required']}
                formErrors={this.props.formErrors}
                defaultValue={this.props.ownerInfo.owner_percent}
                inputChanged={(v) => this.updateOwnerInfo(v, this.props.index, 'owner_percent')}
                required
                autoComplete='nope'
                errorMessages={{
                  required: 'The field is required',
                }}
              />

            </div>
          </div>
        </div>
    );
  }

}