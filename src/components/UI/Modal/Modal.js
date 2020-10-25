import React, { Component } from 'react'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

import classes from './Modal.css'


class Modal extends Component
{

	shouldComponentUpdate(nextProps, nextState)
	{
		return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children
	}

	componentDidUpdate()
	{
		console.log("Modal - comp up")
	}




	render(){
	return (
		<Aux>
			<Backdrop clicked={this.props.closeModal} show={this.props.showModal}/>
			<div
				className={classes.Modal}
				style={{
					transform: this.props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: this.props.showModal ? 1 : 0
				}}
			>
				{this.props.children}
			</div>
		</Aux>
		

	)}
}

export default Modal;