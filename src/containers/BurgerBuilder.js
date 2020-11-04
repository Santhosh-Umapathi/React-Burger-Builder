import React, { Component } from 'react'
import BuildControls from '../components/Burgers/BuildControls/BuildControls';
import Burgers from '../components/Burgers/Burgers';
import Aux from '../hoc/Aux';

import Modal from '../components/UI/Modal/Modal'
import OrderSummary from '../components/OrderSummary/OrderSummary';

import axios from '../axios'
import Loading from '../components/UI/Loading/Loading';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';




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
		ingredients:null,
		totalPrice: 4,
		purchasable: false,
			purchasing: false,
			loading: false,
		error:null
		}
	
	
	componentDidMount()
	{
		axios.get('https://react-burger-builder-49c67.firebaseio.com/ingredients.json')
			.then(res => this.setState({ ingredients: res.data }))
			.catch(err => this.setState({ error: err }))
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
		
	purchasingSuccessHandler = () =>
	{
		//alert("Place Order Successfully")

		const queryParams = []

		for (let i in this.state.ingredients)
		{
			queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
		}

		queryParams.push("price="+this.state.totalPrice)
		
		const queryString = queryParams.join("&")

		this.props.history.push({
			pathname: "/checkout",
			search:'?'+queryString
		})


		// this.setState({loading:true})

		// const orderData = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.totalPrice,
		// 	deliveryMethod: 'Express',
		// 	customer:
		// 	{
		// 		name: "Jack",
		// 		address:
		// 		{
		// 			street: 'Street 1',
		// 			city: 'Rome',
		// 			zip: 35020,
		// 			country:'Italy'
		// 		},
		// 		email:'jack@gmail.com'
		// 	}
		// }

		// axios.post('/orders.json', orderData)
		// 	.then(resp => this.setState({loading:false, purchasing:false}))
		// 	.catch(err => this.setState({loading:false, purchasing:false}))
		
	}



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

		
		let orderSummary
		
		
		let burger = this.state.error ? <p style={{textAlign:"center"}}>Failed to load ingredients</p> : <Loading />

		if (this.state.ingredients)
		{
			burger = <Aux>
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
			
			orderSummary = <OrderSummary
			ingredients={this.state.ingredients}
			purchased={this.purchasingSuccessHandler}
			cancelled={this.purchasingCancelHandler}
			price = {this.state.totalPrice}
			/>
			
			if (this.state.loading)
			{
				orderSummary = <Loading />
			}
			
		}
		
			

			
		return (
			<Aux>
				<Modal showModal = {this.state.purchasing} closeModal = {this.purchasingCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		)
	}
}


export default withErrorHandler(BurgerBuilder, axios);