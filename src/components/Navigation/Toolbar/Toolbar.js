import React from 'react'
import Logo from '../../Logo/Logo'
import classes from './Toolbar.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../Sidedrawer/DrawerToggle/DrawerToggle'

import { useSelector, useDispatch } from 'react-redux'


const Toolbar = (props) =>
{
	const state = useSelector(state => state.auth)

	return (
		<header className={classes.Toolbar}>

			<DrawerToggle clicked={props.clicked}/>


			<div className = {classes.Logo}>
				<Logo />
			</div>
			<nav className = {classes.DesktopOnly}>
				<NavigationItems state={state.token}/>
			</nav>
		</header>
		
	)
}


export default Toolbar