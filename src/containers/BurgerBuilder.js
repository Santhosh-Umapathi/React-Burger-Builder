import React, { Component } from 'react'
import Burgers from '../components/Burgers/Burgers';
import Aux from '../hoc/Aux';



class BurgerBuilder extends Component
{
	
	state = {
		ingredients:
		{
			salad: 1,
			meat: 2,
			cheese: 2,
			bacon: 1
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