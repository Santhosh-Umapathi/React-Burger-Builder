import * as actionTypes from './actionTypes'
import axios from 'axios'



export const authStart = () =>
{
	return {
		type: actionTypes.AUTH_START,
	}
} 

export const authSuccess = (data) =>
{
	return {
		type: actionTypes.AUTH_SUCCESS,
		payload: {token: data.idToken , userId: data.localId }
	}
}

export const authFail = (error) =>
{
	return {
		type: actionTypes.AUTH_FAIL,
		payload:error
	}
}

export const authLogout = () =>
{
	return {
		type: actionTypes.AUTH_LOGOUT,
	}
}





//Middleware
export const authenticate = (email, password, isSignup) =>
{
	return dispatch =>
	{
		dispatch(authStart())
		const postData = {
			email: email,
			password: password,
			returnSecureToken:true
		}
		const ApiKey = "AIzaSyDQhC1ur5RHMkOyd1XvJObpQ_-iU2Y4hXw"
		const signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ApiKey
		const signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+ApiKey

		axios.post(isSignup ? signUpUrl : signInUrl, postData)
			.then(resp => {
				dispatch(authSuccess(resp.data))
				dispatch(checkExpiration(resp.data.expiresIn))
			})
		.catch(err => dispatch(authFail(err.response.data.error)) )
	}
}

//Logout after expiration automatically
export const checkExpiration = (expirationTime) =>
{
	return dispatch =>
	{
		setTimeout(() =>
		{
			dispatch(authLogout())
		}, expirationTime * 1000);
	}
}