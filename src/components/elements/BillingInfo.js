import React, {Component} from 'react';
import { Input, Select } from './fancyField';
import {states} from '../../const';

class BillingInfo extends Component {

    constructor(props) {
        super(props)
        let stateOptions = states.map(s => { return {defaultValue: s.abbr, label: s.name};});
        this.state = {
            stateOptions
        };
    }

    render() {
        
        const {shippingInfo, isShippingChecked} = this.props;
        const {stateOptions} = this.state;
        const zipLength = 5;

        return (
                <div id="shipping-address" className="clearfix column-6">
                    <h3>Billing Information</h3>
                    <p className="subhead"><input type="checkbox" id="chk_shipping" checked = {isShippingChecked}
                        onChange={() => this.props.updateShipping()} /> &nbsp;Same as business address</p>
                    <div className="form-element multiple">
                        <Input
                            name="businessZip" id="businessZip" type="text" placeholder="ZIP Code"
                            rules={['required', 'numeric', ['isLength', {min:zipLength, max: zipLength}]]}
                            formErrors={this.props.formErrors} defaultValue={shippingInfo.businessZip}
                            labelStyle={{marginBottom: '8px'}}
                            inputChanged={(val, e) => (this.props.updateShippingInfo(e.target.name, val))}
                            onBlur={this.props.populateCityNState}
                            required
                            autoComplete='nope'
                            errorMessages={{
                                numeric: 'Only numeric values allowed',
                                required: 'The field is required',
                                isLength: 'Zip code length should be 5 digits'
                            }}
                        />

                        <Input
                            name="businessAddress1" id="businessAddress1" type="text" placeholder="Street Address"
                            rules={['required', ['isLength', {min: 1, max: 24}]]} formErrors={this.props.formErrors} defaultValue={shippingInfo.businessAddress1}
                            labelStyle={{marginBottom: '8px'}}
                            inputChanged={(val, e) => (this.props.updateShippingInfo(e.target.name, val))}
                            required
                            autoComplete='nope'
                            errorMessages={{
                                required: 'The field is required',
                                isLength: 'Street Address cannot exceed 25 characters including spaces'
                            }}
                        />

                        <Input
                            name="businessAddress2" id="businessAddress2" type="text" placeholder="Unit, Apt, Suite etc. (optional)"
                            rules={[['isLength', {min: 0, max: 24}]]} formErrors={this.props.formErrors}
                            defaultValue={shippingInfo.businessAddress2}
                            labelStyle={{marginBottom: '8px'}}
                            inputChanged={(val, e) => (this.props.updateShippingInfo(e.target.name, val))}
                            autoComplete='nope'
                            errorMessages={{
                                isLength: 'Unit, Apt, Suite etc. cannot exceed 24 characters including spaces'
                            }}
                        />

                        <Input
                            name="businessCity" id="businessCity" type="text" placeholder="Business City"
                            rules={['required', ['isLength', {min: 1, max: 24}]]} formErrors={this.props.formErrors}
                            defaultValue={shippingInfo.businessCity}
                            labelStyle={{marginBottom: '8px'}}
                            inputChanged={(val, e) => (this.props.updateShippingInfo(e.target.name, val))}
                            required
                            autoComplete='nope'
                            errorMessages={{
                                isLength: 'Business City cannot exceed 24 characters including spaces'
                            }}
                        />
                       <Select
                            name="businessState" placeholder=" Business State"
                            options={stateOptions}
                            rules={['required']}
                            formErrors={this.props.formErrors}
                            defaultValue={shippingInfo.businessState}
                            inputChanged={(val, e) => (this.props.updateShippingInfo(e.target.name, val))}
                            required
                            autoComplete='nope'
                            errorMessages={{
                                required: 'The field is required',
                            }}
                        />
                    </div>
                 </div>
        )
    }
}

export default BillingInfo;