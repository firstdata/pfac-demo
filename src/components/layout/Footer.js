import React from 'react';

/**
 * footer layout
 */
export default class Footer extends React.Component {
  /**
   * render function
   * @return {XML}
   */
  render() {

    const curYear = new Date().getFullYear();

    return (

      <footer>
        <div className="footer-top">
          <div className="container clearfix">
            <ul className="footer-menu">
              <li><a href="https://www.firstdata.com/en_us/contact.html">Contact</a></li>
              <li><a href="https://www.firstdata.com/en_us/about-first-data/careers-home.html">Careers</a></li>
              <li><a href="https://www.firstdata.com/en_us/privacy.html">Privacy &amp; Legal</a></li>
              <li><a href="https://www.firstdata.com/en_us/site-map.html">Site Map</a></li>
              <li><a href="https://www.firstdata.com/global-selector.html">United States/Change</a></li>
            </ul>
            <div className="footer-social">
              Follow First Data:
              <a href="http://www.facebook.com/FirstData" style={{background:'rgb(59, 89, 152)'}}><i className="fa fa-facebook" aria-hidden="true"></i></a>
              <a href="http://twitter.com/intent/follow?source=followbutton&variant=1.0&screen_name=FirstData" style={{background:'rgb(29, 161, 242)'}}><i className="fa fa-twitter" aria-hidden="true"></i></a>
              <a href="http://www.linkedin.com/company/first-data-corporation" style={{background:'rgb(0, 119, 18)'}}><i className="fa fa-linkedin" aria-hidden="true"></i></a>
              <a href="http://www.youtube.com/user/firstdata?sub_confirmation=1" style={{background:'rgb(205, 32, 31)'}}><i className="fa fa-youtube-play" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom container">
          <div className="copyright">
            <p>©2009–{curYear}&nbsp;First Data Corporation. All rights reserved.</p>
            <p>Apple, the Apple logo, and iPhone are trademarks of Apple Inc., registered in the U.S. and other
              countries. Apple Pay and Touch ID are trademarks of Apple Inc. Android™ is a trademark of Google, Inc.
              EMV® is a registered mark owned by EMVCo LLC. www.emvco.com</p>
          </div>
        </div>

      </footer>
    );
  }
}
