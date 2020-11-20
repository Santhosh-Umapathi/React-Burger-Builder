import * as actionTypes from '../actions/actionTypes'

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error:false
}


const INGREDIENTS_PRICE = {
	salad: 0.5,
	meat: 1.2,
	bacon: 0.7,
	cheese: 0.4
}


const reducer = (state = initialState, action) =>
{
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients:
				{
					...state.ingredients,
					[action.payload]: state.ingredients[action.payload] + 1
				},
				totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.payload]
			}
	
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients:
				{
					...state.ingredients,
					[action.payload]: state.ingredients[action.payload] - 1
				},
				totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.payload]
			}
		
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				ingredients:action.payload,
				error: false,
				totalPrice:4
			}
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true
			}
		
		default:
			return state;
	}

	
}

export default reducer;