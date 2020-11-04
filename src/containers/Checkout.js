import { info } from 'autoprefixer'
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CheckoutSummary from '../components/Order/CheckoutSummary'
import ContactData from '../components/Order/ContactData/ContactData'

class Checkout extends Component
{
	state = {
		ingredients: null,
		price:0
	}

	cancelHandler = () =>
	{
		this.props.history.goBack()
	}
	
	continueHandler = () =>
	{
		this.props.history.replace("/checkout/contact-form")
	}

	componentWillMount()
	{

		const query = new URLSearchParams(this.props.location.search)
		const ingredients = {}
		let price

		for (let params of query.entries())
		{
			if (params[0] === "price")
			{
				price = params[1]
			}
			else
			{
				ingredients[params[0]] = +params[1]
			}
			
		}

		
		this.setState({ingredients:ingredients, price: price})
		
	}
	

	render()
	{
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					cancelled={this.cancelHandler}
					continued = {this.continueHandler}
				/>

				<Route path={this.props.match.url + "/contact-form"} //component={ContactData}
					render={(props) => (<ContactData state={this.state} {...props}/>)}
				
				/>
			</div>
		)
	}
}

export default Checkout