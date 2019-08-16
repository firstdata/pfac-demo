import axios from './my-axios';
import updateOrder from './store/action/order';
import getProducts from './store/action/products'; 
import { store } from './store/index';

export function verifyABARouting(data, successCbk, failureCbk) {
	axios.post('/v1/banks/validate', data).then(
		function(response) {
			successCbk(response.data);
		},
		function(error) {
			failureCbk(error.response.data);
		}
	);
}

export function getProductsList() {
	axios.get('/v1/products/').then(function(response) { 
		store.dispatch(getProducts(response.data));
	});
}

export function pfacSignup(data) {
	axios.post('/v1/pfac/application/signup', data).then(function(response) {
		store.dispatch(updateOrder(response.data));
	});
}
