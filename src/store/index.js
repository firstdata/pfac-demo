import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import orderDetails from './reducer/order';
import productDetails from './reducer/products';
import agreementDetails from './reducer/agreement';
import pfacSubmit from './reducer/submit';

const rootReducer = combineReducers({ productDetails, orderDetails, agreementDetails, pfacSubmit });

export const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
