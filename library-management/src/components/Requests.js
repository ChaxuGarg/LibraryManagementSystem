import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "../axios.js";

class requestList extends Component {
  constructor() {
    super();
    this.state = {
      requests: [],
    };
  }

  
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) this.props.history.push("/login");
    if (this.props.auth.user.accessLevel !== "user")
      this.props.history.push("/dashboard");

    const data = {
        username: this.props.auth.user.username,
    }
    axios.post("/api/requests/list", data).then((res) => {
      this.setState({
        requests: res.data.requestList,
      });
    });
  }

  render() {
    const { requests } = this.state;

    return (
      <div className="userList">
        <h1>List of Requests</h1>
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
                <b>Book Requested</b>
              </td>
              <td>
                <b>Due</b>
              </td>
              <td>
                <b>Status</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              if (request.status === "Accepted") {
                return (
                  <tr key={request.username + request.ISBN}>
                    <td>ISBN:
                      {request.ISBN}
                      <Link to={`/book/${request.ISBN}`}>
                        <button>View Book Details</button>
                      </Link>
                    </td>
                    <td>{request.due}</td>
                    <td>
                      Accepted
                    </td>
                  </tr>
                );
              }
            })}
            {requests.map((request) => {
              if (request.status === "Renew") {
                return (
                  <tr key={request.username + request.ISBN}>
                    <td>ISBN:
                      {request.ISBN}
                      <Link to={`/book/${request.ISBN}`}>
                        <button>View Book Details</button>
                      </Link>
                    </td>
                    <td>{request.due}</td>
                    <td>
                      Pending for Renew
                    </td>
                  </tr>
                );
              }
            })}
            {requests.map((request) => {
              if (request.status === "Pending") {
                return (
                  <tr key={request.username + request.ISBN}>
                    <td>ISBN:
                      {request.ISBN}
                      <Link to={`/book/${request.ISBN}`}>
                        <button>View Book Details</button>
                      </Link>
                    </td>
                    <td>{request.due}</td>
                    <td>Pending</td>
                  </tr>
                );
              }
            })}
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

requestList.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(requestList));
