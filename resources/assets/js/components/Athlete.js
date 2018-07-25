import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class Athlete extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.athletes = [];
  }

  componentWillReceiveProps(newProps) {
    this.props = newProps;
    this.reloadData();
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData() {
    if (this.props.token) {
      axios.get('/api/athletes?api_token=' + this.props.token)
          .then((res) => {
            this.setState({athletes: res.data});
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };

  handleRowSport(athlete) {
    if (athlete.id && this.props.token) {
      axios.get('/api/ats/sa/' + athlete.id + '?api_token=' + this.props.token)
          .then((res) => {
            var sportList = 'List of Sports by Athlete : ' + athlete.name + "\n\n";
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

  handleRowTeam(athlete) {
    if (athlete.id && this.props.token) {
      axios.get('/api/ats/ta/' + athlete.id + '?api_token=' + this.props.token)
          .then((res) => {
            var teamList = 'List of Teams of Athlete: ' + athlete.name + "\n\n";
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

  handleRowSave(athlete) {
    if (!this.props.token) {
      alert('Session expired! Please login again...');
      return;
    }
    if (athlete.name) {
      axios.post('/api/athletes', {
        api_token: this.props.token,
        name: athlete.name,
        dob: athlete.dob,
        age: athlete.age,
        height: athlete.height,
        weight: athlete.weight
      })
          .then((res) => {
            var index = this.state.athletes.indexOf(athlete);
            this.state.athletes.splice(index, 1);
            athlete.id = res.data.id;
            this.state.athletes.unshift(athlete);
            this.setState(this.state.athletes);
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

  handleRowUpdate(athlete) {
    if (!this.props.token) {
      alert('Session expired! Please login again...');
      return;
    }
    if (athlete.id && athlete.name) {
      axios.put('/api/athletes/' + athlete.id, {
        api_token: this.props.token,
        name: athlete.name,
        dob: athlete.dob,
        age: athlete.age,
        height: athlete.height,
        weight: athlete.weight
      }).then((res) => {
        var index = this.state.athletes.indexOf(athlete);
        this.state.athletes.splice(index, 1);
        athlete.id = res.data.id;
        this.state.athletes.unshift(athlete);
        this.setState(this.state.athletes);
        alert('Athlete record is successfully Updated!');
      }).catch((err) => {
        alert('Failed to Update: ' + err.status);
        console.log(err);
      });
    }
    else {
      alert('Invalid id and name found!');
    }
  };

  handleRowDel(athlete) {
    if (!this.props.token) {
      alert('Session expired! Please login again...');
      return;
    }

    if (athlete.id) {
      axios.delete('/api/athletes/' + athlete.id, {data: {api_token: this.props.token}})
          .then((res) => {
            var index = this.state.athletes.indexOf(athlete);
            this.state.athletes.splice(index, 1);
            this.setState(this.state.athletes);
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
    var athlete = {
      id: 0,
      name: "",
      dob: "",
      age: 0,
      height: 0,
      weight: 0
    }
    this.state.athletes.unshift(athlete);
    this.setState(this.state.athletes);
  }

  handleAthleteTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var athletes = this.state.athletes.slice();
    var newAthletes = athletes.map(function (athlete) {
      for (var key in athlete) {
        if (key == item.name && athlete.id == item.id) {
          athlete[key] = item.value;

        }
      }
      return athlete;
    });
    this.setState({athletes: newAthletes});
  };

  render() {

    return (
        <div className="card">
          <div className="card-header">
            <span className="float-md-left font-weight-bold">Athletes</span>
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
            <AthleteTable
                onAthleteTableUpdate={this.handleAthleteTable.bind(this)}
                onRowAdd={this.handleAddEvent.bind(this)}
                onRowSave={this.handleRowSave.bind(this)}
                onRowUpdate={this.handleRowUpdate.bind(this)}
                onRowSport={this.handleRowSport.bind(this)}
                onRowTeam={this.handleRowTeam.bind(this)}
                onRowDel={this.handleRowDel.bind(this)}
                athletes={this.state.athletes}
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

class AthleteTable extends React.Component {

  render() {
    var onAthleteTableUpdate = this.props.onAthleteTableUpdate;
    var rowDel = this.props.onRowDel;
    var rowSave = this.props.onRowSave;
    var rowUpdate = this.props.onRowUpdate;
    var rowSport = this.props.onRowSport;
    var rowTeam = this.props.onRowTeam;
    var filterText = this.props.filterText;
    var athlete = this.props.athletes.map(function (athlete) {
      if (athlete.name.indexOf(filterText) === -1) {
        return;
      }
      return (<AthleteRow onAthleteTableUpdate={onAthleteTableUpdate}
                          athlete={athlete} onDelEvent={rowDel.bind(this)}
                          onSaveEvent={rowSave.bind(this)}
                          onUpdateEvent={rowUpdate.bind(this)}
                          onSportEvent={rowSport.bind(this)}
                          onTeamEvent={rowTeam.bind(this)}
                          key={athlete.id}/>)
    });
    return (
        <div>
          <table className="table table-bordered">
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Age</th>
              <th>Height</th>
              <th>Weight</th>
              <th>View</th>
              <th>
                <Button type="button" onClick={this.props.onRowAdd}
                        bsStyle="primary">Add</Button>
              </th>
            </tr>
            </thead>
            <tbody>
            {athlete}
            </tbody>
          </table>
        </div>
    );

  }

}

class AthleteRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.athlete);
  }

  onSaveEvent() {
    this.props.onSaveEvent(this.props.athlete);
  }

  onUpdateEvent() {
    this.props.onUpdateEvent(this.props.athlete);
  }

  onSportEvent() {
    this.props.onSportEvent(this.props.athlete);
  }

  onTeamEvent() {
    this.props.onTeamEvent(this.props.athlete);
  }

  render() {

    let button;

    if (this.props.athlete.id) {
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
          <td>{this.props.athlete.id}</td>
          <EditableCell onAthleteTableUpdate={this.props.onAthleteTableUpdate}
                        cellData={{
                          control: "text",
                          type: "name",
                          value: this.props.athlete.name,
                          id: this.props.athlete.id,
                          style: {width:"15%"}
                        }}/>
          <EditableCell onAthleteTableUpdate={this.props.onAthleteTableUpdate}
                        cellData={{
                          control: "date",
                          type: "dob",
                          value: this.props.athlete.dob,
                          id: this.props.athlete.id,
                          style: {width:"5%"}
                        }}/>
          <EditableCell onAthleteTableUpdate={this.props.onAthleteTableUpdate}
                        cellData={{
                          control: "numeric",
                          type: "age",
                          value: this.props.athlete.age,
                          id: this.props.athlete.id,
                          style: {width:"5%"}
                        }}/>
          <EditableCell onAthleteTableUpdate={this.props.onAthleteTableUpdate}
                        cellData={{
                          control: "numeric",
                          type: "height",
                          value: this.props.athlete.height,
                          id: this.props.athlete.id,
                          style: {width:"5%"}
                        }}/>
          <EditableCell onAthleteTableUpdate={this.props.onAthleteTableUpdate}
                        cellData={{
                          control: "numeric",
                          type: "weight",
                          value: this.props.athlete.weight,
                          id: this.props.athlete.id,
                          style: {width:"5%"}
                        }}/>
          <td className="view-cell">
            <Button onClick={this.onTeamEvent.bind(this)} value="Teams"
                    bsStyle="primary">Teams</Button>
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
          <input type={this.props.cellData.control}
                 name={this.props.cellData.type}
                 id={this.props.cellData.id} value={this.props.cellData.value}
                 onChange={this.props.onAthleteTableUpdate}
          />
        </td>
    );

  }

}
