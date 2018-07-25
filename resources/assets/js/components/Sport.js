import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class Sport extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.sports = [];
  }

  componentWillReceiveProps(newProps) {
    this.props = newProps;
    this.reloadData();
  }

  componentDidMount(){
    this.reloadData();
  }

  reloadData() {
    if (this.props.token) {
      axios.get('/api/sports?api_token=' + this.props.token)
          .then((res) => {
            this.setState({sports: res.data});
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };

  handleRowTeam(sport) {
    if (sport.id && this.props.token) {
      axios.get('/api/ats/ts/' + sport.id + '?api_token=' + this.props.token)
          .then((res) => {
            var teamList = 'List of Teams for Sport: ' + sport.name + "\n\n";
            res.data.forEach(t => {
              teamList += t.name + ', '
            });
            alert(teamList);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  handleRowAthlete(sport) {
    if (sport.id && this.props.token) {
      axios.get('/api/ats/as/' + sport.id + '?api_token=' + this.props.token)
          .then((res) => {
            var teamList = 'List of Athletes for Sport: ' + sport.name + "\n\n";
            res.data.forEach(t => {
              teamList += t.name + ', '
            });
            alert(teamList);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  handleRowSave(sport) {
    if (!this.props.token) {
      alert('Session expired! Please login again...');
      return;
    }
    if (sport.name) {
      axios.post('/api/sports', {api_token: this.props.token, name: sport.name})
          .then((res) => {
            var index = this.state.sports.indexOf(sport);
            this.state.sports.splice(index, 1);
            sport.id = res.data.id;
            this.state.sports.unshift(sport);
            this.setState(this.state.sports);
          })
          .catch((err) => {
            alert('Failed to Save: ' + err.status);
            console.log(err);
          });
    }
    else {
      alert('Please enter name');
    }
  };

  handleRowUpdate(sport) {
    if (!this.props.token) {
      alert('Session expired! Please login again...');
      return;
    }

    if (sport.id && sport.name) {
      axios.put('/api/sports/' + sport.id, {
        api_token: this.props.token,
        name: sport.name
      })
          .then((res) => {
            var index = this.state.sports.indexOf(sport);
            this.state.sports.splice(index, 1);
            sport.id = res.data.id;
            this.state.sports.unshift(sport);
            this.setState(this.state.sports);
            alert('Sport record is successfully Updated!');
          })
          .catch((err) => {
            alert('Failed to Update: ' + err.status);
            console.log(err);
          });
    }
    else {
      alert('Invalid id and name found!');
    }
  };

  handleRowDel(sport) {
    if (!this.props.token) {
      alert('Session expired! Please login again...');
      return;
    }

    if (sport.id) {
      axios.delete('/api/sports/' + sport.id, {data: {api_token: this.props.token}})
          .then((res) => {
            var index = this.state.sports.indexOf(sport);
            this.state.sports.splice(index, 1);
            this.setState(this.state.sports);
          })
          .catch((err) => {
            alert('Failed to delete: ' + err.status);
            console.log(err);
          });
    }
    else {
      alert('Invalid id found!');
    }
  };

  handleAddEvent(evt) {
    if (!this.props.token) {
      alert('Session expired! Please login again...');
      return;
    }
    var sport = {
      id: 0,
      name: ""
    }
    this.state.sports.unshift(sport);
    this.setState(this.state.sports);
  }

  handleSportTable(evt) {
    var index = this.state.sports.findIndex(t => {
      return (t.id == evt.target.id);
    });
    this.state.sports[index].name = evt.target.value;
    this.setState(this.state.sports);

    return;
  };

  render() {

    return (
        <div className="card">
          <div className="card-header">
            <span className="float-md-left font-weight-bold">Sports</span>
            <span>
              <SearchBar
                  filterText={this.state.filterText}
                  onUserInput={this.handleUserInput.bind(this)}/>
            </span>
            <span className="float-md-right">
            <Button bsStyle="success" onClick={this.reloadData.bind(this)}>Reload
              data</Button>
            </span>
          </div>
          <div className="card-body pre-scrollable">
            <SportTable
                onSportTableUpdate={this.handleSportTable.bind(this)}
                onRowAdd={this.handleAddEvent.bind(this)}
                onRowSave={this.handleRowSave.bind(this)}
                onRowUpdate={this.handleRowUpdate.bind(this)}
                onRowTeam={this.handleRowTeam.bind(this)}
                onRowAthlete={this.handleRowAthlete.bind(this)}
                onRowDel={this.handleRowDel.bind(this)}
                sports={this.state.sports}
                filterText={this.state.filterText}/>
          </div>
        </div>
    );

  }

}

class SearchBar extends React.Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }

  render() {
    return (
        <input type="text" placeholder="Search..."
               value={this.props.filterText} ref="filterTextInput"
               onChange={this.handleChange.bind(this)}/>
    );
  }

}

class SportTable extends React.Component {

  render() {
    var onSportTableUpdate = this.props.onSportTableUpdate;
    var rowDel = this.props.onRowDel;
    var rowSave = this.props.onRowSave;
    var rowUpdate = this.props.onRowUpdate;
    var rowTeam = this.props.onRowTeam;
    var rowAthlete = this.props.onRowAthlete;
    var filterText = this.props.filterText;
    var sport = this.props.sports.map(function (sport) {
      if (sport.name.indexOf(filterText) === -1) {
        return;
      }
      return (<SportRow onSportTableUpdate={onSportTableUpdate}
                        sport={sport} onDelEvent={rowDel.bind(this)}
                        onSaveEvent={rowSave.bind(this)}
                        onUpdateEvent={rowUpdate.bind(this)}
                        onTeamEvent={rowTeam.bind(this)}
                        onAthleteEvent={rowAthlete.bind(this)}
                        key={sport.id}/>)
    });
    return (
        <div>
          <table className="table table-bordered">
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>View</th>
              <th>
                <Button type="button" onClick={this.props.onRowAdd}
                        bsStyle="primary">Add</Button>
              </th>
            </tr>
            </thead>
            <tbody>
            {sport}
            </tbody>
          </table>
        </div>
    );

  }

}

class SportRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.sport);
  }

  onSaveEvent() {
    this.props.onSaveEvent(this.props.sport);
  }

  onUpdateEvent() {
    this.props.onUpdateEvent(this.props.sport);
  }

  onTeamEvent() {
    this.props.onTeamEvent(this.props.sport);
  }

  onAthleteEvent() {
    this.props.onAthleteEvent(this.props.sport);
  }

  render() {

    let button;

    if (this.props.sport.id) {
      button = <div>
        <Button onClick={this.onUpdateEvent.bind(this)} value="Update"
                bsStyle="warning">Update</Button>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <Button onClick={this.onDelEvent.bind(this)} value="Delete"
                bsStyle="danger">Delete</Button>
      </div>;
    }
    else {
      button = <Button onClick={this.onSaveEvent.bind(this)} value="Save"
                       bsStyle="success">Save</Button>;
    }

    return (
        <tr className="eachRow">
          <td>{this.props.sport.id}</td>
          <EditableCell onSportTableUpdate={this.props.onSportTableUpdate}
                        cellData={{
                          "type": "name",
                          value: this.props.sport.name,
                          id: this.props.sport.id
                        }}/>
          <td className="view-cell">
            <Button onClick={this.onAthleteEvent.bind(this)} value="Athletes"
                    bsStyle="primary">Athletes</Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button onClick={this.onTeamEvent.bind(this)} value="Teams"
                    bsStyle="primary">Teams</Button>
          </td>
          <td className="del-cell">
            {button}
          </td>
        </tr>
    );

  }

}

class EditableCell extends React.Component {

  render() {
    return (
        <td>
          <input type='text' name={this.props.cellData.type}
                 id={this.props.cellData.id} value={this.props.cellData.value}
                 onChange={this.props.onSportTableUpdate}/>
        </td>
    );

  }

}
