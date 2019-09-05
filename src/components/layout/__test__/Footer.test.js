import React from 'react';
import {shallow, configure} from 'enzyme';
import Footer from '../Footer';

import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('<Footer /> component', () => {

  it('should render <footer /> element', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('footer').length).toBe(1);
    expect(wrapper.find('div').length).toBe(5);
    const link = wrapper.find('a');
    expect(link.length).toBe(9);
  });

});