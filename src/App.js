import React, {Component} from 'react';
import  'bootstrap';
import 'jquery';
import 'popper.js';

import './App.css';

import AppRouter from './Router';
import Login from './views/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: undefined,
      user: null
    }

    this.tokenReceived = this.tokenReceived.bind(this);
  }

  tokenReceived(token, userData){
    this.setState({token: token, user: userData})
  }

  render() { 
    return (
        <div>                    
            {((this.state.token === undefined) || (this.state.token === null))? <Login className='margin-top' callbackFromParent={this.tokenReceived}/> : <AppRouter />}
            {/* <AppRouter /> */}
        </div>
    );
  }
}
 

export default App;
