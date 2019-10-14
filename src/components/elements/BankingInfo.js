import React, { Component } from 'react';
import { Input } from './fancyField';
import { verifyABARouting } from '../../ServiceActions';

class BankingInfo extends Component {
	/**
	 * checkABARoutingInfo
	 */
	checkABARoutingInfo = value => {
		let maxLengthABA = 9;
		if (value && value.length !== maxLengthABA) {
			return;
		}

		let { bankingInfo } = this.props;

		if (bankingInfo.routingNumber) {
			let data = { routingNumber: bankingInfo.routingNumber };
			verifyABARouting(
				data,
				response => {
					let infoMsg = response && response.data && response.data.bankName ? response.data.bankName : false;
					this.props.updateState({ routingInfo: infoMsg, routingError: false });
				},
				error => {
					let errMsg = error && error.message ? error.message : false;
					this.props.updateState({ routingInfo: false, routingError: errMsg });
				}
			);
		}
	};

	render() {
		const { bankingInfo } = this.props;
		const { routingInfo, routingError } = bankingInfo;

		let configs = [
			{
				name: 'routingNumber',
				id: 'routingNumber',
				type: 'text',
				placeholder: 'ABA routing number',
				rules: ['required', 'numeric', ['isLength', { min: 9, max: 9 }]],
				defaultValue: bankingInfo.routingNumber,
				inputChanged: (val, e) => {
					this.props.updateState({ routingNumber: val });
					this.checkABARoutingInfo(val);
				},
				required: true,
				autoComplete: 'nope',
				errorMessages: {
					numeric: 'Only numeric values allowed',
					required: 'The field is required',
					isLength: 'Please enter 9 digit routing number',
				},
			},
			{
				inputType: 'custom',
				getComponents: () => {
					return (routingError ?
						<p className="form-error-detail" key="error">
							<i className="fa fa-info-circle" />
							{routingError}
						</p>
					: routingInfo ?
						<p className="small align-right" key="info">
							<i className="fa fa-check-circle" style={{ color: 'forestgreen', marginRight: '4px' }} />
							{routingInfo}
						</p>
						: null
					);
				},
			},
			{
				name: 'accountNumber',
				id: 'accountNumber',
				type: 'text',
				placeholder: 'Checking account number',
				rules: ['required', 'numeric', ['isLength', { min: 3, max: 17 }]],
				defaultValue: bankingInfo.accountNumber,
				ref: instance => {
					this.accountNumberInstance = instance;
				},
				inputChanged: (val, e) => {
					this.props.updateState({ accountNumber: val });
				},
				onPaste: e => this.handlePaste(e),
				required: true,
				autoComplete: 'nope',
				errorMessages: {
					numeric: 'Only numeric values allowed',
					required: 'The field is required',
					isLength: 'Account number length varies from 3 digits to 17 digits',
				},
			},
			{
				name: 'accountNumber2',
				id: 'accountNumber2',
				type: 'text',
				placeholder: 'Re-enter checking account number',
				rules: ['required', 'numeric', ['equalsTo', this.accountNumberInstance]],
				defaultValue: bankingInfo.accountNumber2,
				inputChanged: (val, e) => {
					this.props.updateState({ accountNumber2: val });
				},
				onPaste: e => this.handlePaste(e),
				required: true,
				autoComplete: 'nope',
				errorMessages: {
					numeric: 'Only numeric values allowed',
					required: 'The field is required',
					equalsTo: 'Value should match checking account number',
				},
			},
		];

		return (
			<div className="form-group clearfix margin-top">
				<br />
				<h2>Banking Information</h2>
				<p className="subhead">
					All sales made will be credited to this account. Purchase of Clover Go reader, transaction fees and
					chargebacks may be debited from this account as per agreement with Herbalife.
				</p>
				<div className="column-6">
					{configs.map((config) => {
						if (config.inputType && config.inputType === 'custom') {
							return config.getComponents();
						}
						return <Input key={config.id} {...config} formErrors={this.props.formErrors} />;
					})}
				</div>
				<div className="column-6">
					<div className="form-element">
						<img src={require('../../img/ach.png')} style={{ maxWidth: '400px' }} alt=""/>
					</div>
				</div>
			</div>
		);
	}
}

export default BankingInfo;
