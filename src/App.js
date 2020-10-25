import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';



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
         {this.state.show ?  <BurgerBuilder /> : null}
        </Layout>
      </div>
    );
  }
}

export default App;
