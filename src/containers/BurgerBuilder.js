import React, { Component } from 'react'
import BuildControls from '../components/Burgers/BuildControls/BuildControls';
import Burgers from '../components/Burgers/Burgers';
import Aux from '../hoc/Aux';

import Modal from '../components/UI/Modal/Modal'
import OrderSummary from '../components/OrderSummary/OrderSummary';


const INGREDIENTS_PRICE = {
	salad: 0.5,
	meat: 1.2,
	bacon: 0.7,
	cheese: 0.4
}


class BurgerBuilder extends Component
{

	
	
	state =
	{
		ingredients:
		{
			salad: 0,
			meat: 0,
			cheese: 0,
			bacon: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing:false
	}

	updatePurchasable = (ingredients) =>
	{
		const sum = Object.keys(ingredients)
			.map(item =>
			{
				return ingredients[item]
			})
			.reduce((preVal, curVal) => {
				return preVal + curVal
			}, 0)
		this.setState({purchasable: sum > 0})
	}

	purchasingHandler = () => this.setState({purchasing:true})


	purchasingCancelHandler = () => this.setState({purchasing:false})
		
	purchasingSuccessHandler = () => alert("Place Order Successfully")



	addIngredientHandler = (type) =>
	{
		const currentIngredients = { ...this.state.ingredients }
		const oldCount = this.state.ingredients[type]
		const newCount = oldCount + 1

		const newTolalPrice = this.state.totalPrice + INGREDIENTS_PRICE[type]

		currentIngredients[type] = newCount

		this.setState({
			ingredients: currentIngredients,
			totalPrice: newTolalPrice
		})

		this.updatePurchasable(currentIngredients)
	}
	
	removeIngredientHandler = (type) =>
	{
		const currentIngredients = { ...this.state.ingredients }
		const oldCount = this.state.ingredients[type]

		if (oldCount <= 0)
		{
			return
		}

		const newCount = oldCount - 1

		const newTolalPrice = this.state.totalPrice - INGREDIENTS_PRICE[type]

		currentIngredients[type] = newCount

		this.setState({
			ingredients: currentIngredients,
			totalPrice: newTolalPrice
		})

		this.updatePurchasable(currentIngredients)
	}
	
	render()
	{

		const disabledInfo = { ...this.state.ingredients }
		
		for(let key in disabledInfo)
		{
		  disabledInfo[key] = disabledInfo[key] <= 0 // sets salad:true, meat:false etc
		}
			
		return (
			<Aux>
				<Modal showModal = {this.state.purchasing} closeModal = {this.purchasingCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchased={this.purchasingSuccessHandler}
						cancelled={this.purchasingCancelHandler}
						price = {this.state.totalPrice}
					/>
				</Modal>
				<Burgers ingredients={this.state.ingredients}/>
				<BuildControls
					addIngredientHandler={this.addIngredientHandler}
					removeIngredientHandler={this.removeIngredientHandler}
					disabledInfo={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					purchasing = {this.purchasingHandler}
				/>
			</Aux>
		)
	}
}


export default BurgerBuilder;