import React from 'react';
import FancyField from '../../fancyField/parent';
import {shallow, mount, configure} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
// import sinon from 'sinon';

describe('FancyField Test Suite', () => {
  const props = {
    inputChanged: (v) => {},
    onBlur: () => {},
    onFocus: () => {},
    onChange: () => {},
    onKeyUp: () => {},
    defaultValue: '1',
    placeholder: 'name',
    name: 'name',
    rules: [],
    formErrors: {},
  };

  it('renders correctly', () => {

    const wrapper = mount(<FancyField {...props} />);
    expect(wrapper.state('inputHasvalue')).toBe(' hasvalue');
    expect(wrapper.state('labelActive')).toBe(' active');

    const input = wrapper.find('input');

    expect(input.length).toBe(1);

    wrapper.unmount();
  });

  it('onFocus and onBlur', () => {
    spyOn(props, 'inputChanged');

    const wrapper = mount(<FancyField {...props} />);

    expect(wrapper.state('labelFocused')).toBe('');
    const input = wrapper.find('input');

    input.simulate('focus');
    expect(wrapper.state('labelFocused')).toBe(' focused');

    input.simulate('blur');
    expect(wrapper.state('labelFocused')).toBe('');

    expect(props.inputChanged).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('onFocus local', () => {

    spyOn(props, 'onFocus');

    const wrapper = mount(<FancyField {...props} />);
    const input = wrapper.find('input');

    input.simulate('focus');

    expect(props.onFocus).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('onBlur local', () => {

    spyOn(props, 'onBlur');

    const wrapper = mount(<FancyField {...props} />);
    const input = wrapper.find('input');

    input.simulate('blur');
    expect(props.onBlur).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('onChange local', () => {


    spyOn(props, 'onChange');

    const wrapper = mount(<FancyField {...props} />);
    const input = wrapper.find('input');

    input.simulate('change');
    expect(props.onChange).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('onChange', () => {
    const wrapper = mount(<FancyField {...props} />);

    spyOn(wrapper.instance(), 'validate');
    const input = wrapper.find('input');

    let event = {
      target: {
        value: 'some value'
      }
    };

    input.simulate('change', event);
    expect(wrapper.instance().validate).toHaveBeenCalled();
    expect(wrapper.state('inputHasvalue')).toBe(' hasvalue');
    expect(wrapper.state('labelActive')).toBe(' active');

    event = {
      target: {
        value: ''
      }
    };

    input.simulate('change', event);
    expect(wrapper.state('inputHasvalue')).toBe('');
    expect(wrapper.state('labelActive')).toBe('');


    wrapper.unmount();
  });

  it('onKeyUp', () => {

    spyOn(props, 'onKeyUp');

    const wrapper = mount(<FancyField {...props} />);

    expect(props.formErrors[props.name].$touched).toBe(false);
    const input = wrapper.find('input');

    input.simulate('keyup');
    expect(props.onKeyUp).toHaveBeenCalled();
    expect(props.formErrors[props.name].$touched).toBe(true);

    wrapper.unmount();
  });


});

describe('FancyField validation', () => {
  const props = {
    inputChanged: (v) => {},
    onBlur: () => {},
    onFocus: () => {},
    onChange: () => {},
    onKeyUp: () => {},
    defaultValue: '1',
    placeholder: 'name',
    name: 'name',
    rules: [],
    formErrors: {},
  };

  it('required', () => {

    const lProps = Object.assign({}, props);
    lProps.rules = ['required'];

    const wrapper = mount(<FancyField {...lProps} />);
    const input = wrapper.find('input');

    let event = {
      target: {
        value: ''
      }
    };

    input.simulate('change', event);

    expect(wrapper.prop('formErrors').name.$error).toBe(true);
    expect(wrapper.prop('formErrors').name.required).toBe(true);
    expect(wrapper.prop('formErrors').$valid).toBe(false);

    event.target.value = 'Some value';

    input.simulate('change', event);

    expect(wrapper.prop('formErrors').name.$error).toBe(false);
    expect(wrapper.prop('formErrors').$valid).toBe(true);
    expect(wrapper.prop('formErrors').name.required).toBeUndefined();


  });

  it('email and required', () => {

    const lProps = Object.assign({}, props);
    lProps.rules = ['email', 'required'];

    const wrapper = mount(<FancyField {...lProps} />);
    const input = wrapper.find('input');

    let event = {
      target: {
        value: ''
      }
    };

    input.simulate('change', event);
    expect(wrapper.prop('formErrors').name.$error).toBe(true);
    expect(wrapper.prop('formErrors').name.email).toBe(true);
    expect(wrapper.prop('formErrors').name.required).toBe(true);
    expect(wrapper.prop('formErrors').$valid).toBe(false);

    event.target.value = 'Some value';
    input.simulate('change', event);

    expect(wrapper.prop('formErrors').name.$error).toBe(true);
    expect(wrapper.prop('formErrors').name.email).toBe(true);
    expect(wrapper.prop('formErrors').$valid).toBe(false);
    expect(wrapper.prop('formErrors').name.required).toBeUndefined();

    event.target.value = 'no@no.com';

    input.simulate('change', event);
    expect(wrapper.prop('formErrors').name.$error).toBe(false);
    expect(wrapper.prop('formErrors').$valid).toBe(true);
    expect(wrapper.prop('formErrors').name.required).toBeUndefined();
    expect(wrapper.prop('formErrors').name.email).toBeUndefined();

  });

  it('numeric', () => {

    const lProps = Object.assign({}, props);
    lProps.rules = ['numeric'];

    const wrapper = mount(<FancyField {...lProps} />);
    const input = wrapper.find('input');

    let event = {
      target: {
        value: ''
      }
    };

    input.simulate('change', event);
    expect(wrapper.prop('formErrors').name.$error).toBe(true);
    expect(wrapper.prop('formErrors').name.numeric).toBe(true);
    expect(wrapper.prop('formErrors').$valid).toBe(false);

    event.target.value = 'Some value';
    input.simulate('change', event);

    expect(wrapper.prop('formErrors').name.$error).toBe(true);
    expect(wrapper.prop('formErrors').name.numeric).toBe(true);
    expect(wrapper.prop('formErrors').$valid).toBe(false);

    event.target.value = '1234566';

    input.simulate('change', event);
    expect(wrapper.prop('formErrors').name.$error).toBe(false);
    expect(wrapper.prop('formErrors').$valid).toBe(true);
    expect(wrapper.prop('formErrors').name.numeric).toBeUndefined();

  });


  it('alphanumeric', () => {

    const lProps = Object.assign({}, props);
    lProps.rules = ['alphanumeric'];

    const wrapper = mount(<FancyField {...lProps} />);
    const input = wrapper.find('input');

    let event = {
      target: {
        value: ''
      }
    };

    input.simulate('change', event);
    expect(wrapper.prop('formErrors').name.$error).toBe(true);
    expect(wrapper.prop('formErrors').name.alphanumeric).toBe(true);
    expect(wrapper.prop('formErrors').$valid).toBe(false);

    event.target.value = 'Some value';
    input.simulate('change', event);

    expect(wrapper.prop('formErrors').name.$error).toBe(true);
    expect(wrapper.prop('formErrors').name.alphanumeric).toBe(true);
    expect(wrapper.prop('formErrors').$valid).toBe(false);

    event.target.value = 'Some & value';
    input.simulate('change', event);

    expect(wrapper.prop('formErrors').name.$error).toBe(true);
    expect(wrapper.prop('formErrors').name.alphanumeric).toBe(true);
    expect(wrapper.prop('formErrors').$valid).toBe(false);

    event.target.value = 'Some232323value';
    input.simulate('change', event);

    expect(wrapper.prop('formErrors').name.$error).toBe(false);
    expect(wrapper.prop('formErrors').name.alphanumeric).toBeUndefined();
    expect(wrapper.prop('formErrors').$valid).toBe(true);

    event.target.value = '1234566';

    input.simulate('change', event);
    expect(wrapper.prop('formErrors').name.$error).toBe(false);
    expect(wrapper.prop('formErrors').$valid).toBe(true);
    expect(wrapper.prop('formErrors').name.alphanumeric).toBeUndefined();

  });

  describe('componentWillReceiveProps', () => {
    it('should receive props', () => {
      const wrap = shallow(<FancyField {...props} />);
      props.formErrors = { name: false };
      wrap.instance().componentWillReceiveProps( props );
      wrap.unmount();
    });
  });

  describe('onBlur', () => {
    let props = {
      inputChanged: jest.fn(),
      mask: true
    };
    let event = {
      target: {
        value: '999'
      }
    };
    it('should process currency values', () => {
      const wrap = shallow(<FancyField {...props} />);
      expect(wrap.state('defaultValue')).toBe( '' );
      wrap.instance().onBlur( event );
      expect(wrap.state('defaultValue')).toBe( '$999.00' );
      expect(props.inputChanged).toHaveBeenCalled();
      wrap.unmount();
    });
  });

  describe('onKeyDown', () => {
    let props = {
      onKeyDown: jest.fn(),
      name: 'name',
    };
    it('should call onKeyDown', () => {
      const wrap = shallow(<FancyField {...props} />);
      props.formErrors = { name: true };
      wrap.instance().onKeyDown( {} );
      expect(props.onKeyDown).toHaveBeenCalled();
      wrap.unmount();
    });
  });

  it('should getValue', () => {
    const wrap = shallow(<FancyField {...props} />);
    expect(wrap.instance().getValue()).toBe( props.defaultValue );
    wrap.unmount();
  });

  describe('validate', () => {
    let props = {
      formErrors: {},
      name: 'name',
      rules: ['float','currency','isAfter','isBefore','min','max','isHexColor','matches'],
    };
    it('should validate a float', () => {
      const wrap = shallow(<FancyField {...props} />);
      wrap.instance().validate('123.567');
      wrap.unmount();
    });
  });

});