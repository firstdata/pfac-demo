import React from 'react';

/**
 * Generic error page
 * @constructor
 */
const ErrorPage = () => (
	<div className="main-content">
		<form autoComplete="off" style={{ maxWidth: '100%', minHeight: '500px' }}>
			<div className="container">
				<div className="container margin-top">
					<h1 className="align-center">Something went wrong.</h1>
					<p className="align-center subhead">
						Sorry, we can't process your request at the moment. We apologize for the inconvenience.
					</p>
					<p className="align-center">
						Please try again later or reach out to your Business Consultant if the issue continues.
					</p>
				</div>
			</div>
		</form>
	</div>
);

export default ErrorPage;
