export const GET_PRODUCTS = 'GET_PRODUCTS';

const getProducts = products => {
	return {
		type: GET_PRODUCTS,
		products,
	};
};

export default getProducts;
