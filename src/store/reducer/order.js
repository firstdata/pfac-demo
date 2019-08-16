import { UPDATE_ORDER } from '../action/order';

const orderDetails = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_ORDER:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

export default orderDetails;
