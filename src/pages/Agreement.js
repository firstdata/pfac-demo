import React, { Component } from 'react';
import ReactHTMLParser from 'react-html-parser';
import { connect } from 'react-redux';
import * as ServiceActions from '../ServiceActions';
import {Redirect} from "react-router";

class Agreement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spin: false,
      redirect: false,
      approveSignature:'',
      confirmSignature:''
    };

    //ServiceActions.getAgreementData( 'WRPqR' );
    this.props.orderId && ServiceActions.getAgreementData( this.props.orderId );
  }

  /**
   * objectToColumn6
   */
  objectToColumn6 = ( obj ) => {
    const keys = Object.keys(obj);
    if( ! keys.length ) {
      return (<div></div>);
    }
    return (
      keys.map( (key,k) => {
        return (
          <div className="mpa-item" key={k}>
            <label className="column-6">{key.replace(/_/g,' ')}</label>
            <span className="column-6">{obj[key]}</span>
          </div>
        )
      })
    );
  }

  /**
   * @param obj
   */
  objectToColumns = ( obj ) => {
    const keys = Object.keys(obj);

    let colOne = [], colTwo = [];
    if( ! keys.length ) {
      return { colOne, colTwo };
    }

    const sectionLength = parseInt((keys.length / 2)) + 1;

    keys.map((key, index) => {
      if (index < sectionLength) {
        colOne.push(<div className="mpa-item" key={key}><label className="column-6">{key}</label> <span
          className="column-6">{obj[key]}</span></div>);
      } else {
        colTwo.push(<div className="mpa-item" key={key}><label className="column-6">{key}</label> <span
          className="column-6">{obj[key]}</span></div>);
      }
    });
    return { colOne, colTwo };
  }

  /**
   * render business info
   */
  businessInfo = (count) => {
    const { agreement } = this.props;

    let bisInfo = {
      'Business Website URL': "ENT.COM",
      'Contact First & Last Name': "First First",
      'DBA/Outlet Name': "NAME",
      'Fed Tax ID #': "XXXXX8989",
      'Foreign Entity/Nonresident Alien': "NO",
      'Legal Business Name': "NAME",
      'Mo/Yr The Business Started': "03-2017",
      'Organization Type': "Sole Proprietorship",
      'Product/service fulfillment': "Direct",
      'State Organized': "CA",
      'TIN Type': "SSN",
      'Tax Filing Name': "Name"
    };

    if( agreement && agreement.Business_Information ) {
      bisInfo = agreement.Business_Information;
    }

    if( !bisInfo ) {
      return (<div></div>);
    }

    const cols = this.objectToColumns( bisInfo );

    return (
      <section className="container terms-section">
        <h2><span className="terms-section-index">{count}.</span> Business Information</h2>
        <div className="row">
          <div className="column-6">{cols.colOne}</div>
          <div className="column-6">{cols.colTwo}</div>
        </div>
      </section>
    );
  }

  /**
   * owner info
   */
  ownerInfo = (count) => {
    const { agreement } = this.props;

    let ownerInfo = [{
      'City': "MOUNTAIN VIEW",
      'D.O.B': "XX-XX-1997",
      'Email': "m@mail.com",
      'Home Address': "150 W Evelyn Ave",
      'Home Phone': "1111111111",
      'Owner/Partner/Officer Name': "First First",
      'Ownership %': "100%",
      'Social Security Number': "XXXXX8989",
      State: "CA",
      Title: "owner",
      ZIP: "94041",
    }];

    if( agreement && agreement.Owner_Information ) {
      ownerInfo = agreement.Owner_Information;
    }

    if( ! ownerInfo ) {
      return (<div></div>);
    }

    return (
      <section className="container terms-section margin-top">
        <h2><span className="terms-section-index">{count}. </span>Owner Information</h2>
          { ownerInfo.map( (owner, index) => {
            let cols = this.objectToColumns( owner );
            return (
              <div className="row" key={index}>
                <div className="clearfix">
                  <div className="column-12 inner-header"><h3>Owner {index + 1}</h3></div>
                  <div className="column-6">{cols.colOne}</div>
                  <div className="column-6">{cols.colTwo}</div>
                </div>
              </div>
            );
          } )}
      </section>
    );
  }

  /**
   * locations
   */
  locations = (count) => {
    let locations = [
      {
        "Location":{
          "DBA/Outlet Name":"DBA NAME",
          "Products/Services you sell":"Eating Places and restaurants"
        },
        "Timeframe_To_Delivery":{},
        "Financial_Data":{
          "TOTAL_ANNUAL_VOLUME":{
            "Average Sale Amount":"$1,000.00",
            "Highest Sale Amount":"$56.00",
            "Credit Card Volume":"$100,000.00"
          },
          "TRANSACTION_TYPE":{
            "Card Present":"100%",
            "Internet":"0%",
            "Mail Order / Direct Marketing / Phone Order":"0%"
          },
          "SWIPED_VS._KEYED":{
            "Swiped":"100%",
            "Keyed":"0%"
          }
        },
        "Transaction_Rates_&_Fees":[
          {
            "name":"Qualified Credit",
            "value":"3.25% + $0.15",
            "subtext":"<p>In addition to the fees described in this Fee Schedule, you must pay us all Payments Organization Charges. \"Payments Organization Charges\" means all fees, charges, liabilities, or obligations that a Payments Organization imposes on us (1) in connection with your acceptance of its payment types, (2) in connection with the transactions processed under your MID, (3) as a result of your acts or omissions, or (4) as a result of the acts or omissions of others that act on your behalf or that provide services to you. Payments Organization Charges are not subject to the consequential damages exclusion in Section 10.2 and include but are not limited to: interchange; assessments (including but not limited to dues, issuer reimbursements, fines, penalties, and fraud recovery losses); fees established by the Payments Organizations (including but not limited to access fees, switch fees, and file fees); adjustments; and Chargebacks. See the American Express OptBlue Guide available at <a class=\"\"link\"\" href=\"\"https://www.businesstrack.com\"\" target=\"\"_blank\"\">https://www.businesstrack.com</a></p>"
          }
        ],
        "Banking_&_Funding_Information":{
          "Bank_Accounts":[
            {
              "ABA_#":"XXXXX0358",
              "DDA_#":"123"
            }
          ],
          "Deduct_Fees":"Daily",
          "Bank_Will_Fund":"Outlet"
        },
        "Equipment_Lease_Term":"See Equipment Lease Agreement for the Terms and Conditions governing your Leased equipment.",
        "Equipment":[
          {
            "term":"P",
            "fullNameTerm":"Purchased",
            "quantity":"1",
            "equipmentType":"VAR",
            "industryType":"RETAIL",
            "modelName":"Network Merchants NMI Gateway (Payment Connection)",
            "unitPrice":"0.00",
            "leaseSum":0,
            "totalCostToLease":0,
            "leaseTerm":null
          }
        ],
        "Product_Details":{
          "Shipping & Handling":"$0.00",
          "Enable EMV":"NO"
        }
      }
    ];
    const { agreement } = this.props;

    if( agreement && agreement.Locations ) {
      locations = agreement.Locations;
    }

    if( ! (locations && locations.length) ) {
      return;
    }

    return (
      <section className="container terms-section margin-top">
        <h2><span className="terms-section-index">{count}. </span>Locations</h2>
        { locations.map( (loc, index) => {
          return (
            <div className="row" key={index}>
              <div className="clearfix">
                <div className="column-12 inner-header" style={{ paddingBottom: 0 }}><h3>Location {index + 1}</h3></div>
                  <div className="column-6">
                  { loc.Location && Object.keys(loc.Location).length ?
                    this.objectToColumn6( loc.Location )
                  : null
                  }
                </div>
              </div>
              <hr/>
              <div className="clearfix">
                <h4 className="column-12" style={{ paddingBottom: 0 }}>Financial Data</h4>
                { loc.Financial_Data && Object.keys(loc.Financial_Data).length ?
                  Object.keys(loc.Financial_Data).map((key) => {
                    return this.objectToTable( key, loc.Financial_Data[key] );
                  })
                : null
                }
              </div>
              <hr/>
              <div className="clearfix column-12">
                <h4>Transaction Rates &amp; Fees</h4>
                { loc['Transaction_Rates_&_Fees'] && loc['Transaction_Rates_&_Fees'].length ?
                  <div>
                    { ReactHTMLParser(loc['Transaction_Rates_&_Fees'][0].subtext || '') }
                    <table className="table fees">
                      <tbody>
                        <tr><th> </th><th className="align-right">Discount Rate + Transaction Fee</th></tr>
                        { loc['Transaction_Rates_&_Fees'].map( (raf,r) => {
                          return (<tr key={r}><td>{raf.name}</td><td className="align-right">{raf.value}</td></tr>)
                        })}
                        </tbody>
                    </table>
                    <p className="small"> {ReactHTMLParser("Interchange Rates are variable and are determined by how your transactions clear. Please see your Interchange Rate Schedule, Interchange Qualification Matrix and American Express OptBlue® Guide for Interchange Rates &amp; Dues/Assessments and qualification criteria as of the date of this Application. The Interchange Rates and Dues/Assessments are subject to change. American Express OptBlue® has Program Pricing which is not Interchange and which is subject to change.")}</p>
                  </div>
                : null
                }
              </div>
              <hr />
              <div className="clearfix column-12">
                <h4>Banking &amp; Funding Information</h4>
                { loc['Banking_&_Funding_Information'] && loc['Banking_&_Funding_Information']['Bank_Accounts'] && loc['Banking_&_Funding_Information']['Bank_Accounts'].length ?
                  loc['Banking_&_Funding_Information']['Bank_Accounts'].map( (bank,k) => {
                    return (
                      <div className="column-6" key={k}>
                        { this.objectToColumn6( bank ) }
                      </div>
                    )
                  })
                : null
                }
                { loc['Banking_&_Funding_Information'] && Object.keys(loc['Banking_&_Funding_Information']).length ?
                  <div className="column-6">
                    { Object.keys(loc['Banking_&_Funding_Information']).map( (key,y) => {
                      if( key !== 'Bank_Accounts' ) {
                        return (
                          <div className="mpa-item" key={y}>
                            <label className="column-6">{key.replace(/_/g,' ')}</label>
                            <span className="column-6">{loc['Banking_&_Funding_Information'][key]}</span>
                          </div>
                        )
                      }
                    })}
                  </div>
                : null
                }
              </div>
              <hr />
              <div className="clearfix column-12">
                <h4>Product Details</h4>
                <p className="small">{ReactHTMLParser(loc.Equipment_Lease_Term || '')}</p>
                <br/>
                { loc.Product_Details && Object.keys(loc.Product_Details).length ?
                  this.objectToColumn6( loc.Product_Details )
                : null
                }
                { loc.Equipment && loc.Equipment.length ?
                  <table className="table">
                    <thead>
                    <tr>
                      <th>Model Code and Name</th>
                      <th>Unit Price w/o Tax and S&amp;H</th>
                      <th>QTY</th>
                      <th>Purchase Type</th>
                      <th>Equipment Type</th>
                      <th>Industry Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    { loc.Equipment.map( (line,l) => {
                      return (
                        <tr className="bold" key={l}>
                          <td>{line.modelName || 'Clover Terminal'}</td>
                          <td>{line.unitPrice || '0.00'}</td>
                          <td>{line.quantity || '1'}</td>
                          <td>{line.fullNameTerm || 'Purchased'}</td>
                          <td>{line.equipmentType || 'VAR'}</td>
                          <td>{line.industryType || 'Retail'}</td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </table>
                : null
                }
              </div>
            </div>
          );
        })}
      </section>
    );
  }

  /**
   * objectToTable
   */
  objectToTable = (title, obj) => {
    return (
      <div className="column-6" key={title}>
        <table className="table fees">
          <tbody>
            <tr><th colSpan="2">{title.replace(/_/g,' ')}</th></tr>
            { Object.keys( obj ).length ?
              Object.keys( obj ).map( (key, index) => {
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td className="align-right bold"><span>{obj[key]}</span></td>
                  </tr>
                );
              })
            : null
            }
          </tbody>
        </table>
      </div>
    );
  }

  /**
   * payments accepted: list of bank names
   */
  paymentsAccepted = (count) => {
    const { agreement } = this.props;

    let list = ["American Express (OptBlue)", "Discover Card (Discover Network Full Processing)", "Mastercard/Visa"];

    if( agreement && agreement.Entitlements ) {
      list = agreement.Entitlements;
    }

    if( ! (list && list.length) ) {
      return;
    }

    return (
      <section className="container terms-section margin-top">
        <h2><span className="terms-section-index">{count}. </span>Payments Accepted</h2>
        <div className="row">
          <div className="clearfix">
            { list.map( (item, index) => {
              return (
                <div className="column-6" key={index}>
                  <div className="mpa-item">
                    <label className="column-6">{item}</label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /**
   * fee schedule
   */
  feeSchedule = (count) => {
    const { agreement } = this.props;

    let fees = {
      Fee_Schedule: {
        'misc':[{name: 'name', value: '$25', subtext:'text'}],
        'fees':[{name: 'name', value: '$55'}]
      },
      Section_Text: "bla bla bla",
    };

    if( agreement && agreement.Fee_Schedule ) {
      fees = agreement.Fee_Schedule;
    }

    let fsch = fees.Fee_Schedule || {};

    return (
      <section className="container terms-section margin-top">
        <h2><span className="terms-section-index">{count}. </span>Fee Schedule</h2>
        <div className="row">
          <div className="mpa-legal-copy">
            <p>{ ReactHTMLParser(fees.Section_Text) }</p>
          </div>
          <div className="clearfix" id="mpa-fees">
            <div className="column-6 no-padding-top">
              <table className="table fees">

              { Object.keys( fsch ).map( (key,index) => {
                return (
                  <tbody key={index}>
                    <tr><th colSpan="2">{key}</th></tr>
                    { fsch[key].map( (item,inx) => {
                      return (
                        <tr key={inx}>
                          <td>{item.name}<p className="small">{item.subtext || ''}</p></td>
                          <td className="align-right bold"><span>{item.value}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                );
              })}

              </table>
            </div>
          </div>

        </div>
      </section>
    );
  }

  /**
   * load components
   */
  components = (count) => {
    const { agreement } = this.props;

    let comps = [
      {
        label: "AGREEMENT_APPROVAL",
        sortOrder: 10,
        title: "Agreement Approval",
        value: "<p><strong>Please read this entire Agreement. It describes the terms on which we will provide merchant processing Services to you. This summary provides answers to commonly asked questions about your Agreement.</strong></p>↵<p><strong>1.  We may debit your bank account</strong> (also referred to as your Settlement Account) for amounts owed to us.</p>↵<p><strong>2.  You are liable for Chargebacks and there are many reasons why a Chargeback may occur.</strong> When they occur we will debit your Settlement Account. See Section 6.7.</p>↵<p><strong>3.  If you wish to dispute any charge or funding,</strong> you must notify us within 60 days of the date of the statement on which the charge or funding appears.</p>↵<p><strong>4. This Agreement limits our liability to you.</strong> See Section 6.9 for further details.</p>↵<p><strong>5. We have assumed certain risks</strong> by agreeing to provide you with the Services. Accordingly, we may take certain actions to mitigate our risk, including termination of this Agreement, and holding monies otherwise payable to you (see Sections 6.14 and 6.15).</p>↵<p><strong>6. By executing this Agreement with us</strong> you authorize us and our Affiliates to obtain and share financial and credit information regarding your business and the signers and guarantors of this Agreement until all your obligations to us and our Affiliates are satisfied.</p>↵<p><strong>7. Arbitration:</strong> This Agreement contains a binding arbitration provision in Section 6.23 that affects your rights under this Agreement with respect to all Services.</p>↵",
        valueType: "AGREEMENT",
      }, {
        label: "GENERAL_TERMS",
        sortOrder: 40,
        title: "General Terms & Conditions",
        value: "<p>Your Agreement with Us</p>",
        valueType: "AGREEMENT",
      }
    ];
    if( agreement && agreement.Components ) {
      comps = agreement.Components;
    }
    let signatures = [
      {
        aboveText: "Merchant Business Principal:",
        name: "First First",
        optional: false,
        ownerId: "RR4oj",
        position: 1,
        readOnly: false,
        title: "owner",
        type: "AGREEMENT_APPROVAL"
      }
    ];
    if( agreement && agreement.Signatures ) {
      signatures = agreement.Signatures;
    }
    let approval = {}, terms = {};
    comps.map( comp => {
      if( comp.label ) {
        if( comp.label === 'AGREEMENT_APPROVAL' ) {
          approval = comp;
          approval.signature = signatures.filter( s => s.type === comp.label );
        } else if( comp.label === 'GENERAL_TERMS') {
          terms = comp;
        }
      }
    });
    return (
      <div>
        { this.componentToSection( approval, count++ ) }
        { this.componentToSection( terms, count++ ) }
      </div>
    );
  }

  /**
   * componentToSection
   */
  componentToSection = (comp, count) => {
    const signature = comp.signature && comp.signature.length ? comp.signature[0] : null;
    return (
      <section className="container terms-section margin-top">
        <h2><span className="terms-section-index">{count}. </span>{comp.title || 'Title'}</h2>
        <div className="row">
          <div className="clearfix mpa-legal-copy">{ ReactHTMLParser(comp.value || '') }</div>
          <div className="column-6">
            { signature ?
              <div id="mpa_signature_1" className="mpa-signature-container">
                <strong>{signature.aboveText}</strong>
                <div className={`signature-box required${this.state.approveSignature.length ? ' signed' : ''}`}>
                  <div className="signature-input-wrapper">
                    <input type="text" maxLength="24"
                           defaultValue={this.state.approveSignature}
                           onChange={e => this.setState({approveSignature:e.target.value})}/>
                  </div>
                  <img src="../../img/sign-here-tab.png" className="sign-here" width="150"/>
                  <span>Please sign by typing your name into the box.</span>
                </div>
                <div className="column-6 clearfix">
                  <strong>{signature.name}</strong> ( <span>{signature.title}</span> )
                </div>
              </div>
              : null
            }
          </div>
        </div>
      </section>
    );
  }

  /**
   * confirmation
   */
  confirmation = (count) => {
    const { agreement } = this.props;

    const confAgreement = "<strong>Please read this entire Agreement. This summary provides answers to commonly asked questions about your Agreement.</strong>";

    let conf = {
      Agreement: confAgreement,
      By_signing_below_you: "<p><strong>(i) confirm that you have received and read this Merchant Processing Agreement which includes the Confirmation Page], [Interchange Rate Schedule]; and</strong></p><strong><p>(ii) agree to all terms in this Agreement in your capacity as a person authorized to sign on behalf of the business set out in the Application.</strong></p><p><strong>(iii) acknowledge that you have executed the Agreement using an electronic signature process and that signature reflects your agreement to be bound to the General Terms and Conditions set forth in the Agreement.</strong></p>",
      Information_about_Bank: "<p>a) Your Bank, who is a Visa and MasterCard Member Bank, is Wells Fargo Bank, N.A. (Bank), PO Box 6079, Concord, CA 94524, (844) 284-6834.</p>↵<p>b) Bank is the entity approved to extend acceptance of Visa and MasterCard products directly to you and will be a party to the sections of this Agreement listed in Section 6.2.2.</p>↵<p>c) Bank works with Processor to provide the Services to you with respect to Visa Cards and to MasterCard Cards.</p>↵<p>d) Bank shall, either directly or through Processor, advise you of pertinent Card Organization Rules with which you must comply.</p>↵<p>e) Bank is responsible for and must provide settlement funds to you and will be responsible for all funds held in a reserve. STAGE</p>↵",
      Your_Responsibilities: "<p>a) You must comply in full at all times with this Agreement (including the Your Payments Acceptance Guide), all Card Organization Rules and all Cardholder and customer data security and storage requirements.</p>↵<p>b) You may view and download the Your Payments Acceptance Guide at",
    };
    if( agreement && agreement.Confirmation && agreement.Confirmation.AGREEMENT ) {
      conf = agreement.Confirmation.AGREEMENT;
    }
    let signatures = [
      {
        aboveText: "Business Principal Signature:",
        name: "First First",
        optional: false,
        ownerId: "RR4oj",
        position: 1,
        readOnly: false,
        title: "owner",
        type: "CONFIRMATION",
      }
    ];
    if( agreement && agreement.Signatures ) {
      signatures = agreement.Signatures;
    }
    let signature = signatures.filter( s => s.type === 'CONFIRMATION');
    if( signature && signature.length ) {
      signature = signature[0];
    }

    return (
      <section className="container terms-section margin-top">
        <h2><span className="terms-section-index">{count}. </span>Confirmation</h2>
        <div className="row">
          <div className="clearfix mpa-legal-copy">
            { ReactHTMLParser(conf.Agreement || confAgreement) }
            { Object.keys( conf ).map( (key,index) => {
              if( key !== 'Agreement' ) {
                return (
                  <div className="clearfix column-12" key={index}>
                    <p><strong>{key.replace(/_/g,' ')}</strong></p>
                    <div>{ ReactHTMLParser( conf[key] ) }</div>
                  </div>
                );
              }
            })}
          </div>
          <div className="column-6">
            { signature ?
              <div id="mpa_signature_2" className="mpa-signature-container">
                <strong>{signature.aboveText}</strong>
                <div className={`signature-box required${this.state.confirmSignature.length ? ' signed' : ''}`}>
                  <div className="signature-input-wrapper">
                    <input type="text" maxLength="24"
                           defaultValue={this.state.confirmSignature}
                           onChange={ e => this.setState( {confirmSignature: e.target.value}) } />
                  </div>
                  <img src="../../img/sign-here-tab.png" className="sign-here" width="150"/>
                  <span>Please sign by typing your name into the box.</span>
                </div>
                <div className="column-6 clearfix">
                  <strong>{signature.name}</strong> ( <span>{signature.title}</span> )
                </div>
              </div>
              : null
            }
          </div>
        </div>
      </section>
    );
  }

  /**
   * submit: just redirect
   * submit: call on /v2/application/submit API
   */
  submit = () => {
    if( ! this.isSubmitReady() ) {
      return;
    }
    this.setState({redirect:"/finish"} );
    return;

    const { approveSignature } = this.state;

    let data = {
      "contractAuditTrailRequestModel": {
        "acceptedAgreementDate": "2019-10-08T22:23:09.225Z",
        "geoLocation": "37.5393993,-121.9753584",
        "ipAddress": "73.170.43.145",
        "merchantEmail": "santhosh.rao.m@gmail.com",
        "merchantName": "Jon Consumer",
        "signDate": "2019-10-08T22:23:09.225Z"
      },
      "isRemoteSignSent": false,
      "orderId": "jpBpn",
      "signatures": [
        {
          deviceInformation: "one",
          "name": "AGREEMENT_APPROVAL_1",
          "ownerId": this.props.orderI,
          "signature": approveSignature // "NA" // convert signature to base64
        },
      ]
    };

    ServiceActions.submit( data );
    this.setState( {spin: true} );
  }

  /**
   * isSubmitReady: returns true when both signatures are given
   */
  isSubmitReady = () => {
    const { approveSignature, confirmSignature } = this.state;

    if( approveSignature.length && confirmSignature.length ) {
      return true;
    }
    return false;
  }


  /**
   * Render function
   * @return {XML}
   */
  render() {
    const { spin, redirect } = this.state;

    //if( Object.keys( this.props.submit ).length ) {
    if( redirect ) {
      return <Redirect to={redirect} />;
    }
    let count = 1;

    return (
      <div>
        <div id="breadcrumb-anchor"></div>
        <div id="breadcrumb">
          <div className="breadcrumb-inner container">
            <ul>
              <li><a className="link" href="/">Business Information</a></li>
              <li><a className="current">Merchant Agreement</a></li>
              <li><a style={{color:'#aaa'}}>Finish</a></li>
            </ul>
          </div>
        </div>

        {/*this.props.agreement ?*/
          <div className="main-content">
            <div className="container margin-top clearfix align-center">
              <h1>Merchant Processing Agreement</h1>
              <p className="subhead">Please review the information below.</p>
              <hr className="margin-bottom margin-top"/>

              {/* add sections */}
              { this.businessInfo(count++) }
              { this.ownerInfo(count++) }
              { this.locations(count++) }
              { this.paymentsAccepted(count++) }
              { this.feeSchedule(count++) }
              { this.components(count++) }
              { this.confirmation(count+1) }

              {/* Submit */}
              <div className="margin-top">
                <div className="form-group form-actions column-12 align-center">
                  <a className={`button${this.isSubmitReady() ? '' : ' disabled'}`} style={{margin: '0 auto'}} onClick={this.submit}>
                    {spin ? <i className="fa fa-spinner fa-spin fa-lg fa-fw"/> : 'Submit'}
                  </a>
                </div>

              </div>
            </div>
          </div>
        }
      </div>
    );
  }

}

function mapStateToProps({ orderDetails, agreementDetails, pfacSubmit }) {
  const { orderId } = orderDetails;
  return {
    orderId,
    agreement: agreementDetails,
    submit: pfacSubmit
  };
}

export default connect(mapStateToProps)(Agreement);
