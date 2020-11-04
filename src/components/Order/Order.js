import React from 'react'
import classes from './Order.css'

const Order = (props) =>
{
	console.log(props.orderData)

	let ingredients = []

	for (let ingName in props.orderData.ingredients)
	{
		ingredients.push({name: ingName, value: props.orderData.ingredients[ingName]})
	}
	
	const ingredientsJsx = ingredients.map(item =>
	{
		return <span style={{
			padding: "10px",
			margin: '5px',
			textTransform: 'capitalize',
			border: '1px solid orange',
			boxShadow:'0 2px 2px orange'
			
		}}>{item.name} ({item.value})</span>
		})





	return (
		<div className={classes.Order}>
			Ingredients: {ingredientsJsx}

			<p>Price: {props.orderData.price}</p>

		</div>
	)
}

export default Order;