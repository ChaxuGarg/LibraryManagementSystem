import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions.js";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  addNewBook = (e) => {
    e.preventDefault();
    this.props.history.push("/addnewbook");
  };

  viewUserList = (e) => {
    e.preventDefault();
    this.props.history.push("/userlist");
  };

  viewBooks = (e) => {
    e.preventDefault();
    this.props.history.push("/books");
  };

  viewRequestsList = (e) => {
    e.preventDefault();
    this.props.history.push("/requestlistall");
  };

  viewRequests = (e) => {
    e.preventDefault();
    this.props.history.push("/requestlist");
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) this.props.history.push("/login");
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="Dashboard">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Hey There, {user.name.split(" ")[0]}</h1>
          <h4>You are a registered {user.accessLevel}</h4>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            onClick={this.viewBooks}
          >
            View Books
          </button>
          {(user.accessLevel === "librarian" ||
            user.accessLevel === "admin") && (
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.addNewBook}
            >
              Add New Book
            </button>
          )}
          {user.accessLevel === "admin" && (
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.viewUserList}
            >
              View Users List
            </button>
          )}
          {user.accessLevel === "user" && (
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.viewRequests}
            >
              View My Requests
            </button>
          )}
          {(user.accessLevel === "librarian" ||
            user.accessLevel === "admin") && (
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.viewRequestsList}
            >
              View Requests
            </button>
          )}
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            onClick={this.onLogoutClick}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
