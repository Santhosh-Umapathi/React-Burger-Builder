import React, { Component } from 'react'
import Burgers from '../components/Burgers/Burgers';
import Aux from '../hoc/Aux';



class BurgerBuilder extends Component
{
	
	state = {
		ingredients:
		{
			salad: 0,
			meat: 0,
			cheese: 0,
			bacon: 0
		}
	}
	
	render()
	{
		return (
			<Aux>
				<Burgers ingredients={this.state.ingredients}/>
				<div>Burger Controls</div>
			</Aux>
		)
	}
}


export default BurgerBuilder;