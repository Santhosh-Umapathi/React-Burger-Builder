import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import { Redirect, Route, Switch } from 'react-router-dom';
import Logout from './containers/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions'
import LazyLoading from './hoc/LazyLoading'

//Lazy Loading
const lazyAuth = LazyLoading(() =>
{
  return import ("./containers/Auth")
})

const lazyCheckout = LazyLoading(() =>
{
  return import ("./containers/Checkout")
})

const lazyOrders = LazyLoading(() =>
{
  return import ("./containers/Orders")
})



  

class App extends Component
{


  state = {
    show : true
  }

  componentDidMount()
  {
    this.props.authCheckState()

   
    
    
  }

  //Testing cleanup
  // componentDidMount()
  // {
  //   setTimeout(() => {
  //     this.setState({show:false})
  //   }, 5000);
  // }


  render()
  {

    let routes = <Switch>
      <Route path="/auth" component={lazyAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>

    if (this.props.isAuthenticated)
    {
      routes =  <Switch>
        <Route path="/checkout" component={lazyCheckout} />
        <Route path="/orders" component={lazyOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />

        </Switch>
      }


    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) =>
{
	return {
		isAuthenticated:state.auth.token
	}
}

const mapDispatchToProps = (dispatch) =>
{
	return {
		authCheckState: () => dispatch(actions.authCheckState()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
