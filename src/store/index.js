import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import orderDetails from './reducer/order';
import productDetails from './reducer/products';

const rootReducer = combineReducers({ productDetails, orderDetails });

export const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
