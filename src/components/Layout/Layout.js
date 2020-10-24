import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'
import Toolbar from '../Navigation/Toolbar/Toolbar'

import classes from './Layout.css'



class Layout extends Component
{

	state = {
		showSideDrawer: false
	}

	backdropHandler = () =>
	{
		this.setState({showSideDrawer:false})
	}

	toggleSidebarHandler = () =>
	{
		this.setState(
			(prevState) => {
				return { showSideDrawer: !prevState.showSideDrawer }
			}
		)
	}


	render()
	{
		return (
			<Aux>
				<Toolbar clicked={this.toggleSidebarHandler}/>
				<Sidedrawer show={this.state.showSideDrawer} backdropHandler={this.backdropHandler}/>
	
				<main className = {classes.content}>
					{this.props.children}
				</main>
			</Aux>
		)
	}
	
}

export default Layout;
