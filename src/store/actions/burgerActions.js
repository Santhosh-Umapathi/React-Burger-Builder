import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const addIngredient = (value) =>
{
	return {
		type: actionTypes.ADD_INGREDIENT,
		payload: value
	}
}

export const removeIngredient = (value) =>
{
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		payload: value
	}
}

export const setIngredients = (value) =>
{
	return {
		type: actionTypes.SET_INGREDIENTS,
		payload: value
	}
}

export const fetchIngredientsFailed = () =>
{
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	}
}

//Middleware
export const initIngredients = () =>
{
	return dispatch =>
	{
		axios.get('https://react-burger-builder-49c67.firebaseio.com/ingredients.json')
			.then(res => dispatch(setIngredients(res.data)))
			.catch(err => dispatch(fetchIngredientsFailed()))
	}
}