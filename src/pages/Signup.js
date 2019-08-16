import React, { Component } from 'react';
import { Input, Select, Autocomplete } from '../components/elements/fancyField';
import { Redirect } from 'react-router-dom';
import OwnerComponent from '../components/elements/OwnerComponent';
import BankingInfo from '../components/elements/BankingInfo';
import { states, years, months, organizations, sales } from '../const';
import Geocode from 'react-geocode';
import { platform_prefix } from '../const';
import BillingInfo from '../components/elements/BillingInfo';
import BusinessInfo from '../components/elements/BusinessInfo';
import * as ServiceActions from '../ServiceActions';
import { connect } from 'react-redux';

class Signup extends Component {
	constructor(props) {
		super(props);

		let yearsOptions = years.map(y => {
			return { defaultValue: y.abbr, label: y.name };
		});
		let monthsOptions = months.map(m => {
			return { defaultValue: m.abbr, label: m.name };
		});
		let stateOptions = states.map(s => {
			return { defaultValue: s.abbr, label: s.name };
		});
		let organizationsOptions = organizations.map(o => {
			return { defaultValue: o.abbr, label: o.name };
		});
		let salesOptions = sales.map(s => {
			return { defaultValue: s.abbr, label: s.name };
		});

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
				orgtype: 'SOLE_PROPRIETORSHIP',

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
			yearsOptions: yearsOptions,
			bankingInfo: {},
			stateOptions: stateOptions,
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
		};

		Geocode.setApiKey('AIzaSyBG-Xskhm-9KiwwajAKuLJPj7_b6dl4YBg');

		ServiceActions.getProductsList();	
	}

	getCart = () => {
			let products = this.props.products.filter(p => p.productType !== 'GFT');

			if (products.length === 1) {
				let cartDetails = [], isReaderProduct = false;
				let qty = 1;
				const readerType = 'FirstDataPOS';

				products.forEach(p => {
					let orderedProd = {
						productId: p.productId,
						price: 0,
						qty: qty,
						term: p.defaultPurchaseType,
						productType: p.productType,
					};
					if (cartDetails.length === 0) {
						cartDetails.push(orderedProd);
					} else {
						cartDetails[0] = orderedProd;
					}
					isReaderProduct = p.offeringTypes.find(type => type === readerType) !== undefined ? true : false;
				});
				return {
					cartDetails,
					isReaderProduct
				};
			}
			return {
				cartDetails: [],
				isReaderProduct: false,
			};
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
			owner_title: 'owner',
			owner_phone: '',
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
		const { formErrors , spin, routingError } = this.state;

		if (!formErrors.$valid) {
			return false;
		}

		const { cartDetails } = this.getCart()
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
	 * Update businessInfo from BusinessInfo component
	 */

	updateBusinessInfo = (key, val) => {
		let { businessInfo } = this.state;

		businessInfo[key] = val;

		if (key == 'legalIsDBA') {
			this.setState({ businessInfo: businessInfo, showLegalDBA: val === 'n' });
		} else if (key == 'files_taxes') {
			this.setState({ businessInfo: businessInfo, showEIN: (val === 'ein') });
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
			(shippingInfo.businessAddress2 && shippingInfo.businessAddress2.length > 2)
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
				state: shippingInfo.business_state,
				postalCode: shippingInfo.business_zip,
				address1: billing_address,
				phone: this.trimPhone(businessInfo.business_phone),
				country: 'USA',
				city: shippingInfo.business_city,
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

		merchantInfo.timeframeforDelivery = timeframeforDelivery;
		merchantInfo.percentOfAnnualCardVolume = percentOfAnnualCardVolume;
		merchantInfo.percentageOfTotalAnnualVolume = percentageOfTotalAnnualVolume;
		merchantInfo.highestTicket = 56;
		merchantInfo.faceToFace = '100';
		merchantInfo.percentTransactionsOverPhoneorEmail = '0';
		merchantInfo.percentTransactionsOverInternet = '0';
		merchantInfo.stateOfIncorporation = businessInfo.incorp_state;
		merchantInfo.taxFilingName = businessInfo.dbaName;
		merchantInfo.istheBusinessaForeignEntity = 'N';
		merchantInfo.tinRequestedGuid = '17487900F244257DA';
		merchantInfo.dbaName = businessInfo.dbaName;
		merchantInfo.legalName = showLegalDBA ? businessInfo.legal_business_name : businessInfo.dbaName;
		merchantInfo.organizationType = businessInfo.orgtype;
		merchantInfo.employeeIdentificationNumber = ownerInfo.owner_ssn;
		merchantInfo.yearsInBusiness = businessInfo.business_year + '-' + businessInfo.business_month + '-' + '01'; //'1919-07-01';
		merchantInfo.yearsAtLocation = businessInfo.business_year + '-' + businessInfo.business_month + '-' + '01'; //'1919-07-01';
		merchantInfo.obtained = 'Y';
		merchantInfo.endDate = '2027-03-01';
		merchantInfo.agentEmail = 'test_merchant@gyft.com';
		merchantInfo.totalRevenue = '2000';
		merchantInfo.netIncome = '1000';
		merchantInfo.totalAssets = '2500';
		merchantInfo.totalLiabilities = '1500';
		merchantInfo.tangibleNetWorth = '2400';
		merchantInfo.workingCapital = '2300';
		merchantInfo.currentRation = '1.2';
		merchantInfo.debtToTNWRatio = '0.5';
		merchantInfo.country = 'USA';
		merchantInfo.salesCurrency = [{ currency: 'USD' }];
		merchantInfo.pricingType = '01';
		merchantInfo.payeezyIndicator = 'N';
		merchantInfo.visa = 'Y';
		merchantInfo.mc = 'N';
		merchantInfo.fundingCurrency = [{ currency: 'USD' }];
		merchantInfo.contractSignDate = '2018-01-01';
		merchantInfo.legalContactName = 'test name';
		merchantInfo.irsSparkExclusion = 'N';
		merchantInfo.yearIncorporated = businessInfo.business_year + '-' + businessInfo.business_month + '-' + '01'; //'1919-07-01';

		merchantLocationInformation.push(merchantInfo);
		data.merchantLocationInformation = merchantLocationInformation;
	};

	/**
	 * add Owner Info
	 */

	addOwnerInfo = data => {
		let owInfo = [];
		let { ownerInfo } = this.state;

		ownerInfo.forEach(oi => {
			let formatted_oi = {};
			let firstName = this.getFirstName(oi.owner_name);
			let lastName = this.getLastName(oi.owner_name);
			let address =
				oi.owner_address_2.length > 2 ? oi.owner_address_1 + ', ' + oi.owner_address_2 : oi.owner_address_1;

			formatted_oi.firstName = firstName;
			formatted_oi.lastName = lastName;
			formatted_oi.dateofBirth = oi.owner_dob_year + '-' + oi.owner_dob_month + '-' + oi.owner_dob_day;
			formatted_oi.nationalId = oi.owner_ssn.replace(/-/g, '');
			formatted_oi.title = oi.owner_title;
			formatted_oi.percentageOwnership = oi.owner_percent;
			formatted_oi.isPrimary = ownerInfo.length == 1 ? 'Y' : 'N';
			formatted_oi.gender = 'M';
			formatted_oi.taxId = oi.owner_ssn.replace(/-/g, '');

			owInfo.push(formatted_oi);
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

		const { cardReaderQty, bankingInfo /*, cartDetails*/, shippingInfo, isReaderProduct } = this.state;

		let data = {};

		const { cartDetails } = this.getCart()
		if (cartDetails.length > 0) { 
			if (isReaderProduct) {
				cartDetails[0].qty = cardReaderQty;
			}
			data.cartDetails = cartDetails;
			data.numberOfOutlets = cartDetails.length;
		}

		this.defaultMerchantCreditInfo(data);
		this.defaultSiteSurvey(data);
		this.addMerchantTransactionInformation(data);
		this.addMerchantContactInformation(data);
		this.addMerchantLocationInformation(data);
		this.addOwnerInfo(data);
		this.addBankInformation(data);

		ServiceActions.pfacSignup(data);
	};

	/**
	 * render method for rendering the items in the UI
	 */
	render() {
		let {
			formErrors,
			businessInfo,
			redirect,
			actionType,
			actionIcon,
			yearsOptions,
			monthsOptions,
			stateOptions,
			organizationsOptions,
			salesOptions,
			ownerInfo,
			bankingInfo,
			routingError,
			routingInfo,			
			cardReaderQty,			
			isShippingChecked,
			shippingInfo,
			spin,
			showEIN,
			showLegalDBA,
		} = this.state;

		const {cartDetails, isReaderProduct} = this.getCart();

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

			let thumbUrl = '//cdn.firstdata.com/global/img/default-placeholder.png';
			if (c.imageUrls !== undefined && c.imageUrls !== null && c.imageUrls.length > 0) {
				thumbUrl = c.imageUrls.length > 1 ? c.imageUrls[1] : c.imageUrls[0];
			}
			let actionBtn = <a style={{ visibility: 'hidden' }}>hidden</a>;

			return (
				<div className="column-12 include-detail" key={c.id}>
					<div className="column-3">
						<img src={thumbUrl} />
						<br />
						{actionBtn}
					</div>
					<div className="column-9">
						<h2>{c.productName ? c.productName : ''}</h2>
						<p>{c.productShortDescription ? c.productShortDescription : ''}</p>
						<br />
						<br />
						{index > -1 && isReader ? (
							<div id="reader-quantity" style={{ marginTop: '10px' }}>
								<Input
									name="cardReaderQty"
									id="cardReaderQty"
									type="text"
									placeholder="Card Reader Quantity"
									rules={['required', 'numeric', ['isLength', { min: 1, max: 3 }]]}
									formErrors={formErrors}
									defaultValue={cardReaderQty}
									inputChanged={v => {
										this.setState({ cardReaderQty: v });
									}}
									required
									autoComplete="nope"
									errorMessages={{
										numeric: 'Only numeric values allowed',
										required: 'The field is required',
										isLength: 'Card Reader Quantity can not exceed 1000',
									}}
								/>
							</div>
						) : (
							''
						)}
					</div>
				</div>
			);
		});

		if (this.props.orderId) {
			return <Redirect to={'/finish'} />;
		}

		return (
			<div className="main-content">
				<form autoComplete="off" style={{ maxWidth: '100%' }}>
					<div className="container margin-top">
						<h1 className="align-center">Let's sign you up.</h1>
						<p className="subhead align-center">
							<span className="small">
								Payment processing fees will be the cost of interchange and $0.04 for all transactions.
								Clover Go App & Reader is included with this agreement.
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
							<p className="subhead">Quantity 1 Clover Go has been selected</p>
							<div>{eqProducts}</div>
							{isReaderProduct ? (
								<BillingInfo
									populateCityNState={this.populateCityNState}
									formErrors={formErrors}
									updateShipping={this.updateShipping}
									updateShippingInfo={this.updateShippingInfo}
									businessInfo={businessInfo}
									shippingInfo={shippingInfo}
								/>
							) : null}
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
		);
	}
}

function mapStateToProps({ getProducts, orderDetails }) {
	const { orderId } = orderDetails;
	return {
		products: getProducts,
		orderId
	}
	
}
export default connect(mapStateToProps)(Signup);
