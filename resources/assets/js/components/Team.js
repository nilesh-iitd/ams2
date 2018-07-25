import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class Team extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.teams = [];
  }

  componentWillReceiveProps(newProps) {
    this.props = newProps;
    if (this.props.token) {
      axios.get('/api/teams?api_token=' + this.props.token)
          .then((res) => {
            this.setState({teams: res.data});
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  reloadData() {
    if (this.props.token) {
      axios.get('/api/teams?api_token=' + this.props.token)
          .then((res) => {
            this.setState({teams: res.data});
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };

  handleRowSport(team) {
    if (team.id && this.props.token) {
      axios.get('/api/ats/st/' + team.id + '?api_token=' + this.props.token)
          .then((res) => {
            var sportList = 'List of Sports of Team : ' + team.name + "\n\n";
            res.data.forEach(t => {
              sportList += t.name + ', '
            });
            alert(sportList);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  handleRowAthlete(team) {
    if (team.id && this.props.token) {
      axios.get('/api/ats/at/' + team.id + '?api_token=' + this.props.token)
          .then((res) => {
            var athleteList = 'List of Athletes for Team: ' + team.name + "\n\n";
            res.data.forEach(t => {
              athleteList += t.name + ', '
            });
            alert(athleteList);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  handleRowSave(team) {
    if (!this.props.token) {
      alert('Session expired! Please login again...');
      return;
    }
    if (team.name) {
      axios.post('/api/teams', {
        api_token: this.props.token,
        name: team.name,
        logo: team.logo
      })
          .then((res) => {
            var index = this.state.teams.indexOf(team);
            this.state.teams.splice(index, 1);
            team.id = res.data.id;
            this.state.teams.unshift(team);
            this.setState(this.state.teams);
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

  handleRowUpdate(team) {
    if (!this.props.token) {
      alert('Session expired! Please login again...');
      return;
    }
    if (team.id && team.name) {
      axios.put('/api/teams/' + team.id, {
        api_token: this.props.token,
        name: team.name,
        logo: team.logo
      })
          .then((res) => {
            var index = this.state.teams.indexOf(team);
            this.state.teams.splice(index, 1);
            team.id = res.data.id;
            this.state.teams.unshift(team);
            this.setState(this.state.teams);
            alert('Team record is successfully Updated!');
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

  handleRowDel(team) {
    if (!this.props.token) {
      alert('Session expired! Please login again...');
      return;
    }

    if (team.id) {
      axios.delete('/api/teams/' + team.id, {data: {api_token: this.props.token}})
          .then((res) => {
            var index = this.state.teams.indexOf(team);
            this.state.teams.splice(index, 1);
            this.setState(this.state.teams);
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
    var team = {
      id: 0,
      name: "",
      logo: ""
    }
    this.state.teams.unshift(team);
    this.setState(this.state.teams);
  }

  handleTeamTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var teams = this.state.teams.slice();
    var newTeams = teams.map(function (team) {
      for (var key in team) {
        if (key == item.name && team.id == item.id) {
          team[key] = item.value;

        }
      }
      return team;
    });
    this.setState({teams: newTeams});
  };

  render() {

    return (
        <div className="card">
          <div className="card-header">
            <span className="float-md-left font-weight-bold">Teams</span>
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
            <TeamTable
                onTeamTableUpdate={this.handleTeamTable.bind(this)}
                onRowAdd={this.handleAddEvent.bind(this)}
                onRowSave={this.handleRowSave.bind(this)}
                onRowUpdate={this.handleRowUpdate.bind(this)}
                onRowSport={this.handleRowSport.bind(this)}
                onRowAthlete={this.handleRowAthlete.bind(this)}
                onRowDel={this.handleRowDel.bind(this)}
                teams={this.state.teams}
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
        <input type="text" placeholder="Search Name..."
               value={this.props.filterText} ref="filterTextInput"
               onChange={this.handleChange.bind(this)}/>
    );
  }

}

class TeamTable extends React.Component {

  render() {
    var onTeamTableUpdate = this.props.onTeamTableUpdate;
    var rowDel = this.props.onRowDel;
    var rowSave = this.props.onRowSave;
    var rowUpdate = this.props.onRowUpdate;
    var rowSport = this.props.onRowSport;
    var rowAthlete = this.props.onRowAthlete;
    var filterText = this.props.filterText;
    var team = this.props.teams.map(function (team) {
      if (team.name.indexOf(filterText) === -1) {
        return;
      }
      return (<TeamRow onTeamTableUpdate={onTeamTableUpdate}
                       team={team} onDelEvent={rowDel.bind(this)}
                       onSaveEvent={rowSave.bind(this)}
                       onUpdateEvent={rowUpdate.bind(this)}
                       onSportEvent={rowSport.bind(this)}
                       onAthleteEvent={rowAthlete.bind(this)}
                       key={team.id}/>)
    });
    return (
        <div>
          <table className="table table-bordered">
            <thead>
            <tr>
              <th>Name</th>
              <th>Logo</th>
              <th>View</th>
              <th>
                <Button type="button" onClick={this.props.onRowAdd}
                        bsStyle="primary">Add</Button>
              </th>
            </tr>
            </thead>
            <tbody>
            {team}
            </tbody>
          </table>
        </div>
    );

  }

}

class TeamRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.team);
  }

  onSaveEvent() {
    this.props.onSaveEvent(this.props.team);
  }

  onUpdateEvent() {
    this.props.onUpdateEvent(this.props.team);
  }

  onSportEvent() {
    this.props.onSportEvent(this.props.team);
  }

  onAthleteEvent() {
    this.props.onAthleteEvent(this.props.team);
  }

  render() {

    let button;

    if (this.props.team.id) {
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
          <EditableCell onTeamTableUpdate={this.props.onTeamTableUpdate}
                        cellData={{
                          "type": "name",
                          value: this.props.team.name,
                          id: this.props.team.id
                        }}/>
          <EditableCell onTeamTableUpdate={this.props.onTeamTableUpdate}
                        cellData={{
                          "type": "logo",
                          value: this.props.team.logo,
                          id: this.props.team.id
                        }}/>
          <td className="view-cell">
            <Button onClick={this.onAthleteEvent.bind(this)} value="Athletes"
                    bsStyle="primary">Athletes</Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button onClick={this.onSportEvent.bind(this)} value="Sports"
                    bsStyle="primary">Sports</Button>
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
                 onChange={this.props.onTeamTableUpdate}/>
        </td>
    );

  }

}
