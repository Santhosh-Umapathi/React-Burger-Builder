import React, { Component } from 'react'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import classes from './ContactData.css'
import axios from '../../../axios'
import Spinner from '../../UI/Loading/Loading'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

import * as actions from '../../../store/actions/actions'

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
			value: 'fastest',
			validation:
				{
					required:false
				},
				isValid:true,
		}
		},
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

		const orderData = {
				ingredients: this.props.ings,
				price: this.props.price,
			orderData: newObject,
				userId: this.props.userId
		}
		
		this.props.onOrderStart(orderData, this.props.token)
	
		
			

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

		if (rules.isEmail)
		{
			const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
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
		if (this.props.loading) {
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

const mapStateToProps = (state) =>
{
	return {
		ings: state.brg.ingredients,
		price: state.brg.totalPrice,
		loading: state.ord.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = dispatch =>
{
	return {
		onOrderStart: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
	}
	}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios)); 