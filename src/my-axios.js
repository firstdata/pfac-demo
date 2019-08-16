import MyAxios from 'axios';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

MyAxios.defaults.validateStatus = status => {
	const statusOkStart = 200;
	const statusErrorStart = 300;

	const statusNotFound = 404;
	const statusAccessDenied = 403;

	if (status === statusNotFound) {
		history.push('/404');
		window.location.reload();
		return false;
	}
	if (status === statusAccessDenied) {
		history.push('/403');
		window.location.reload();
		return false;
	}
	return status >= statusOkStart && status < statusErrorStart;
};

export default MyAxios;
