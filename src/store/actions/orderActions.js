import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const purchaseBurgerSuccess = (id, orderData) =>
{
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		payload: {orderId: id , order: orderData}
	}
}

export const purchaseBurgerFail = (error) =>
{
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED,
		payload: error
	}
}

export const purchaseBurgerStart = () =>
{
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	}
}



//Middleware
export const purchaseBurger = (orderData, token) =>
{
	return dispatch =>
	{
		dispatch(purchaseBurgerStart())

		axios.post('/orders.json?auth='+token, orderData)
		.then(resp => dispatch(purchaseBurgerSuccess(resp.data.name, orderData)))
		.catch(err => dispatch(purchaseBurgerFail(err)) )
	}
}
