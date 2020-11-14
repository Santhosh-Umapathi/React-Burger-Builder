import React, { Component } from 'react'
import BuildControls from '../components/Burgers/BuildControls/BuildControls';
import Burgers from '../components/Burgers/Burgers';
import Aux from '../hoc/Aux';

import Modal from '../components/UI/Modal/Modal'
import OrderSummary from '../components/OrderSummary/OrderSummary';

import axios from '../axios'
import Loading from '../components/UI/Loading/Loading';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

import * as actionTypes from '../store/action'



class BurgerBuilder extends Component
{

	
	
	state =
	{
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
		return sum > 0;
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

	
	render()
	{

		const disabledInfo = { ...this.props.ings }
		
		for(let key in disabledInfo)
		{
		  disabledInfo[key] = disabledInfo[key] <= 0 // sets salad:true, meat:false etc
		}

		
		let orderSummary
		
		
		let burger = this.state.error ? <p style={{textAlign:"center"}}>Failed to load ingredients</p> : <Loading />

		if (this.props.ings)
		{
			burger = <Aux>
			<Burgers ingredients={this.props.ings}/>
			<BuildControls
				addIngredientHandler={this.props.addIngredient}
				removeIngredientHandler={this.props.removeIngredient}
				disabledInfo={disabledInfo}
				price={this.props.price}
				purchasable={this.updatePurchasable(this.props.ings)}
				purchasing = {this.purchasingHandler}
				/>
			</Aux>
			
			orderSummary = <OrderSummary
			ingredients={this.props.ings}
			purchased={this.purchasingSuccessHandler}
			cancelled={this.purchasingCancelHandler}
			price = {this.props.price}
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

const mapStateToProps = (state) =>
{
	return {
		ings: state.ingredients,
		price:state.totalPrice
	}
}
	
const mapDispatchToProps = (dispatch) =>
{
	return {
		addIngredient: (name) => dispatch({ type: actionTypes.ADD_INGREDIENT, payload:name}),
		removeIngredient: (name) => dispatch({type: actionTypes.REMOVE_INGREDIENT , payload:name})

	}
	}




export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));