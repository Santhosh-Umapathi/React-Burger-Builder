import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Sidedrawer.css'

import Aux from '../../../hoc/Aux'

import Backdrop from '../../UI/Backdrop/Backdrop'

const Sidedrawer = (props) =>
{
	
	let attachedClasses = [classes.Sidedrawer, classes.Close]

	if (props.show)
	{
		attachedClasses = [classes.Sidedrawer, classes.Open]
		}
	
	return (
		<Aux>
			<Backdrop show={props.show} clicked={props.backdropHandler}/>

		<div className = {attachedClasses.join(' ')} onClick = {props.backdropHandler}>
			<div className = {classes.Logo}>
				<Logo />
			</div>

			<nav>
				<NavigationItems />
			</nav>
			</div>
			</Aux>

	)
}

export default Sidedrawer