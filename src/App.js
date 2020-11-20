import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders';
import Auth from './containers/Auth';


class App extends Component
{


  state = {
    show : true
  }

  //Testing cleanup
  // componentDidMount()
  // {
  //   setTimeout(() => {
  //     this.setState({show:false})
  //   }, 5000);
  // }


  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />

            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
