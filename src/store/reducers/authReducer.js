import * as actionTypes from '../actions/actionTypes'

const initialState = {
	token: null,
	userId: null,
	loading:false,
	error:null
}




const reducer = (state = initialState, action) =>
{
	switch (action.type) {
		case actionTypes.AUTH_START:

			return {
				...state,
				loading:true
			}
		
		case actionTypes.AUTH_SUCCESS:

			return {
				...state,
				loading: false,
				token: action.payload.token,
				userId: action.payload.userId,
				error:null
			}
		case actionTypes.AUTH_FAIL:

			return {
				...state,
				loading: false,
				error:action.payload
			}
		
		case actionTypes.AUTH_LOGOUT:
			return {...state, token:null, userId:null}
	
		
		
		default:
			return state;
	}

	
}

export default reducer;