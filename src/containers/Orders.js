import React, { Component } from 'react'
import Order from '../components/Order/Order';
import axios from '../axios'

import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';

class Orders extends Component
{

	state = {
		orders: [],
		loading:true
	}

	componentDidMount()
	{

		const token = this.props.token
		const userId = this.props.userId
		const params = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'

		axios.get('/orders.json'+params)
			.then(res => {
				const fetchedOrders = []
				for (let key in res.data)
				{
					fetchedOrders.push({
						...res.data[key],
						id:key
					})
				}
			this.setState({loading:false, orders:fetchedOrders})
			})
			.catch(err =>this.setState({loading:false}))
	}
	
	render()
	{

		let orders = this.state.orders.map(item =>
		{
			return <Order orderData={item}/>
			})

		return (
			<div>
				{orders}

					
			</div>
		)
	}
}

const mapStateToProps = (state) =>
{
	return {
		token: state.auth.token,
		userId: state.auth.userId,
		
	}
}
	


export default connect(mapStateToProps)(withErrorHandler(Orders, axios));