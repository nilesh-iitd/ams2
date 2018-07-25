import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      msgConfirmPassword: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
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

  handleChangePassword(event) {
    this.setState({msgConfirmPassword: ''});
    this.handleChange(event);
    if (this.state.password != event.target.value) {
      this.setState({msgConfirmPassword: ' : Password mismatch'});
    }
    else {
      this.setState({msgConfirmPassword: ''});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
        <div className="Register">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="name" bsSize="large">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                  autoFocus
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
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
            <FormGroup controlId="confirmPassword" bsSize="large">
              <ControlLabel>Confirm
                Password{this.state.msgConfirmPassword}</ControlLabel>
              <FormControl
                  value={this.state.confirmPassword}
                  onChange={this.handleChangePassword}
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
