import React, { Component } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import classes from './Auth.css'
import * as actions from '../store/actions/actions'

import Spinner from '../components/UI/Loading/Loading'
import { Redirect } from 'react-router-dom'



class Auth extends Component
{
	state = {
		orderForm:
		{
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email'
				},
				value: '',
				validation:
				{
					required: true,
					isEmail:true
				},
				isValid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation:
				{
					required: true,
					minLength:6
				},
				isValid: false,
				touched: false
			}
		},
		isSignUp:true
	}

	checkValidity(value, rules)
	{
		let isValid = true

		if (rules.required)
		{
			isValid = value.trim() !== "" && isValid
		}
		
		if (rules.minLength)
		{
			isValid = value.length >= rules.minLength && isValid
		}
		
		if (rules.maxLength)
		{
			isValid = value.length <= rules.maxLength && isValid

		}
		if (rules.isEmail)
		{
			const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				
				
			isValid = pattern.test(value) && isValid
		}
		
		return isValid;

	}


	inputChangeHandler = (event, id) =>
	{

		const firstClone = { ...this.state.orderForm }
		const secondClone = { ...firstClone[id] }

		secondClone.value = event.target.value
		secondClone.isValid = this.checkValidity(secondClone.value, secondClone.validation)
		secondClone.touched = true

		firstClone[id] = secondClone

		let formValidation = true
		for (let key in firstClone)
		{
			formValidation = firstClone[key].isValid && formValidation
		}
		
		this.setState({ orderForm: firstClone, isFormValid:formValidation })
		
		
		}


	submitHandler = (event) =>
	{
		console.log("clicked")
		event.preventDefault()
		this.props.authenticate(this.state.orderForm.email.value, this.state.orderForm.password.value, this.state.isSignUp)
			
	}

	buttonHandler = () =>
	{
		this.setState(preState =>
		{
			return { isSignUp: !preState.isSignUp }
		})
	}




	render()
	{
		let formElementArray = []
		let redirect = null

		if (this.props.isAuthenticated && this.props.totalPrice === 4)
		{
			redirect = <Redirect to = '/' />
		}

		if (this.props.isAuthenticated && this.props.totalPrice !== 4)
		{
			redirect = <Redirect to = '/checkout' />
		}

		for (let key in this.state.orderForm)
		{
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
			}

		let form = formElementArray.map(item =>
			{
				return <Input
					elementType={item.config.elementType}
					elementConfig={item.config.elementConfig}
					value={item.config.value}
					changed={(event) => this.inputChangeHandler(event, item.id)}
					shouldValidate={item.config.validation}
					invalid={!item.config.isValid}
					touched = {item.config.touched}
				/>
		})

		if (this.props.loading)
		{
			form = <Spinner />
		}
		
		let errorMessage = null

		if (this.props.error)
		{
			errorMessage = <p>{ this.props.error.message}</p>
			}
		


		return (
			<div className={classes.FormDiv}>
				{redirect}
				<h4>Login</h4>
				{errorMessage}
				<form onSubmit = {this.submitHandler}>
				{form}

					<Button disabled={!this.state.isFormValid} btnType="Success" >Submit</Button>
					

				</form>
				<Button
						clicked = {this.buttonHandler}
						btnType="Danger"
					>{this.state.isSignUp ? "Switch SignIn" : "Switch SignUp"}</Button>
				
			</div>
		)
	}
}

const mapStateToProps = (state) =>
{
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token,
		totalPrice: state.brg.totalPrice

		
	}
}

const mapDispatchToProps = dispatch =>
{
	return {
		authenticate: (em, pas, auth) => dispatch(actions.authenticate(em, pas, auth))
	}
}

	
export default connect(mapStateToProps,mapDispatchToProps)(Auth);
