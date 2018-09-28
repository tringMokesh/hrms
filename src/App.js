import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard';
import LeaveIndex from './components/LeaveApproval/leaveIndex';
import LeaveReq from './components/Leave/LeaveRequest/index';
import LeaveRecordIndex from './components/LeaveRecord/LeaveRecordIndex'

class App extends Component {

  render() {
    return (
      <div>
  <Router>
      <div>
        <Switch>
        <Route exact strict path="/" component={Login} />
        <Route exact strict path="/dashboard" component={Dashboard} />
        <Route exact strict path="/leaverequests" component={LeaveIndex} />
        <Route exact strict path="/dashboard" component = {Dashboard} />
        <Route exact strict path = "/leaverequest" component = {LeaveReq}/>
        <Route exact strict path ="/leaveRecords" component={LeaveRecordIndex} />
        </Switch>
      </div>
  </Router>
 </div>
    );
  }
}

export default App;
