import React from 'react'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

import classes from './Modal.css'


const Modal = (props) =>
{

	return (
		<Aux>
			<Backdrop clicked={props.closeModal} show={props.showModal}/>
			<div
				className={classes.Modal}
				style={{
					transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.showModal ? 1 : 0
				}}
			>
				{props.children}
			</div>
		</Aux>
		

	)
}

export default Modal;