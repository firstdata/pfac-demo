import React, { Component } from 'react';
import { Input, Select, Autocomplete } from '../components/elements/fancyField';
import { Redirect } from 'react-router-dom';
import OwnerComponent from '../components/elements/OwnerComponent';
import BankingInfo from '../components/elements/BankingInfo';
import Geocode from 'react-geocode';
import BillingInfo from '../components/elements/BillingInfo';
import BusinessInfo from '../components/elements/BusinessInfo';
import * as ServiceActions from '../ServiceActions';
import { connect } from 'react-redux';

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			businessInfo: {
				dbaName: '',
				legalIsDBA: '',
				legal_business_name: '',
				business_year: '',
				business_month: '',
				incorp_state: '',

				files_taxes: '',
				business_EIN: '',

				business_phone: '',
				business_website: '',
				sale_amount: '',
				cc_sales: '',
				orgtype: 'SOLE PROPRIETOR',

				business_address_1: '',
				business_address_2: '',
				business_zip: '',
				business_city: '',
				business_state: '',
			},
			ownerInfo: [
				{
					owner_name: '',
					owner_title: 'owner',
					owner_phone: '',
					owner_gender: '',
					owner_dob_month: '',
					owner_dob_day: '',
					owner_dob_year: '',
					owner_ssn: '',
					owner_taxes: '',
					owner_address_1: '',
					owner_address_2: '',
					owner_zip: '',
					owner_city: '',
					owner_state: '',
					owner_percent: '100',
					owner_email: '',
				},
			],
			formErrors: {},
			actionIcon: 'fancy-field-icon fa fa-eye',
			actionType: 'text',
			bankingInfo: {},
			routingError: false,
			routingInfo: false,
			products: [],
			cardReaderQty: 1,
			isShippingChecked: false,
			spin: false,
			showLegalDBA: false,
			routingError: false,
			routingInfo: false,
			shippingInfo: {},
			showEIN: false,
			cartDetails: [],
			isReaderProduct: false,
		};

		Geocode.setApiKey('AIzaSyBG-Xskhm-9KiwwajAKuLJPj7_b6dl4YBg');

		ServiceActions.getProductsList();
	}

	/**
	 * formatPhone
	 */
	formatPhone = phone_type => {
		let { formErrors, businessInfo } = this.state;

		if (formErrors[phone_type].$error) {
			return;
		}

		let phone = businessInfo[phone_type];
		let position_1 = 4;
		let position_2 = 9;

		phone = phone.replace(/-/g, '');
		phone = phone.replace('(', '');
		phone = phone.replace(')', '');
		phone = phone.replace(' ', '');

		phone = '(' + phone;
		phone = [phone.slice(0, position_1), ') ', phone.slice(position_1)].join('');
		phone = [phone.slice(0, position_2), '-', phone.slice(position_2)].join('');

		businessInfo[phone_type] = phone;

		this.setState({ businessInfo: businessInfo });
	};

	/**
	 * iconClick()
	 */
	iconClick = () => {
		let { actionIcon, actionType } = this.state;

		if (actionType === 'text') {
			actionIcon = 'fancy-field-icon fa fa-eye-slash';
			actionType = 'password';
		} else {
			actionIcon = 'fancy-field-icon fa fa-eye';
			actionType = 'text';
		}

		this.setState({ actionIcon, actionType });
	};

	/**
	 * setupOwnerComponents
	 */
	setupOwnerComponents = () => {
		let { ownerInfo, formErrors } = this.state;

		let components = ownerInfo.map((oi, index) => {
			return (
				<OwnerComponent
					ownerInfo={oi}
					key={index}
					index={index}
					formErrors={formErrors}
					onUpdate={(val, ix, field_name) => this.updateOwnerInfo(val, ix, field_name)}
					onDelete={ix => this.deleteOwnerInfo(ix)}
				/>
			);
		});
		return components;
	};

	/**
	 * deleteOwnerInfo
	 */
	deleteOwnerInfo = ix => {
		let { ownerInfo } = this.state;
		if (ownerInfo[ix]) {
			ownerInfo.splice(ix, 1);
			this.setState({ ownerInfo: ownerInfo });
		}
	};

	/**
	 * updateOwnerInfo(val, ix, field_name)
	 */
	updateOwnerInfo = (val, ix, field_name) => {
		let { ownerInfo } = this.state;

		if (ownerInfo[ix]) {
			let oi = ownerInfo[ix];
			if (oi[field_name] !== undefined && oi[field_name] !== null) {
				oi[field_name] = val;
				this.setState({ ownerInfo: ownerInfo });
			}
		}
	};

	/**
	 * addOwner
	 */
	addOwner = () => {
		let { ownerInfo } = this.state;

		let new_owner = {
			owner_name: '',
			owner_title: '',
			owner_phone: '',
			owner_gender: '',
			owner_dob_month: '',
			owner_dob_day: '',
			owner_dob_year: '',
			owner_ssn: '',
			owner_taxes: '',
			owner_address_1: '',
			owner_address_2: '',
			owner_zip: '',
			owner_city: '',
			owner_state: '',
			owner_percent: '',
			owner_email: '',
		};
		ownerInfo.push(new_owner);
		this.setState({ ownerInfo: ownerInfo });
	};

	/**
	 * check if the form is ready for submit
	 * @return {boolean}
	 */
	isSubmitReady = () => {
		const { formErrors, spin, routingError, cartDetails } = this.state;

		if (!formErrors.$valid) {
			return false;
		}

		if (!cartDetails || cartDetails.length < 1) {
			return false;
		}

		if (spin || (routingError && this.verifyCounter < this.verifyAttempts)) {
			return false;
		}

		return true;
	};

	/**
	 * fetch city
	 **/
	fetchAddressType(address_components, type) {
		let component = address_components.find(c => {
			let ix = c.types.findIndex(t => t === type);
			let component = ix > -1 ? c : null;
			return component;
		});

		let name = component ? component.short_name : '';
		return name;
	}

	/**
	 * populateCityNState
	 * use google geocode to fetch
	 * City/State based on Zip
	 */
	populateBICityNState = () => {
		let { formErrors, businessInfo } = this.state;

		if (
			formErrors &&
			formErrors.business_zip &&
			formErrors.business_zip.$error &&
			formErrors.business_zip.$touched
		) {
			return;
		}

		// Get city and state from address components.
		Geocode.fromAddress(businessInfo.business_zip).then(
			response => {
				const address_components = response.results[0].address_components;
				businessInfo.business_city = this.fetchAddressType(address_components, 'locality');
				businessInfo.business_state = this.fetchAddressType(address_components, 'administrative_area_level_1');

				this.setState({
					businessInfo: businessInfo,
				});
			},
			error => {
				businessInfo.business_city = '';
				businessInfo.business_state = '';

				this.setState({
					businessInfo: businessInfo,
				});
				console.log(error);
			}
		);
	};

	/**
	 * populateCityNState
	 * use google geocode to fetch
	 * City/State based on Zip
	 */
	populateCityNState = () => {
		let { formErrors, shippingInfo } = this.state;

		if (formErrors && formErrors.businessZip && formErrors.businessZip.$error && formErrors.businessZip.$touched) {
			return;
		}

		// Get city and state from address components.
		Geocode.fromAddress(shippingInfo.businessZip).then(
			response => {
				const address_components = response.results[0].address_components;
				shippingInfo.businessCity = this.fetchAddressType(address_components, 'locality');
				shippingInfo.businessState = this.fetchAddressType(address_components, 'administrative_area_level_1');
				this.setState({
					shippingInfo: shippingInfo,
				});
			},
			error => {
				shippingInfo.businessCity = '';
				shippingInfo.businessState = '';
				this.setState({
					shippingInfo: shippingInfo,
				});
				console.log(error);
			}
		);
	};

	/**
	 * Update information into the state variable.
	 */
	updateShippingInfo = (key, val) => {
		let { shippingInfo } = this.state;

		shippingInfo['businessAddress2'] = '';
		shippingInfo[key] = val;

		this.setState({ shippingInfo });
	};

	/**
	 * Update shipping information when same as business address is checked by the user.
	 *
	 * @memberof Signup
	 */
	updateShipping = () => {
		let { isShippingChecked, shippingInfo, businessInfo, formErrors } = this.state;
		isShippingChecked = !isShippingChecked;

		if (isShippingChecked) {
			shippingInfo.businessZip = businessInfo.business_zip;
			shippingInfo.businessAddress1 = businessInfo.business_address_1;
			shippingInfo.businessAddress2 = businessInfo.business_address_2;
			shippingInfo.businessCity = businessInfo.business_city;
			shippingInfo.businessState = businessInfo.business_state;

			formErrors.businessAddress1.$error = false;
			formErrors.businessCity.$error = false;
			formErrors.businessState.$error = false;
			formErrors.businessZip.$error = false;
		} else {
			shippingInfo.businessZip = '';
			shippingInfo.businessAddress1 = '';
			shippingInfo.businessAddress2 = '';
			shippingInfo.businessCity = '';
			shippingInfo.businessState = '';

			formErrors.businessAddress1.$error = true;
			formErrors.businessCity.$error = true;
			formErrors.businessState.$error = true;
			formErrors.businessZip.$error = true;
		}

		Input.hasErrors(formErrors);

		this.setState({
			isShippingChecked: isShippingChecked,
			shippingInfo: shippingInfo,
			formErrors: formErrors,
		});
	};

	/**
	 * trimPhone
	 */
	trimPhone = phone => {
		phone = phone.replace(/-/g, '');
		//replace all whitespaces
		phone = phone.replace(/\s/g, '').replace(/\(|\)/g, '');

		return phone;
	};

	/**
	 * getFirstName
	 */
	getFirstName(leaderName) {
		let arrName = leaderName.split(' ');

		let firstName = arrName.length > 1 ? arrName[0] : leaderName;
		return firstName;
	}

	/**
	 * getLastName
	 */
	getLastName(leaderName) {
		let arrName = leaderName.split(' ');

		let firstName = arrName.length > 1 ? arrName[1] : leaderName;
		return firstName;
	}

	updateBusinessState = () => {};

	/**
	 * handle select DBA
	 * @param value
	 */
	handleDBASelect = (value, item) => {
		let { businessInfo } = this.state;
		if (item) {
			businessInfo.dbaName = value;
			this.setState({ businessInfo });
			//UserActions.getDBALocationDetails(item.id);
		}
	};

	/**
	 * handle DBA change
	 * @param e
	 * @param name
	 * @param value
	 */
	handleDBAChange = event => {
		let searchKey = event.target.value;
		let { businessInfo, formErrors } = this.state;
		let searchLength = 1;

		if (searchKey && searchKey.length > searchLength) {
			businessInfo.dbaName = searchKey;
			this.setState({ businessInfo: businessInfo });

			if (
				formErrors &&
				formErrors.business_zip &&
				formErrors.business_zip.$error &&
				formErrors.business_zip.$touched
			) {
				//zip is not correct search by location
				//this.handleLocationSearchDebounced();
				return;
			} else {
				if (businessInfo.business_zip.length > 1) {
					//zip field untouched
					//UserActions.getZipDBALookup(businessInfo.business_zip, searchKey);
				} else {
					//this.handleLocationSearchDebounced();
				}
			}
		}
	};

	/**
	 * addToOrder
	 * @product - product to add
	 */
	addToOrder = product => {
		let { cartDetails, isReaderProduct } = this.state;
		let qty = 1;
		const readerType = 'FirstDataPOS';

		let orderedProd = {
			productId: product.productId,
			price: 0,
			qty: qty,
			term: product.defaultPurchaseType,
			productType: product.productType,
		};

		cartDetails.push(orderedProd);
		let isReader = product.offeringTypes.find(type => type === readerType) !== undefined ? true : false;

		this.setState({
			cartDetails: cartDetails,
			isReaderProduct: isReader,
		});
	};

	/**
	 * removeFromOrder
	 * @product
	 */
	removeFromOrder = product => {
		let { cartDetails } = this.state;

		cartDetails = cartDetails.filter(item => {
			return !(item.productId === product.productId);
		});

		this.setState({
			cartDetails: cartDetails,
			isReaderProduct: false,
		});
	};

	/**
	 * Update businessInfo from BusinessInfo component
	 */

	updateBusinessInfo = (key, val) => {
		let { businessInfo } = this.state;

		businessInfo[key] = val;

		if (key == 'legalIsDBA') {
			this.setState({ businessInfo: businessInfo, showLegalDBA: val === 'n' });
		} else if (key == 'files_taxes') {
			this.setState({ businessInfo: businessInfo, showEIN: val === 'ein' });
		} else {
			this.setState({ businessInfo: businessInfo });
		}
	};

	/**
	 * Update banking information from BankingInfo component
	 */

	updateBankingInfo = state => {
		let { bankingInfo } = this.state;
		for (let key in state) {
			bankingInfo[key] = state[key];
		}
		this.setState({ bankingInfo });
	};

	/**
	 * Add credit info as part of payload
	 */
	defaultMerchantCreditInfo = data => {
		let merchantCreditInformation = {
			bbbRating: 'good',
			complaints12Months: 0,
			complaints36Months: 0,
			OFACReviewPassed: 'Y',
			totalDocumentsNumber: 0,
		};
		data.merchantCreditInformation = merchantCreditInformation;
	};

	/**
	 * add default site surbvey values
	 */
	defaultSiteSurvey = data => {
		let siteSurvey = {
			siteVisitation: 'N',
			onSiteVisitPerformed: 'N',
			productsandServicesSold: 'OPTICAL',
		};
		data.siteSurvey = siteSurvey;
	};

	/**
	 * add Merchant Transaction Information
	 */
	addMerchantTransactionInformation = data => {
		let { businessInfo } = this.state;

		let merchantTransactionInformation = {
			mccTypes: 'Business to Business (Supplies)',
			mcc: '5812',
			annualVolume: parseInt(businessInfo.cc_sales),
			averageTicket: parseInt(businessInfo.sale_amount),
			highestTicket: parseInt(businessInfo.sale_amount),
			category: 'RETAIL',
		};

		data.merchantTransactionInformation = merchantTransactionInformation;
	};

	/**
	 * add merchant Contact Information
	 */
	addMerchantContactInformation = data => {
		let { businessInfo, shippingInfo } = this.state;

		let merchantContactInformation = [];
		let business_address =
			businessInfo.business_address_2.length > 2
				? businessInfo.business_address_1 + ', ' + businessInfo.business_address_2
				: businessInfo.business_address_1;
		let billing_address =
			shippingInfo.businessAddress2 && shippingInfo.businessAddress2.length > 2
				? shippingInfo.businessAddress1 + ', ' + shippingInfo.businessAddress2
				: shippingInfo.businessAddress1;
		merchantContactInformation.push(
			{
				contactType: 'TRADING',
				state: businessInfo.business_state,
				postalCode: businessInfo.business_zip,
				address1: business_address,
				phone: this.trimPhone(businessInfo.business_phone),
				country: 'USA',
				city: businessInfo.business_city,
				email: businessInfo.email,
				url: 'ENT.COM',
			},
			{
				contactType: 'BILLING',
				state: shippingInfo.businessState,
				postalCode: shippingInfo.businessZip,
				address1: billing_address,
				phone: this.trimPhone(businessInfo.business_phone),
				country: 'USA',
				city: shippingInfo.businessCity,
				email: businessInfo.email,
				url: 'ENT.COM',
			}
		);

		data.merchantContactInformation = merchantContactInformation;
	};

	/**
	 *
	 */

	addMerchantLocationInformation = data => {
		let { businessInfo, showEIN, ownerInfo, showLegalDBA } = this.state;

		let merchantLocationInformation = [];
		let merchantInfo = {};

		let timeframeforDelivery = {
			percentDelivered0Days: '0',
			percentDelivered7Days: '0',
			percentDelivered14Days: '0',
			percentDelivered30Days: '10',
			percentDeliveredMore30Days: '90',
		};

		let percentOfAnnualCardVolume = {
			businessToBusiness: '0',
			businessToConsumer: '100',
		};
		let percentageOfTotalAnnualVolume = {
			businessToBusiness: '0',
			businessToConsumer: '100',
		};

		merchantLocationInformation.push({
			timeframeforDelivery: timeframeforDelivery,
			percentOfAnnualCardVolume: percentOfAnnualCardVolume,
			percentageOfTotalAnnualVolume: percentageOfTotalAnnualVolume,
			highestTicket: 56,
			faceToFace: '100',
			percentTransactionsOverPhoneorEmail: '0',
			percentTransactionsOverInternet: '0',
			stateOfIncorporation: businessInfo.incorp_state,
			taxFilingName: businessInfo.dbaName,
			istheBusinessaForeignEntity: 'N',
			tinRequestedGuid: '17487900F244257DA',
			dbaName: businessInfo.dbaName,
			legalName: showLegalDBA ? businessInfo.legal_business_name : businessInfo.dbaName,
			organizationType: businessInfo.orgtype,
			employeeIdentificationNumber: ownerInfo[0].owner_ssn.replace(/-/g, ''),
			yearsInBusiness: businessInfo.business_year + '-' + businessInfo.business_month + '-' + '01', //'1919-07-01',
			yearsAtLocation: businessInfo.business_year + '-' + businessInfo.business_month + '-' + '01', //'1919-07-01',
			obtained: 'Y',
			endDate: '2027-03-01',
			agentEmail: 'test_merchant@gyft.com',
			totalRevenue: '2000',
			netIncome: '1000',
			totalAssets: '2500',
			totalLiabilities: '1500',
			tangibleNetWorth: '2400',
			workingCapital: '2300',
			currentRation: '1.2',
			debtToTNWRatio: '0.5',
			country: 'USA',
			salesCurrency: [{ currency: 'USD' }],
			pricingType: '01',
			payeezyIndicator: 'N',
			visa: 'Y',
			mc: 'N',
			fundingCurrency: [{ currency: 'USD' }],
			contractSignDate: '2018-01-01',
			legalContactName: 'test name',
			irsSparkExclusion: 'N',
			yearIncorporated: businessInfo.business_year, //'1919-07-01'; + '-' + businessInfo.business_month + '-' + '01'
		});

		data.merchantLocationInformation = merchantLocationInformation;
	};

	/**
	 * add Owner Info
	 */

	addOwnerInfo = data => {
		let owInfo = [];
		let { ownerInfo } = this.state;

		ownerInfo.forEach((oi, idx) => {
			owInfo.push({
				firstName: this.getFirstName(oi.owner_name),
				lastName: this.getLastName(oi.owner_name),
				address:
					oi.owner_address_2.length > 2 ? oi.owner_address_1 + ', ' + oi.owner_address_2 : oi.owner_address_1,
				dateOfBirth: oi.owner_dob_year + '-' + oi.owner_dob_month + '-' + oi.owner_dob_day,
				nationalId: oi.owner_ssn.replace(/-/g, ''),
				title: oi.owner_title,
				percentageOwnership: oi.owner_percent,
				isPrimary: idx == 0 ? 'Y' : 'N',
				gender: oi.owner_gender,
				taxId: oi.owner_ssn.replace(/-/g, ''),
			});
		});
		data.ownerInformation = owInfo;
	};

	/**
	 * add Bank information
	 */
	addBankInformation = data => {
		const { bankingInfo } = this.state;

		let bankInformation = [];
		bankInformation.push({
			instName: bankingInfo.routingInfo,
			abaNumber: bankingInfo.routingNumber,
			accountNumber: bankingInfo.accountNumber,
			accountType: 'deposits',
		});

		data.bankInformation = bankInformation;
	};

	/**
	 * submit function
	 */
	submit = () => {
		if (!this.isSubmitReady()) {
			return;
		}

		const { cartDetails, spin } = this.state;

		let req = {};
		let data = [];
		if (cartDetails.length > 0) {
			cartDetails.forEach(cart => {
				data.push(cart);
			});
		}

		req.cartDetails = { data: data };
		req.numberOfOutlets = cartDetails.length;

		this.defaultMerchantCreditInfo(req);
		this.defaultSiteSurvey(req);
		this.addMerchantTransactionInformation(req);
		this.addMerchantContactInformation(req);
		this.addMerchantLocationInformation(req);
		this.addOwnerInfo(req);
		this.addBankInformation(req);

		ServiceActions.pfacSignup(req);
		this.setState({
			spin: true,
		});
	};

	/**
	 * render method for rendering the items in the UI
	 */
	render() {
		let {
			formErrors,
			businessInfo,
			actionIcon,
			bankingInfo,
			cardReaderQty,
			shippingInfo,
			spin,
			showEIN,
			showLegalDBA,
			cartDetails,
		} = this.state;

		const eyeIcon = {
			className: actionIcon,
			title: '',
			onClick: () => this.iconClick(),
		};

		const readerType = 'FirstDataPOS';

		const OwnerComponents = this.setupOwnerComponents();

		const eqProducts = this.props.products.map(c => {
			let index = cartDetails.findIndex(e => e.productId === c.productId);
			let isReader = c.offeringTypes.find(type => type === readerType) !== undefined ? true : false;
			let isCartEmpty = cartDetails.length === 0 ? true : false;

			let thumbImg;
			let thumbUrl = '//cdn.firstdata.com/global/img/default-placeholder.png';

			// logic to pick thumb url if any
			if (c.imageUrls !== undefined && c.imageUrls !== null && c.imageUrls.length > 0) {
				let thumbIndex = -1,
					largeIndex = -1;
				for (let i = 0; i < c.imageUrls.length; i++) {
					if (thumbIndex == -1 && c.imageUrls[i].indexOf('thumb') > -1) {
						thumbIndex = i;
					} else if (largeIndex == -1 && c.imageUrls[i].indexOf('large') > -1) {
						largeIndex = i;
					}
					if (thumbIndex != -1 && largeIndex != -1) break;
				}

				if (thumbIndex > -1) {
					thumbImg = <img src={c.imageUrls[thumbIndex]} style={{ height: 125, width: 125 }} />;
				} else if (largeIndex > -1) {
					thumbImg = <img src={c.imageUrls[largeIndex]} style={{ height: 125, width: 125 }} />;
				} else {
					thumbImg = <img src={thumbUrl} />;
				}
			}
			let actionBtn = <a style={{ visibility: 'hidden' }}>hidden</a>;

			index > -1
				? (actionBtn = (
						<a
							className="button small add-to-order show-address red"
							onClick={() => {
								this.removeFromOrder(c);
							}}
						>
							Remove
						</a>
				  ))
				: (actionBtn = (
						<a
							className="button small add-to-order show-address"
							onClick={() => {
								this.addToOrder(c);
							}}
						>
							Add to Order
						</a>
				  ));

			return (
				<div className=" product column-2" key={c.id}>
					<div>{thumbImg}</div>
					{actionBtn}
				</div>
			);
		});

		if (this.props.orderId) {
			return <Redirect to={'/finish'} />;
		}

		return (
			<div>
				<div id="breadcrumb-anchor" />
				<div id="breadcrumb">
					<div className="breadcrumb-inner container">
						<div className="breadcrumb-mobile">
							<a id="mobile-breadcrumb-toggle" className="current">
								<i className="fa fa-chevron-down" /> <span>Troop Information</span>
							</a>
						</div>
						<ul>
							<li>
								<a className="current">Business Information</a>
							</li>
							<li>
								<a style={{ color: '#aaa' }}>Finish</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="main-content">
					<form autoComplete="off" style={{ maxWidth: '100%' }}>
						<div className="container margin-top">
							<h1 className="align-center">Let's sign you up.</h1>
							<p className="subhead align-center">
								<span className="small">
									Payment processing fees will be the cost of interchange and $0.04 for all
									transactions. Clover Go App & Reader is included with this agreement.
								</span>
							</p>

							<br />

							<BusinessInfo
								formErrors={formErrors}
								showLegalDBA={showLegalDBA}
								formatPhone={this.formatPhone}
								populateBICityNState={this.populateBICityNState}
								updateBusinessInfo={this.updateBusinessInfo}
								businessInfo={businessInfo}
								showEIN={showEIN}
								handleDBAChange={this.handleDBAChange}
							/>

							<div className="form-group clearfix margin-top">
								<h2>Tell us about the owner.</h2>
								{OwnerComponents}
								<div className="clearfix">
									<a className="link add-owner" onClick={() => this.addOwner()}>
										<strong>
											<i className="fa fa-plus" /> Add additional owner(s)
										</strong>
									</a>
								</div>
							</div>

							<BankingInfo
								formErrors={formErrors}
								bankingInfo={bankingInfo}
								updateState={this.updateBankingInfo}
							/>

							<div className="form-group clearfix margin-top">
								<h2>Equipment</h2>
								<p className="subhead">Please select your equipment preferences.</p>
								<p className="subhead">Clover hardware is non-refundable.</p>
								<p className="subhead">
									All items shipped, not including the Clover Go App, will include a $10 shipping fee.
								</p>

								<div>{eqProducts}</div>
							</div>

							<div className="form-group clearfix margin-top">
								<BillingInfo
									populateCityNState={this.populateCityNState}
									formErrors={formErrors}
									updateShipping={this.updateShipping}
									updateShippingInfo={this.updateShippingInfo}
									businessInfo={businessInfo}
									shippingInfo={shippingInfo}
								/>
							</div>

							<hr className="clearfix margin-top" />

							<div className="form-group form-actions column-12 align-center">
								<a
									className={`button${this.isSubmitReady() ? '' : ' disabled'}`}
									style={{ margin: '0 auto' }}
									onClick={this.submit}
								>
									{spin ? <i className="fa fa-spinner fa-spin fa-lg fa-fw" /> : 'Continue'}
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ productDetails, orderDetails }) {
	const { orderId } = orderDetails;

	return {
		products: productDetails,
		orderId,
	};
}
export default connect(mapStateToProps)(Signup);
