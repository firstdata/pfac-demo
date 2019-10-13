import React, { Component } from 'react';
import { connect } from 'react-redux';

class Finish extends Component {
	constructor(props) {
		super(props);
	}

	/**
	 * Render function
	 * @return {XML}
	 */
	render() {

		return (
			<div>
				<div id="breadcrumb-anchor"></div>
				<div id="breadcrumb">
				<div className="breadcrumb-inner container">
					<ul>
						<li><a className="link" href="/">Business Information</a></li>
						<li><a style={{color:'#aaa'}}>Merchant Agreement</a></li>
						<li><a className="current">Finish</a></li>
					</ul>
				</div>
				</div>
				<div className="main-content">
					<form autoComplete="off" style={{ maxWidth: '100%', minHeight: '500px' }}>
						<div className="container">
							<div className="margin-top">
								<h1>
									<span className="fa-stack" style={{ color: 'green', fontSize: '55%' }}>
										<i className="fa fa-circle-thin fa-stack-2x" />
										<i className="fa fa-check fa-stack-1x" />
									</span> Thank You!
								</h1>
								<br/>
								<h4>Your order ID is: <strong>{this.props.orderId || 'jpBpn'}</strong></h4>
								<p className="subhead">Thank you for signing up. Your Clover Go CardReader will be shipped in 3 Business days.</p>
								<br/>
								<p><a className="button" href="/"> Go Back to PFAC </a></p>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ orderDetails }) {
	const { orderId } = orderDetails;
	return {
		orderId
	};
}

export default connect(mapStateToProps)(Finish);