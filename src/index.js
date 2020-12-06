import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
//Reducers
import burgerReducer from './store/reducers/burgerReducer'
import orderReducer from './store/reducers/orderReducer'
import authReducer from './store/reducers/authReducer'

import thunk from 'redux-thunk';


const composeEnhancers = process.env.NODE_ENV === "development" ? (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) : null || compose;


const rootReducer = combineReducers({
	brg: burgerReducer,
	ord: orderReducer,
	auth:authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
	<Provider store = {store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
	
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
