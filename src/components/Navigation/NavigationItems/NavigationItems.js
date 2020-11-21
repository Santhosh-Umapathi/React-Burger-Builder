import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

import { useSelector, useDispatch } from 'react-redux'


const NavigationItems = (props) =>
{

	const state = useSelector(state => state.auth)
	const dispatch = useDispatch()


	return (
		<ul className = {classes.NavigationItems}>
			<NavigationItem link = "/" active>Burger Builder</NavigationItem>
			<NavigationItem link = "/orders">Orders</NavigationItem>

			{state.token
				? <NavigationItem link="/logout">Logout</NavigationItem>
				: <NavigationItem link = "/auth">Aunthenticate</NavigationItem>
			}
		</ul>
	)
}

export default NavigationItems;