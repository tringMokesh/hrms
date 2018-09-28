import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import "./SideNav.css";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navFlag: "",
      employeeVisibility: ""
    };
    this.navigation = this.navigation.bind(this);
  }

  componentWillMount() {
    var visibilityVar = JSON.parse(localStorage.getItem("currentUserRole"));
    visibilityVar === "Employee" &&
      this.setState({
        employeeVisibility: (this.state.employeeVisibility = "employeeCss")
      });

    // componentWillMount(){
    //   var visibilityVar= JSON.parse(localStorage.getItem('currentUserRole'));
    //   (visibilityVar==='Employee')&&
    //   this.setState({ employeeVisibility: this.state.employeeVisibility='employeeCss'})

    //   }
  }
  // constructor(props){
  //   super(props)
  //   this.state={
  //   navFlag:'',
  //   employeeVisibility : ''

  //  }
  //  this.navigation=this.navigation.bind(this)
  // }

  navigation(e, link) {
    this.setState({ navFlag: (this.state.navFlag = link) });
    console.log(this.state.navFlag);
    console.log("navigation");
  }

  render() {
    if (this.state.navFlag != "") {
      return <Redirect to={this.state.navFlag} />;
    }
    return (
      <div className="sidenav">
        <button>Home</button>
        <button>Leave</button>
        <button>Leave Request</button>
        {/* <Link to="/leaverequests"><button className="link">Leave Approval</button></Link> */}
        <button onClick={e => this.navigation(e, "/leaverequests")}>
          Leave Approval
        </button>
        <Link to="/leaverequest">
          <button>Leave Request</button>
        </Link>
        <button>My Leave</button>
        <button className={this.state.employeeVisibility}>Leave Records</button>
        <button onClick={this.props.onSubmit} id="LeavePolicy">
          Leave Policy
        </button>
        <button className={this.state.employeeVisibility}>Leave plan</button>
      </div>
    );
  }
}

export default SideNav;
