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

  acceptRequest = (e, username, ISBN) => {
    e.preventDefault();
    const data = {
      username: username,
      ISBN: ISBN,
    };

    axios.patch("/api/requests/accept", data);
    window.location.reload(false);
  };

  rejectRequest = (e, username, ISBN) => {
    e.preventDefault();
    const data = {
      username: username,
      ISBN: ISBN,
    };

    axios.patch("/api/requests/reject", data);
    window.location.reload(false);
  };

  renewRequest = (e, username, ISBN, newDue) => {
    e.preventDefault();
    const data = {
      username: username,
      ISBN: ISBN,
      newDue: newDue,
    };

    axios.patch("/api/requests/renew", data);
    window.location.reload(false);
  };

  declineRequest = (e, username, ISBN) => {
    e.preventDefault();
    const data = {
      username: username,
      ISBN: ISBN,
    };

    axios.patch("/api/requests/decline", data);
    window.location.reload(false);
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) this.props.history.push("/login");
    if (this.props.auth.user.accessLevel === "user")
      this.props.history.push("/dashboard");
    axios.get("/api/requests/listall").then((res) => {
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
                <b>Username</b>
              </td>
              <td>
                <b>Book Requested</b>
              </td>
              <td>
                <b>Due</b>
              </td>
              <td>
                <b>Request</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              if (request.status === "Pending") {
                return (
                  <tr key={request.username + request.ISBN}>
                    <td>{request.username}</td>
                    <td>ISBN:
                      {request.ISBN}
                      <Link to={`/book/${request.ISBN}`}>
                        <button>View Book Details</button>
                      </Link>
                    </td>
                    <td>{request.due}</td>
                    <td>
                      <Link to="/requestlistall">
                        {request.status === "Pending" && (
                          <button
                            onClick={(e) => {
                              this.acceptRequest(
                                e,
                                request.username,
                                request.ISBN
                              );
                            }}
                          >
                            Accept
                          </button>
                        )}
                        {request.status === "Pending" && (
                          <button
                            onClick={(e) => {
                              this.rejectRequest(
                                e,
                                request.username,
                                request.ISBN
                              );
                            }}
                          >
                            Reject
                          </button>
                        )}
                      </Link>
                    </td>
                  </tr>
                );
              }
            })}
            {requests.map((request) => {
              if (request.status === "Renew") {
                return (
                  <tr key={request.username + request.ISBN}>
                    <td>{request.username}</td>
                    <td>ISBN:
                      {request.ISBN}
                      <Link to={`/book/${request.ISBN}`}>
                        <button>View Book Details</button>
                      </Link>
                    </td>
                    <td>{request.newDue}</td>
                    <td>
                      <Link to="/requestlistall">
                        <button
                          onClick={(e) => {
                            this.renewRequest(
                              e,
                              request.username,
                              request.ISBN,
                              request.newDue
                            );
                          }}
                        >
                          Renew
                        </button>
                        <button
                          onClick={(e) => {
                            this.declineRequest(
                              e,
                              request.username,
                              request.ISBN
                            );
                          }}
                        >
                          Decline
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              }
            })}
            {requests.map((request) => {
              if (request.status === "Accepted") {
                return (
                  <tr key={request.username + request.ISBN}>
                    <td>{request.username}</td>
                    <td>ISBN:
                      {request.ISBN}
                      <Link to={`/book/${request.ISBN}`}>
                        <button>View Book Details</button>
                      </Link>
                    </td>
                    <td>{request.due}</td>
                    <td>{request.status}</td>
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
