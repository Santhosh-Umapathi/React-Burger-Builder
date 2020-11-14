import * as actionTypes from './action'

const initialState = {
	ingredients: {
		salad: 0,
		meat: 0,
		cheese: 0,
		bacon:0
	},
	totalPrice:4
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
		
		default:
	}

	return state;
}

export default reducer;