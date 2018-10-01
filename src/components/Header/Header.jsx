import React, { Component } from "react";
import "./Header.css";
import { Redirect } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logOut: false,
      navflag: ""
    };
    this.logOutFunction = this.logOutFunction.bind(this);
  }
  componentWillMount() {
    var visibilityVar = JSON.parse(localStorage.getItem("currentUserRole"));
  }

  logOutFunction() {
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUserName");
    localStorage.removeItem("currentUserRole");
    this.setState({ logOut: (this.state.logOut = true) });
  }

  navigation(e, link) {
    console.log(window.location.pathname, link);
    if (window.location.pathname !== link) {
      console.log("if condition executed");
      this.setState({ navflag: link });
      this.setState({ navFlag: (this.state.navFlag = link) });
    }
    console.log("navigation");
  }

  render() {
    if (this.state.navflag != "") {
      return <Redirect to={this.state.navflag} />;
    }
    if (this.state.logOut) {
      return <Redirect to="/" />;
    }
    var userName = JSON.parse(localStorage.getItem("currentUserName"));
    return (
      <div id="header">
        <div className="logo">tringapps</div>
        <div className="profile-main-outer">
          <div className="profile-outer">
            <div className="profile-img">
              <button onClick={e => this.navigation(e, "/profileIndex")}>
                <img src={require("../../Assets/images/profile_icon.png")} />
              </button>
            </div>
            <div className="profile-name">{userName}</div>
          </div>
          <div className="dropdown-content">
            <span onClick={this.logOutFunction}>Logout</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
