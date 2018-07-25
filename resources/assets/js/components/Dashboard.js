import React, {Component} from 'react';
import axios from 'axios';
import Athlete from "./Athlete";
import Team from "./Team";
import Sport from "./Sport";
import {Button, ButtonToolbar} from 'react-bootstrap';
import ATS from "./ATS";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {nav: 0};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleNav = this.handleNav.bind(this);
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

  handleNav(event) {
    this.setState({nav: parseInt(event.target.value)});
  }

  render() {
    let comp;

    switch (this.state.nav) {
      case 1:
        comp = <Sport token={this.props.token}/>;
        break;
      case 2:
        comp = <Team token={this.props.token}/>;
        break;
      case 3:
        comp = <Athlete token={this.props.token}/>;
        break;
      case 4:
        comp = <ATS token={this.props.token}/>;
        break;
      default:
        comp = <Sport token={this.props.token}/>;
        break;
    }

    return (
        <div className="col-md-12">
          <ButtonToolbar>
            <Button onClick={this.handleNav} value="1" bsStyle="primary"
                    bsSize="large">Sports</Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button onClick={this.handleNav} value="2" bsStyle="primary"
                    bsSize="large">Teams</Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button onClick={this.handleNav} value="3" bsStyle="primary"
                    bsSize="large">Athletes</Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button onClick={this.handleNav} value="4" bsStyle="primary"
                    bsSize="large">Play</Button>
          </ButtonToolbar>

          <br/>

          {comp}
        </div>
    );
  }
}
