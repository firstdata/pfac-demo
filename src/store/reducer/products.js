import { GET_PRODUCTS } from '../action/products';

const getProducts = (state = [], action) => {
	switch (action.type) {
		case GET_PRODUCTS:
			return [...state, action.products];
		default:
			return state;
	}
};

export default getProducts;
