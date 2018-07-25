import React, { Component } from 'react';
import Login from './Login';
import ReactDOM from 'react-dom';
import Register from "./Register";

export default class Main extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <Login/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Register</div>
                            <div className="card-body">
                                <Register/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
