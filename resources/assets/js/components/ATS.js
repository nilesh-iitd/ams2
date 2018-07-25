import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class ATS extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.atss = [];
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
      axios.get('/api/ats?api_token=' + this.props.token)
          .then((res) => {
            this.setState({atss: res.data});
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };

  handleRowSport(ats) {
    if (ats.id && this.props.token) {
      axios.get('/api/ats/sa/' + ats.id + '?api_token=' + this.props.token)
          .then((res) => {
            var sportList = 'List of Sports by ATS : ' + ats.name + "\n\n";
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

  handleRowTeam(ats) {
    if (ats.id && this.props.token) {
      axios.get('/api/ats/ta/' + ats.id + '?api_token=' + this.props.token)
          .then((res) => {
            var teamList = 'List of Teams of ATS: ' + ats.name + "\n\n";
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

  handleRowSave(ats) {
    if (!this.props.token) {
      alert('Session expired! Please login again...');
      return;
    }
    if (ats.dop) {
      axios.post('/api/ats', {
        api_token: this.props.token,
        dop: ats.dop,
        aid: ats.aid,
        tid: ats.tid,
        sid: ats.sid
      }).then((res) => {
        var index = this.state.atss.indexOf(ats);
        this.state.atss.splice(index, 1);
        ats.id = res.data.id;
        this.state.atss.unshift(ats);
        this.setState(this.state.atss);
        alert('Play is successfully added!');
      }).catch((err) => {
        alert('Failed to Save: ' + err.status);
        console.log(err);
      });
    }
    else {
      alert('Please enter Date of Play');
    }
  };

  handleRowUpdate(ats) {
    if (!this.props.token) {
      alert('Session expired! Please login again...');
      return;
    }
    if (ats.id && ats.dop) {
      axios.put('/api/ats/' + ats.id, {
        api_token: this.props.token,
        dop: ats.dop,
        aid: ats.aid,
        tid: ats.tid,
        sid: ats.sid
      }).then((res) => {
        var index = this.state.atss.indexOf(ats);
        this.state.atss.splice(index, 1);
        ats.id = res.data.id;
        this.state.atss.unshift(ats);
        this.setState(this.state.atss);
        alert('Play record is successfully Updated!');
      }).catch((err) => {
        alert('Failed to Update: ' + err.status);
        console.log(err);
      });
    }
    else {
      alert('Invalid date of play found!');
    }
  };

  handleRowDel(ats) {
    if (!this.props.token) {
      alert('Session expired! Please login again...');
      return;
    }

    if (ats.id) {
      axios.delete('/api/ats/' + ats.id, {data: {api_token: this.props.token}})
          .then((res) => {
            var index = this.state.atss.indexOf(ats);
            this.state.atss.splice(index, 1);
            this.setState(this.state.atss);
            alert('Play is successfully deleted!');
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
    var ats = {
      id: null,
      dop: null,
      aid: null,
      tid: null,
      sid: null
    }
    this.state.atss.unshift(ats);
    this.setState(this.state.atss);
  }

  handleATSTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var atss = this.state.atss.slice();
    var newATSs = atss.map(function (ats) {
      for (var key in ats) {
        if (key == item.name && ats.id == item.id) {
          ats[key] = item.value;

        }
      }
      return ats;
    });
    this.setState({atss: newATSs});
  };

  render() {

    return (
        <div className="card">
          <div className="card-header">
            <span className="float-md-left font-weight-bold">Plays</span>
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
            <ATSTable
                onATSTableUpdate={this.handleATSTable.bind(this)}
                onRowAdd={this.handleAddEvent.bind(this)}
                onRowSave={this.handleRowSave.bind(this)}
                onRowUpdate={this.handleRowUpdate.bind(this)}
                onRowSport={this.handleRowSport.bind(this)}
                onRowTeam={this.handleRowTeam.bind(this)}
                onRowDel={this.handleRowDel.bind(this)}
                atss={this.state.atss}
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
        <input type="text" placeholder="Search Date..."
               value={this.props.filterText} ref="filterTextInput"
               onChange={this.handleChange.bind(this)}/>
    );
  }

}

class ATSTable extends React.Component {

  render() {
    var onATSTableUpdate = this.props.onATSTableUpdate;
    var rowDel = this.props.onRowDel;
    var rowSave = this.props.onRowSave;
    var rowUpdate = this.props.onRowUpdate;
    var rowSport = this.props.onRowSport;
    var rowTeam = this.props.onRowTeam;
    var filterText = this.props.filterText;
    var ats = this.props.atss.map(function (ats) {
      if (ats.dop.indexOf(filterText) === -1) {
        return;
      }
      return (<ATSRow onATSTableUpdate={onATSTableUpdate}
                      ats={ats} onDelEvent={rowDel.bind(this)}
                      onSaveEvent={rowSave.bind(this)}
                      onUpdateEvent={rowUpdate.bind(this)}
                      onSportEvent={rowSport.bind(this)}
                      onTeamEvent={rowTeam.bind(this)}
                      key={ats.id}/>)
    });
    return (
        <div>
          <table className="table table-bordered">
            <thead>
            <tr>
              <th>ID</th>
              <th>Date of Play</th>
              <th>Athlete ID</th>
              <th>Team ID</th>
              <th>Sport ID</th>
              <th>
                <Button type="button" onClick={this.props.onRowAdd}
                        bsStyle="primary">Add</Button>
              </th>
            </tr>
            </thead>
            <tbody>
            {ats}
            </tbody>
          </table>
        </div>
    );

  }

}

class ATSRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.ats);
  }

  onSaveEvent() {
    this.props.onSaveEvent(this.props.ats);
  }

  onUpdateEvent() {
    this.props.onUpdateEvent(this.props.ats);
  }

  onSportEvent() {
    this.props.onSportEvent(this.props.ats);
  }

  onTeamEvent() {
    this.props.onTeamEvent(this.props.ats);
  }

  render() {

    let button;

    if (this.props.ats.id) {
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
          <td>{this.props.ats.id}</td>
          <EditableCell onATSTableUpdate={this.props.onATSTableUpdate}
                        cellData={{
                          control: "date",
                          type: "dop",
                          value: this.props.ats.dop,
                          id: this.props.ats.id,
                          style: {width: "5%"}
                        }}/>
          <EditableCell onATSTableUpdate={this.props.onATSTableUpdate}
                        cellData={{
                          control: "numeric",
                          type: "aid",
                          value: this.props.ats.aid,
                          id: this.props.ats.id,
                          style: {width: "5%"}
                        }}/>
          <EditableCell onATSTableUpdate={this.props.onATSTableUpdate}
                        cellData={{
                          control: "numeric",
                          type: "tid",
                          value: this.props.ats.tid,
                          id: this.props.ats.id,
                          style: {width: "5%"}
                        }}/>
          <EditableCell onATSTableUpdate={this.props.onATSTableUpdate}
                        cellData={{
                          control: "numeric",
                          type: "sid",
                          value: this.props.ats.sid,
                          id: this.props.ats.id,
                          style: {width: "5%"}
                        }}/>
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
                 onChange={this.props.onATSTableUpdate}
          />
        </td>
    );

  }

}
