import React, { Component } from 'react'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import classes from './Auth.css'

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
		}
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






	render()
	{
		let formElementArray = []

		for (let key in this.state.orderForm)
		{
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
			}

		let form = (<form onSubmit = {this.orderhandler}>

			{formElementArray.map(item =>
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
				})}
			
			
		</form>)
		return (
			<div className={classes.FormDiv}>
				<h4>Login</h4>
				{form}

				<Button disabled = {!this.state.isFormValid} btnType = "Success" clicked = {this.orderhandler}>Submit</Button>
			</div>
		)
	}
}

export default Auth
