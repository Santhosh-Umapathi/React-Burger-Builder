import React, { Component } from 'react'
import Order from '../components/Order/Order';
import axios from '../axios'

import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component
{

	state = {
		orders: [],
		loading:true
	}

	componentDidMount()
	{
		axios.get('/orders.json')
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
			.catch(err =>
			{
				this.setState({loading:false})

			})
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

export default withErrorHandler(Orders, axios);