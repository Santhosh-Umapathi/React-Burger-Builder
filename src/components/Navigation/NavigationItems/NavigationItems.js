import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

// import { useSelector } from 'react-redux'


const NavigationItems = (props) =>
{
	const {state} = props

	// const state = useSelector(state => state.auth)

	return (
		<ul className = {classes.NavigationItems}>
			<NavigationItem link="/" active>Burger Builder</NavigationItem>
			
			{state
				? <NavigationItem link="/orders">Orders</NavigationItem>
				: null
			}

			{state
				? <NavigationItem link="/logout">Logout</NavigationItem>
				: <NavigationItem link = "/auth">Aunthenticate</NavigationItem>
			}
		</ul>
	)
}

export default NavigationItems;