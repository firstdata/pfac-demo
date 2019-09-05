import axios from './my-axios';
import updateOrder from './store/action/order';
import getProducts from './store/action/products'; 
import { store } from './store/index';

export function verifyABARouting(data, successCbk, failureCbk) {
	axios.post('/marketplace/v1/banks/validate', data).then(
		function(response) {
			successCbk(response.data);
		},
		function(error) {
			failureCbk(error.response.data);
		}
	);
}

export function getProductsList() {
	axios.get('/marketplace/v1/products').then(function(response) {  
		let products = response.data;
		products.forEach((prod) => {
			if(prod.productType === 'Terminal') {
				store.dispatch(getProducts(prod));
			}
		});
	});
}

export function pfacSignup(data) {
	axios.post('/marketplace/v1/pfac/application/signup', data).then(function(response) {
		store.dispatch(updateOrder(response.data));
	});
}
