import React from 'react'

//Testing
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

//Reducer
import authReducer from './authReducer'
import * as actionTypes from '../actions/actionTypes'



configure({ adapter: new Adapter() }); //Connecting Enzyme to React

//Test Logic
describe("authReducer", () =>
{
	

	//state check if action is undefined
	it("should return initial state", () =>
	{
		expect(authReducer(undefined, {}))
			.toEqual({
				token: null,
				userId: null,
				loading:false,
				error:null
			})
	})

	//state check if action is given
	it("should return initial state", () =>
	{
		expect(authReducer({ //initial state
			token: null,
			userId: null,
			loading:false,
			error:null
		},
		{ //Reducer action/payload
			type: actionTypes.AUTH_SUCCESS,
			payload:{token: "token" , userId: "userId" }
		}))
		.toEqual({ //state after action dispatched
			token: "token",
			userId: "userId",
			loading:false,
			error:null
		})
	})
})