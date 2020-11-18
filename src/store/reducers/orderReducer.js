import * as actionTypes from '../actions/actionTypes'

const initialState = {
	order: [],
	loading: false,
}




const reducer = (state = initialState, action) =>
{
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			
			return {
				...state,
				order: state.order.concat(action.payload),
				loading:false
			}
	
		case actionTypes.PURCHASE_BURGER_FAILED:
			return {
				...state,
				loading:false,
			}
		
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading:true,
			}
		
	
		
		default:
			return state;
	}

	
}

export default reducer;