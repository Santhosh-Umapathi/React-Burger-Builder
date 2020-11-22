import React from 'react'

import classes from './BuildControls.css'

import BuildConrol from './BuildControl/BuildControl'
import BuildControl from './BuildControl/BuildControl'

const controls = [
	{label: "Salad", type: "salad" },
	{label: "Meat", type:"meat"},
	{label: "Bacon", type:"bacon"},
	{label: "Cheese", type:"cheese"},

]

const BuildControls = (props) => {
	return (
		<div className={classes.BuildControls}>
			<p>Current Price: 
				<strong> ${props.price.toFixed(2)}</strong>
			</p>
			{controls.map(item =>
			{
				return <BuildControl
					key={item.label}
					label={item.label}
					moreClicked={() => props.addIngredientHandler(item.type)}
					lessClicked={() => props.removeIngredientHandler(item.type)}
					disabled = {props.disabledInfo[item.type]}
				/>
			})}

			<button
				className={classes.OrderButton}
				disabled={!props.purchasable}
				onClick = {props.purchasing}
			>
				{props.isAuthenticated ? "ORDER NOW" : "SIGN UP TO ORDER"}
			</button>
		</div>
	)
}


export default BuildControls;