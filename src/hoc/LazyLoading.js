import React, { Component } from 'react'

//Only loads a component when needed in Production
const LazyLoading = (importComponent) =>
{
	return class extends Component
	{
		state = {
			component:null
		}

		componentDidMount()
		{
			importComponent()
			.then(comp => this.setState({component:comp.default}))
		}

		render()
		{
			const C = this.state.component
			
			return C ? <C {...this.props}/> : null
		}

	}
}

export default LazyLoading;