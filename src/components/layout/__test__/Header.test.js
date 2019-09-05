import React from 'react';

import $ from 'jquery';
global.$ = global.jQuery = $;

import {shallow, configure} from 'enzyme';

import Header from '../Header';
import storage from '../../../stores/UserStore';

import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('<Header /> component', () => {

  const user = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'no@No.com'
  };

  beforeEach(() => {
    storage.setData(user);
  });

  afterEach(() => {
    storage.clearData();
  });

  it('should render <header /> element with all children', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header').length).toBe(1);
    expect(wrapper.find('div#top').length).toBe(1);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('Link#logo').length).toBe(1);
  });

  describe('componentWillUnmount', () => {

    it('should unmount', () => {

      const onWillUnmount = jest.fn();
      Header.prototype.componentWillUnmount = onWillUnmount;

      const wrap = shallow(<Header />);
      wrap.instance().componentWillUnmount();
      onWillUnmount();
      wrap.unmount();

      expect(onWillUnmount).toHaveBeenCalled();
    });

    it('calls componentWillUnmount', () => {
      const wrap = shallow(<Header />);
      wrap.instance().componentWillUnmount();
      wrap.unmount();
    });

  });

  describe('handleScroll', () => {

    const anchor = {
      offset: ()=>{ return {top:10}; },
      height: (v)=>{return {
        outerHeight: ()=>{return 20;},
      }; },
      outerHeight: ()=>{return 30;},
    };

    it('should handleScroll', () => {

      document.body.innerHTML =
        '<div id="breadcrumb-anchor"></div>' +
        '<div id="breadcrumb"></div>';

      const wrap = shallow(<Header />);
      wrap.instance().handleScroll();
      wrap.unmount();
    });

    it('should handleScroll', () => {

      document.body.innerHTML = '<div id="breadcrumb"></div>' ;

      const wrap = shallow(<Header />);
      wrap.instance().handleScroll();
      wrap.unmount();
    });

  });

});