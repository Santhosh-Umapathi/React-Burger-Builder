import React from 'react'
import Aux from '../../hoc/Aux'


const OrderSummary = (props) =>
{

	const summary = Object.keys(props.ingredients)
		.map(item =>
		{
			return <li>
				<span style={{ textTransform: 'capitalize' }}>
					{item}: {props.ingredients[item]}
				</span>
			</li>
		})

	return (
		<Aux>
			<h1>Order Summary</h1>
			<ul>
				{summary}	
			</ul>
			<p>Continue to checkout ?</p>
		</Aux>
	)
}

export default OrderSummary