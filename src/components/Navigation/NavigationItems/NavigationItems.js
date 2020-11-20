import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'


const NavigationItems = (props) => {
	return (
		<ul className = {classes.NavigationItems}>
			<NavigationItem link = "/" active>Burger Builder</NavigationItem>
			<NavigationItem link = "/orders">Orders</NavigationItem>
			<NavigationItem link = "/auth">Aunthenticate</NavigationItem>

		</ul>
	)
}

export default NavigationItems;