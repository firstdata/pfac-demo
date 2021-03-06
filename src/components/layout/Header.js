import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

/**
 * Header layout
 */

export default class Header extends React.Component {

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

    let window_top = $(window).scrollTop();
    let anchor = $('#breadcrumb-anchor');
    if (!anchor.length) {
      return;
    }
    let div_top = anchor.offset().top;
    if (window_top > div_top) {
      $('#breadcrumb').addClass('stick');
      anchor.height($('#breadcrumb').outerHeight());
    } else {
      $('#breadcrumb').removeClass('stick');
      anchor.height(0);
    }

  }

  /**
   * render function
   * @return {XML}
   */
  render() {

    return (
      <header>
        <div id="top">
          <nav className="container">
            <Link id="logo" to="/"><img src={require('../../img/Firstdata.png')} height="51px"/></Link>
          </nav>
        </div>
      </header>
    );
  }
}
