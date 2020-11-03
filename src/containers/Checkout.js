import { info } from 'autoprefixer'
import React, { Component } from 'react'
import CheckoutSummary from '../components/Order/CheckoutSummary'


class Checkout extends Component
{
	state = {
		ingredients:{salad: 1,
		cheese: 0,
		meat: 1,
		bacon:1}
	}

	cancelHandler = () =>
	{
		this.props.history.goBack()
	}
	
	continueHandler = () =>
	{
		this.props.history.replace("/checkout/contact-form")
	}

	componentDidMount()
	{

		const query = new URLSearchParams(this.props.location.search)
		const ingredients = {}

		for (let params of query.entries())
		{
			ingredients[params[0]] = +params[1] 
		}
		console.log("ING=>",ingredients)

		
		this.setState({ingredients:ingredients})
		
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
			</div>
		)
	}
}

export default Checkout