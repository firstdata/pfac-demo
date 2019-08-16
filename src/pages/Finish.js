import React, { Component } from 'react';
import { connect } from 'react-redux';

class Finish extends Component {
	constructor() {
		super();

		this.state = {
			redirectURL: '/',
		};
	}

	/**
	 * Render function
	 * @return {XML}
	 */
	render() {
		let { redirectURL } = this.state;

		return (
			<div>
				<div className="main-content">
					<form autoComplete="off" style={{ maxWidth: '100%', minHeight: '500px' }}>
						<div className="container">
							<div className="margin-top">
								<h1>
									<span className="fa-stack" style={{ color: 'green', fontSize: '55%' }}>
										<i className="fa fa-circle-thin fa-stack-2x" />
										<i className="fa fa-check fa-stack-1x" />
									</span>{' '}
									Thank You!
								</h1>
								<h4>Your order id is: {this.props.orderId}</h4>
								<p>
									Thank you for signing up. Your Clover Go CardReader will be shipped in 3 Business
									days.
								</p>
								<br />
								<p>
									<a className="button" href={redirectURL}>
										Go Back to PFAC
									</a>
								</p>
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
	return { orderId };
}

export default connect(mapStateToProps)(Finish);
