import React from 'react'
import Aux from '../../hoc/Aux'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'
import Toolbar from '../Navigation/Toolbar/Toolbar'

import classes from './Layout.css'



const Layout = (props) =>
{
	return (
		<Aux>
			{/* <div>
				ToolBar, SideDrawer, BackDrop
			</div> */}
			<Toolbar />
			<Sidedrawer />

			<main className = {classes.content}>
				{props.children}
			</main>
		</Aux>
	)
}

export default Layout;
