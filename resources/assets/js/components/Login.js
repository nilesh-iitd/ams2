import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    axios.post('/api/login', {
      email: this.state.email,
      password: this.state.password
    }).then((res) => {
      let {api_token} = res.data.data;
      if (api_token) {
        this.props.onSuccess(api_token);
      }
      else {
        this.props.onFailure();
        alert('Invalid token found!');
      }
    }).catch((err) => {
      this.props.onFailure();
      alert('Invalid login found!')
    });
    event.preventDefault();
  }

  render() {
    return (
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
              />
            </FormGroup>
            <Button
                block
                bsSize="large"
                bsStyle="primary"
                disabled={!this.validateForm()}
                type="submit"
            >
              Login
            </Button>
          </form>
        </div>
    );
  }
}
