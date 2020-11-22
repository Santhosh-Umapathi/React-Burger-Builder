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
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");


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
		const signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + ApiKey
		
		


		axios.post(isSignup ? signUpUrl : signInUrl, postData)
			.then(resp =>
			{
				const expirationDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000)
				localStorage.setItem("token", resp.data.idToken);
				localStorage.setItem("expirationDate", expirationDate);
				localStorage.setItem("userId", resp.data.localId);


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

export const authCheckState = () =>
{
	return dispatch =>
	{
		const token = localStorage.getItem("token")
		const userId = localStorage.getItem("userId")
		const expirationDate = new Date(localStorage.getItem("expirationDate"))

		if (!token)
		{
			dispatch(authLogout())
		}
		else
		{
			if (expirationDate < new Date())
			{
				dispatch(authLogout())
			}
			else
			{
				const data = {
					idToken:token,
					localId:userId
				}
				dispatch(authSuccess(data))
				dispatch(checkExpiration(new Date(expirationDate.getTime() - new Date().getTime())/1000))
			}			
		}			
	}
}