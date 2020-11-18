import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux'


// Global error wrapper
const withErrorHandler = (WrappedComponent, axios) =>
{
	return class extends Component
	{
		state = {
			error:null
		}


		componentDidMount()
		{
			this.reqInterceptor = axios.interceptors.request.use(request => {
				this.setState({ error: null })
				return request;
			}//,
			// error =>
			// {
			// 	this.setState({error:error})
				// }
			)

			this.resInterceptor = axios.interceptors.response.use(response => response, error =>
			{
				this.setState({error:error})
			})
			
		}

		componentWillUnmount()
		{
			//Clean up axios interceptors to avoid memory leak

			console.log("will unmount", this.reqInterceptor, this.resInterceptor)
			
			axios.interceptors.request.eject(this.reqInterceptor)
			axios.interceptors.response.eject(this.resInterceptor)

		}


		modalHandler = () =>
		{
			this.setState({error:null})
		}
		

		render()
		{
			return (
				<Aux>

					<Modal showModal = {this.state.error} closeModal = {this.modalHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					
					<WrappedComponent {...this.props} />
				</Aux>
				
			)
		}
	}
}


export default withErrorHandler;