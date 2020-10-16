import React from 'react'

import classes from './Modal.css'

const Modal = (props) =>
{

	return (
		<div
			className={classes.Modal}
			style={{
				transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
				opacity: props.showModal ? 1 : 0
			}}
		>
			{props.children}
		</div>
	)
}

export default Modal;