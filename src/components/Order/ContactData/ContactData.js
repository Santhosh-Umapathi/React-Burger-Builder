import React, { Component } from 'react'
import Button from '../../UI/Button/Button'

import classes from './ContactData.css'
import axios from '../../../axios'
import Spinner from '../../UI/Loading/Loading'
import Input from '../../UI/Input/Input'


class ContactData extends Component
{
	state = {
		orderForm:
		{
			name:
			{
				elementType: 'input',
				elementConfig:
				{
					type: 'text',
					placeholder: 'Name'
				},
				value: '',
				validation:
				{
					required:true
				},
				isValid: false,
				touched:false
			},
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Email'
			},
			value: '',
			validation:
				{
					required:true
				},
				isValid:false,
				touched:false
		},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation:
				{
					required:true
				},
				isValid:false,
				touched:false
			},
			postalCode:{
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code'
				},
				value: '',
				validation:
				{
					required: true,
					minLength: 5,
					maxLength:5
				},
				isValid:false,
				touched:false
		},
		country:{
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Country'
			},
			value: '',
			validation:
				{
					required:true
				},
				isValid:false,
				touched:false
		},
		deliveryMethod:{
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 'fastest', displayValue: 'Fastest' },
					{ value: 'cheapest', displayValue: 'Cheapest' },
				]
			},
			value: '',
			validation:
				{
					required:false
				},
				isValid:true,
		}
		},
		loading: false,
		isFormValid:false
	}


	orderhandler = (event) => 
	{
		event.preventDefault()

		const newObject = {}
		
		for(let key in this.state.orderForm)
		{
		   newObject[key] = this.state.orderForm[key].value
		}

		this.setState({loading:true})

		const orderData = {
				ingredients: this.props.state.ingredients,
				price: this.props.state.price,
				orderData:newObject
			}
	
			axios.post('/orders.json', orderData)
				.then(resp => this.setState({loading:false}))
				.catch(err => this.setState({loading:false}))
			

		this.props.history.push('/')

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
		if (this.state.loading) {
			form = <Spinner />
		}
		return (
			<div className={classes.FormDiv}>
				<h4>Enter your Contact Data</h4>
				{form}

				<Button disabled = {!this.state.isFormValid} btnType = "Success" clicked = {this.orderhandler}>ORDER</Button>
			</div>
		)
	}
}

export default ContactData;