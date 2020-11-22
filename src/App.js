import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import { Redirect, Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders';
import Auth from './containers/Auth';
import Logout from './containers/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions'

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
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>

    if (this.props.isAuthenticated)
    {
      routes =  <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
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
