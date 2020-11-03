import React from 'react'
import Burgers from '../Burgers/Burgers'
import Button from '../UI/Button/Button'
import classes from './CheckoutSummary.css'


const CheckoutSummary = (props) =>
{

	return (
		<div className = {classes.CheckoutSummary}>
			<h1>Hope it Tastes Well !!</h1>
			<div style={{ margin: 'auto' }}>
				<Burgers ingredients={props.ingredients}/>

			</div>

			<Button
				btnType="Danger"
				clicked = {props.cancelled}
			>Cancel</Button>

			<Button
				btnType="Success"
				clicked = {props.continued}
			>Continue</Button>
		</div>
	)
}

export default CheckoutSummary
