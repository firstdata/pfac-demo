export const UPDATE_ORDER = 'UPDATE_ORDER';

const updateOrder = payload => {
	return {
		type: UPDATE_ORDER,
		payload,
	};
};

export default updateOrder;
