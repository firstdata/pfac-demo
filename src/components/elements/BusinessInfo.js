import React, {Component} from 'react';
import { Input, Select, Autocomplete} from './fancyField';
import { months, years, states, organizations } from '../../const';
import {  sales} from '../../const';
import Geocode from 'react-geocode';

class BusinessInfo extends Component {
    constructor(props) {
        super(props);
        let yearsOptions = years.map(y => { return {defaultValue: y.abbr, label: y.name};});
        let monthsOptions = months.map(m => {return {defaultValue: m.abbr, label: m.name};});
        let stateOptions = states.map(s => { return {defaultValue: s.abbr, label: s.name};});
        let organizationsOptions = organizations.map(o => {return {defaultValue: o.abbr, label: o.name};});
        let salesOptions = sales.map(s=> {return {defaultValue: s.abbr, label: s.name};});
        this.state = {
            yearsOptions,
            monthsOptions,
            stateOptions,
            organizationsOptions,
            salesOptions,
            dbaList: [],
        }
        Geocode.setApiKey('AIzaSyBG-Xskhm-9KiwwajAKuLJPj7_b6dl4YBg');
    }

    /**
    * format EIN
    */
    formatEIN = (v) => {
        let ein = v;
        let position_1 = 3;
        let position_2 = 6;
        let newEIN = '';

        ein = ein.replace(/-/g, '');
        ein = ein.replace(' ', '');

        if((ein.length > position_1) && (ein.length < position_2)) {
        newEIN += ein.substr(0, position_1) + '-';
        ein = ein.substr(position_1);
        }
        if (ein.length > position_2-1) {
        newEIN += ein.substr(0, position_1) + '-';
        newEIN += ein.substr(position_1, 2) + '-';
        ein = ein.substr(position_2-1);
        }
        newEIN += ein;
        this.props.updateBusinessInfo('business_EIN', newEIN);
    }

    render() {
        const zipLength = 5;
        const {dbaList, yearsOptions, monthsOptions, stateOptions, organizationsOptions, salesOptions} = this.state;

        return (
            <div className="form-group" style={{clear: 'both'}}>
                        <h2>Tell us about the business.</h2>
                        <div className="column-6 no-top-padding">
                            <div className="form-element">
                                <Input name="business_zip" id="business_zip" type="text" placeholder="Business ZIP" 
                                    defaultValue={this.props.businessInfo.business_zip}
                                    rules={['required', 'numeric', ['isLength', {min:zipLength, max: zipLength}]]}
                                    autoComplete='nope'
                                    errorMessages={{
                                        numeric: 'Only numeric values allowed',
                                        required: 'The field is required',
                                        isLength: 'Zip code length should be 5 digits'
                                    }}
                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                    onBlur={this.props.populateBICityNState}
                                />
                            </div>
                            <div className="form-element">
                                <Autocomplete name='dbaName' autoComplete='nope'
                                    required
                                    defaultValue={this.props.businessInfo.dbaName} 
                                    rules={['required', ['matches', /^[a-zA-Z0-9 ]*$/i]]}
                                    formErrors={this.props.formErrors} placeholder='DBA Name'
                                    onSelect={(value, item) => {this.props.handleDBASelect(value, item);}}
                                    onChange={(event) => {this.props.handleDBAChange(event);}}
                                    items={dbaList.map((row)=>{return {
                                        id: row.placeId, name: row.businessname
                                      };})}
                                      shouldItemRender={this.acShouldRender}
              
                                      renderItem={(item, isHighlighted) => {
                                        return (
                                            <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                                                 key={item.id}
                                            >{item.name}</div>
                                        );
                                      }}
                                      errorMessages={{
                                        required: 'The field is required',
                                        matches: 'Only alphanumeric values allowed'
                                      }}
                                />
                            </div>
                            <div className="form-element">
                                <Select name="legalIsDBA" placeholder="Is the legal business name the same as the DBA name?"
                                    options={[{defaultValue: 'y', label: 'Yes'}, {defaultValue: 'n', label: 'No'}]}
                                    rules={['required']} required
                                    formErrors={this.props.formErrors}
                                    defaultValue={this.props.businessInfo.legalIsDBA}
                                    errorMessages={{
                                    required: 'The field is required'
                                    }}

                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))
                                    }
                                />
                            </div>
                            {(this.props.showLegalDBA) ? <div className="form-element">
                                <Input
                                name="legal_business_name" id="legal_business_name" type="text" placeholder="Legal DBA Name"
                                rules={['required', ['matches', /^[a-zA-Z0-9 ]*$/i]]} required
                                formErrors={this.props.formErrors}
                                defaultValue={this.props.businessInfo.legal_business_name}
                                labelStyle={{marginBottom: '8px'}}
                                inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                autoComplete='nope'
                                errorMessages={{
                                    required: 'The field is required',
                                    matches: 'Only alphanumeric values allowed'
                                }}
                                />
                            </div> : '' }

                            <div className="form-element">
                                <Select
                                    name="files_taxes" placeholder="How does this business file taxes?"
                                    options={[{defaultValue: 'ssn', label: 'By owner\'s Social Security Number'}, {defaultValue: 'ein', label: 'By Business Federal Tax ID (EIN)'}]}
                                    rules={['required']} required
                                    formErrors={this.props.formErrors}
                                    defaultValue={this.props.businessInfo.files_taxes}
                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                    autoComplete='nope'
                                    errorMessages={{ required: 'The field is required',}}
                                />
                            </div>
                            
                            {(this.props.showEIN) ? <div className="form-element">
                                <Input name='business_EIN' placeholder='Federal Tax ID (EIN)'
                                    rules={['required', 'ssn', ['matches', /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/]]}
                                    //type={actionType}
                                    formErrors={this.props.formErrors}
                                    defaultValue={this.props.businessInfo.business_EIN}
                                    inputChanged={(v) => {this.formatEIN(v);}}
                                    required
                                    autoComplete='nope'
                                    errorMessages={{
                                    required: 'The field is required',
                                    ssn: 'Invalid SSN/EIN',
                                    matches: 'Federal Tax ID (EIN) should be 9 digit number'
                                    }}
                                    onBlur = {this.iconClick}
                                />
                            </div>:''}

                            <div className="form-element">
                                <div className="column-4" style={{padding:'0 8px 0 0'}}>
                                    <Select name="business_year" placeholder="Yr. business started"
                                    options={yearsOptions}
                                    rules={['required']}
                                    required
                                    errorMessages={{
                                    required: 'The field is required',
                                    }}
                                    autoComplete='nope'
                                    formErrors={this.props.formErrors}
                                    defaultValue={this.props.businessInfo.business_year}
                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                    />
                                </div>
                                <div className="column-4" style={{padding: '0'}}>
                                <Select
                                    name="business_month" placeholder="Mo. business started"
                                    options={monthsOptions}
                                    rules={['required']} required
                                    formErrors={this.props.formErrors}
                                    defaultValue={this.props.businessInfo.business_month}
                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                    autoComplete='nope'
                                    errorMessages={{
                                        required: 'The field is required',
                                    }} />

                                </div> 
                                <div className="column-4" style={{padding:'0 0 0 8px'}}>
                                    <Select
                                        name="incorp_state" placeholder="State of incorporation"
                                        options={stateOptions}
                                        rules={['required']} required
                                        formErrors={this.props.formErrors}
                                        defaultValue={this.props.businessInfo.incorp_state}
                                        inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                        autoComplete='nope'
                                        errorMessages={{
                                            required: 'The field is required',
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-element">
                                <Select
                                    name="orgtype" placeholder="Organization type"
                                    options={organizationsOptions}
                                    rules={['required']} required
                                    formErrors={this.props.formErrors}
                                    defaultValue={this.props.businessInfo.orgtype}
                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                    autoComplete='nope'
                                    errorMessages={{
                                    required: 'The field is required',
                                    }}
                                />
                            </div>

                            <div className="form-element">
                                <Input name='business_phone'
                                    placeholder='Business phone number'
                                    rules={['required', ['matches', /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/]]}
                                    autoComplete='nope' required
                                    formErrors={this.props.formErrors}
                                    defaultValue={this.props.businessInfo.business_phone}
                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                    errorMessages={{
                                    required: 'The field is required',
                                    matches: 'Invalid phone number',
                                    }}
                                    onBlur = {()=> {this.props.formatPhone('business_phone');}}
                                />
                            </div>

                            <div className="form-element">
                                <Input name='business_website' placeholder='Business Website (optional)'
                                    rules={[]}
                                    formErrors={this.props.formErrors}
                                    defaultValue={this.props.businessInfo.business_website}
                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                    autoComplete='nope'
                                />
                            </div>
                        </div>

                        <div className="column-6 no-top-padding">
                            <div className="form-element">
                                <Input name='sale_amount' id="sale_amount" type="text" placeholder="Typical sale amount"
                                    rules={['required', 'numeric']} required
                                    autoComplete='nope'
                                    errorMessages={{
                                    numeric: 'Only numeric values allowed',
                                    required: 'The field is required'
                                    }}
                                    formErrors={this.props.formErrors}
                                    defaultValue={this.props.businessInfo.sale_amount}
                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                />
                            </div>
                            <div className="form-element">
                                <Select name="cc_sales" placeholder="Anticipated annual credit card sales"
                                    options={salesOptions} rules={['required']}
                                    required
                                    errorMessages={{ required: 'The field is required'}}
                                    formErrors={this.props.formErrors}
                                    defaultValue={this.props.businessInfo.cc_sales}
                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                />
                            </div>

                            <div className="form-element multiple">
                                <p>Primary Business Address</p>

                                <Input
                                    name="business_address_1" id="business_address_1" placeholder="Business Street Address"
                                    rules={['required', ['isLength', {min: 1, max: 24}]]}
                                    formErrors={this.props.formErrors}
                                    defaultValue={this.props.businessInfo.business_address_1}
                                    labelStyle={{marginBottom: '8px'}}
                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                    required
                                    autoComplete='nope'
                                    errorMessages={{
                                        required: 'The field is required',
                                        isLength: 'Street Address cannot exceed 25 characters including spaces'
                                    }}
                                />

                                <Input
                                    name="business_address_2" id="business_address_2" type="text" placeholder="Business Unit, Apt, Suite etc. (optional)"
                                    rules={[]}  formErrors={this.props.formErrors} defaultValue={this.props.businessInfo.business_address_2}
                                    labelStyle={{marginBottom: '8px'}}
                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                    autoComplete='nope'
                                />

                                <Input
                                    name="business_city" id="business_city" type="text" placeholder="City"
                                    rules={['required']} formErrors={this.props.formErrors} defaultValue={this.props.businessInfo.business_city}
                                    labelStyle={{marginBottom: '8px'}}
                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                    required
                                    autoComplete='nope'
                                    errorMessages={{ required: 'The field is required', }}
                                />

                                <Select name="business_state" placeholder="State"
                                    options={stateOptions} rules={['required']}
                                    formErrors={this.props.formErrors}
                                    defaultValue={this.props.businessInfo.business_state}
                                    inputChanged={(val, e) => (this.props.updateBusinessInfo(e.target.name, val))}
                                    required
                                    autoComplete='nope'
                                    errorMessages={{ required: 'The field is required', }}
                                />

                            </div>
                        </div>
                    </div>

        );
    }

}

export default BusinessInfo;