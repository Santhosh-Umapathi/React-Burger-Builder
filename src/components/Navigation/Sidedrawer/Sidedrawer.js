import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Sidedrawer.css'

const Sidedrawer = (props) =>
{
	
	
	return (
		<div className = {classes.Sidedrawer}>
			<Logo />
			<nav>
				<NavigationItems />
			</nav>
		</div>
	)
}

export default Sidedrawer