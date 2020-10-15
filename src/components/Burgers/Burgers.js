import React from 'react'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'
import classes from './Burgers.css'



const Burgers = (props) =>
{

	const ingredients = props.ingredients

	//Creating Array with keys as type and values and no.of ingredients
	const newIngredients = Object.keys(ingredients)
		.map(item =>
		{
			return [...Array(ingredients[item])]
				.map((_, index) =>
				{
					return <BurgerIngredients key={item + index} type={item}/>
				})
		})





	return (
		<div className = {classes.burger}>
			<BurgerIngredients type="bread-top" />

			{/* <BurgerIngredients type = "cheese"/>
			<BurgerIngredients type = "meat"/> */}

			{newIngredients}

			<BurgerIngredients type = "bread-bottom"/>

		</div>
	)
}

export default Burgers;