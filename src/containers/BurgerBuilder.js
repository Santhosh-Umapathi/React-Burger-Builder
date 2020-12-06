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

import * as actions from '../store/actions/actions'


export class BurgerBuilder extends Component
{

	
	
	state =
	{
		purchasing: false,
	}
	
	componentDidMount()
	{
		this.props.initIngredients()
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

	purchasingHandler = () =>
	{
		if(this.props.isAuthenticated)
		{
			this.setState({ purchasing: true })
		}
		else
		{
			this.props.history.push('./auth')
			}
	}


	purchasingCancelHandler = () => this.setState({purchasing:false})
		
	purchasingSuccessHandler = () =>
	{
		this.props.history.push("/checkout",)	
	}

	
	render()
	{

		const disabledInfo = {...this.props.ings};
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
		
		
		let burger = this.props.err ? <p style={{textAlign:"center"}}>Failed to load ingredients</p> : <Loading />

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
					purchasing={this.purchasingHandler}
					isAuthenticated = {this.props.isAuthenticated}
				/>
			</Aux>
			
			orderSummary = <OrderSummary
			ingredients={this.props.ings}
			purchased={this.purchasingSuccessHandler}
			cancelled={this.purchasingCancelHandler}
			price = {this.props.price}
			/>
				
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
		ings: state.brg.ingredients,
		price: state.brg.totalPrice,
		err: state.brg.error,
		isAuthenticated:state.auth.token
	}
}
	
const mapDispatchToProps = (dispatch) =>
{
	return {
		addIngredient: (name) => dispatch(actions.addIngredient(name)),
		removeIngredient: (name) => dispatch(actions.removeIngredient(name)),
		initIngredients: () => dispatch(actions.initIngredients())
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));