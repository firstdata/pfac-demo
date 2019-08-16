import React from 'react';
import {Input as FancyFieldInput} from '../../fancyField/';

import {shallow} from 'enzyme';


function setup() {
  const props0 = {
    placeholder: 'pl',
    isDisabled: 'true',
    labelClassName: 'myclass',
    name: 'myfield',
    nodiv: true,

  }
  const props = Object.assign({}, props0, {

    formErrors: {
      myfield: {
        $error: true,
        $touched: true,
      }
    },
    nodiv: false,
    isDisabled: 'false',
    labelClassName: null,
  })
  const wrapper = shallow(
    <FancyFieldInput {...props0} />
  );

  return {
    props,
    wrapper
  }
}

describe('FancyFieldInput Test Suite', () => {
  it('renders correctly', () => {

    const { props, wrapper } = setup();
    expect(wrapper.length).toBe(1)
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('form-element').length).toBe(0);
    expect(wrapper.hasClass('form-element')).toBe(false);
    expect(wrapper.find('label').hasClass('myclass')).toBe(true);
    expect(wrapper.find('label').hasClass('error')).toBe(false);

  });
  it('nodiv', () => {

    const { props, wrapper } = setup();
    wrapper.setProps(props);
    expect(wrapper.hasClass('form-element')).toBe(true);
  });

  it('form errors', () => {

    const { props, wrapper } = setup();
    wrapper.setProps(props);
    expect(wrapper.find('label').hasClass('error')).toBe(true);

  });

  it('labelClassName', () => {

    const { props, wrapper } = setup();
    wrapper.setProps(props);
    expect(wrapper.find('label').hasClass('myclass')).toBe(false);

  });
});