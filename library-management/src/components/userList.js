import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "../axios.js";

class userList extends Component {
  constructor() {
    super();
    this.state = {
      accounts: [],
    };
  }

  changeAccess = (e, username, accessLevel) => {
    e.preventDefault();
    const data = {
      username: username,
      accessLevel: accessLevel,
    };

    axios.patch("/api/users/changeaccess", data);
    window.location.reload(false);
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) this.props.history.push("/login");
    if (this.props.auth.user.accessLevel !== "admin")
      this.props.history.push("/dashboard");
    axios.get("/api/users/list").then((res) => {
      this.setState({
        accounts: res.data.accountList,
      });
    });
  }

  render() {
    const { accounts } = this.state;

    return (
      <div className="userList">
        <h1>List of Users</h1>
        <table
          style={{
            fontFamily: "arial, sans-serif",
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr key="header">
              <td>
                <b>Name</b>
              </td>
              <td>
                <b>Username</b>
              </td>
              <td>
                <b>Email</b>
              </td>
              <td>
                <b>Access</b>
              </td>
              <td>
                <b>Change Access</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.username}>
                <td>{account.name}</td>
                <td>{account.username}</td>
                <td>{account.email}</td>
                <td>{account.accessLevel}</td>
                <td>
                  <Link to="/userlist">
                    {account.accessLevel === "user" && (
                      <button
                        onClick={(e) => {
                          this.changeAccess(
                            e,
                            account.username,
                            account.accessLevel
                          );
                        }}
                      >
                        Make librarian
                      </button>
                    )}
                    {account.accessLevel === "librarian" && (
                      <button
                        onClick={(e) => {
                          this.changeAccess(
                            e,
                            account.username,
                            account.accessLevel
                          );
                        }}
                      >
                        Revoke as librarian
                      </button>
                    )}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: "center" }}>
          <Link to="/dashboard">
            <h6>Back to Dashboard</h6>
          </Link>
        </div>
      </div>
    );
  }
}

userList.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(userList));
