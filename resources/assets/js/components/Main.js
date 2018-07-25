import React, {Component} from 'react';
import Login from './Login';
import ReactDOM from 'react-dom';
import Register from "./Register";
import Dashboard from "./Dashboard";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api_token: null
    };

    this.setAPIToken = this.setAPIToken.bind(this);
    this.resetAPIToken = this.resetAPIToken.bind(this);
  }

  setAPIToken(token = null) {
    this.setState({api_token: token});
  }

  resetAPIToken() {
    this.setState({api_token: null});
  }

  render() {
    return (
        <div className="container">
          <div className="row justify-content-center"
               hidden={this.state.api_token ? true : false}>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">Login</div>
                <div className="card-body">
                  <Login onSuccess={this.setAPIToken}
                         onFailure={this.resetAPIToken}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">Register</div>
                <div className="card-body">
                  <Register onSuccess={this.setAPIToken}
                            onFailure={this.resetAPIToken}/>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center"
               hidden={this.state.api_token ? false : true}>
            <Dashboard token={this.state.api_token}/>
          </div>
        </div>
    );
  }
}

if (document.getElementById('main')) {
  ReactDOM.render(<Main/>, document.getElementById('main'));
}
