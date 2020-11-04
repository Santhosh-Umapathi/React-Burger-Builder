import React, { Component } from 'react'
import Button from '../../UI/Button/Button'

import classes from './ContactData.css'
import axios from '../../../axios'
import Spinner from '../../UI/Loading/Loading'

class ContactData extends Component
{
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode:""
		},
		loading:false
	}


	orderhandler = (event) => {
		event.preventDefault()

		this.setState({loading:true})

		const orderData = {
				ingredients: this.props.state.ingredients,
				price: this.props.state.price,
				deliveryMethod: 'Express',
				customer:
				{
					name: "Jack",
					address:
					{
						street: 'Street 1',
						city: 'Rome',
						zip: 35020,
						country:'Italy'
					},
					email:'jack@gmail.com'
				}
			}
	
			axios.post('/orders.json', orderData)
				.then(resp => this.setState({loading:false}))
				.catch(err => this.setState({loading:false}))
			

		this.props.history.push('/')

	}


	render()
	{
		console.log(this.props)

		let form = (<form>
			<input className = {classes.Input} type="text" name="name" placeholder="name"/>
			<input className = {classes.Input} type="email" name="email" placeholder="email"/>
			<input className = {classes.Input} type="text" name="street" placeholder="street"/>
			<input className = {classes.Input} type="text" name="postalCode" placeholder="postalCode"/>

		</form>)
		if (this.state.loading) {
			form = <Spinner />
		}
		return (
			<div className={classes.FormDiv}>
				<h4>Enter your Contact Data</h4>
				{form}

				<Button btnType = "Success" clicked = {this.orderhandler}>ORDER</Button>
			</div>
		)
	}
}

export default ContactData;