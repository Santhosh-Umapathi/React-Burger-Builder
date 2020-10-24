import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Button from '../UI/Button/Button'

class OrderSummary extends Component
{

	

	componentDidUpdate()
	{
		console.log("Order sum - comp did up")
	}

	render()
	{
		const summary = Object.keys(this.props.ingredients)
		.map(item =>
		{
			return <li>
				<span style={{ textTransform: 'capitalize' }}>
					{item}: {this.props.ingredients[item]}
				</span>
			</li>
		})

	return (
		<Aux>
			<h1>Order Summary</h1>
			<ul>
				{summary}	
			</ul>

			<p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>

			<p>Continue to checkout ?</p>

			<Button
				btnType="Danger"
				clicked = {this.props.cancelled}
			>
				CANCEL
			</Button>

			<Button
				btnType="Success"
				clicked = {this.props.purchased}
			>
				CONTINUE
			</Button>
			
		</Aux>
	)
	}

	
}

export default OrderSummary