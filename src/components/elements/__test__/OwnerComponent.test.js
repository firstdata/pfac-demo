import React from 'react';
import OwnerComponent from '../OwnerComponent';

import Enzyme, {shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Signup from "../../../franchise/pages/__test__/Signup.test";


function setup() {
  let state = {
    actionIcon: 'fancy-field-icon fa fa-eye',
    actionType: 'text',
  };

  const props0 = {
    formErrors: {$valid: true,
      owner_zip: {
        $error: false,
        $touched: true
      },
      owner_phone: {$error: false},
    },
    ownerInfo: {
      owner_address_1: "",
      owner_address_2: "",
      owner_city: "",
      owner_dob_day: "",
      owner_dob_month: "",
      owner_dob_year: "",
      owner_email: "",
      owner_name: "",
      owner_percent: "",
      owner_phone: '3234568890',
      owner_ssn: "",
      owner_state: "",
      owner_taxes: "",
      owner_title: "",
      owner_zip: "94043",
    },
    index: 0,
    onDelete: jest.fn(),
    onUpdate: jest.fn()
  }
  const props = Object.assign({}, props0, {

    formErrors: {$valid: true},
    ownerInfo: {
      owner_address_1: "",
      owner_address_2: "",
      owner_city: "",
      owner_dob_day: "",
      owner_dob_month: "",
      owner_dob_year: "",
      owner_email: "",
      owner_name: "",
      owner_percent: "",
      owner_phone: "",
      owner_ssn: "",
      owner_state: "",
      owner_taxes: "",
      owner_title: "",
      owner_zip: "",
    },
    index: 0,
    onDelete: jest.fn(),
    onUpdate: jest.fn()
  })

  const wrapper = shallow(<OwnerComponent {...props0} />);

  return {
    props,
    wrapper
  }
}

describe('OwnerComponent Test Suite', () => {

  Enzyme.configure({ adapter: new Adapter() });

  it('renders correctly', () => {

    const { props, wrapper } = setup();
    expect(wrapper.length).toBe(1);
  });

  it('should call updateOwnerInfo', () => {

    const { props, wrapper } = setup();
    wrapper.instance().updateOwnerInfo('xxxxx', 0, 'owner_city');
  });

  it('should fetchAddressType', () => {
    const address = [
      { short_name: 'shorty',
        types: [ 'right', 'type' ],
      }
    ];
    const { props, wrapper } = setup();
    const name = wrapper.instance().fetchAddressType(address, 'right');
    expect( name ).toBe( address[0].short_name );
  });

  it('should call updateOwnerInfo', () => {

    const props0 = {
      formErrors: {$valid: true,
        owner_zip: {
          $error: false,
          $touched: true
        }
      },
      ownerInfo: {
        owner_title: "",
        owner_zip: "",
      },
      index: 0,
      onDelete: jest.fn(),
      onUpdate: jest.fn()
    };

    const wrap = shallow(<OwnerComponent {...props0} />);
    //global.fetch =  jest.fn();
    let e= {};
    wrap.instance().populateOwnerCityNState(e, 0);
  });

  it('should calls iconClick', () => {
    const { props, wrapper } = setup();
    wrapper.instance().iconClick();

  });

  it('should calls iconClick-password', () => {
    const { props, wrapper } = setup();
    wrapper.setState({actionType: 'password'});

    wrapper.instance().iconClick();
  });

  it('calls formatPhone', () => {
    const { props, wrapper } = setup();
    wrapper.instance().formatPhone(0, 'owner_phone');
  });

  it('calls deleteOwner', () => {
    const { props, wrapper } = setup();
    wrapper.instance().deleteOwner();
  });

  it('calls formatSSN', () => {
    const { props, wrapper } = setup();
    wrapper.instance().formatSSN('12344567', 0);
  });





});