import React from 'react'
import Aux from '../../hoc/Aux'
import Button from '../UI/Button/Button'

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

			<p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>

			<p>Continue to checkout ?</p>

			<Button
				btnType="Danger"
				clicked = {props.cancelled}
			>
				CANCEL
			</Button>

			<Button
				btnType="Success"
				clicked = {props.purchased}
			>
				CONTINUE
			</Button>
			
		</Aux>
	)
}

export default OrderSummary