import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route , Redirect} from 'react-router-dom'
import CheckoutSummary from '../components/Order/CheckoutSummary'
import ContactData from '../components/Order/ContactData/ContactData'

class Checkout extends Component
{
	

	cancelHandler = () =>
	{
		this.props.history.goBack()
	}
	
	continueHandler = () =>
	{
		this.props.history.replace("/checkout/contact-form")
	}

	

	render()
	{
		// let summary = <Redirect to="/" />
		
		// if (this.props.ings)
		// {
		// 	summary = <div>
		// 	<CheckoutSummary
		// 		ingredients={this.props.ingredients}
		// 		cancelled={this.cancelHandler}
		// 		continued = {this.continueHandler}
		// 	/>
	
		// 	<Route path={this.props.match.url + "/contact-form"} //component={ContactData}
		// 		component={ContactData}
			
		// 	/>
		// </div>
		// } 
		
		return <div>
		 	<CheckoutSummary
				ingredients={this.props.ingredients}
				cancelled={this.cancelHandler}
				continued = {this.continueHandler}
			/>
	
			<Route path={this.props.match.url + "/contact-form"} //component={ContactData}
				component={ContactData}
			
			/>
		</div>
	}
}

const mapStateToProps = (state) =>
{
	return {
		ingredients: state.brg.ingredients,
	}
} 


export default connect(mapStateToProps)(Checkout);