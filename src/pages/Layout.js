import React from 'react';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

/**
 * Layout page
 */
export default class Layout extends React.Component {

  /**
   * constructor
   */
  constructor() {
    super();

    this.scrolled = false;
  }


  /**
   * componentDidMount method
   */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  /**
   * componentWillUnmount method
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * handle sticky breadcrumbs
   */
  handleScroll() {
    this.scrolled = true;

  }

  /**
   * render function
   * @return {XML}
   */
  render() {
    return (
      <div id='full_body'>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
