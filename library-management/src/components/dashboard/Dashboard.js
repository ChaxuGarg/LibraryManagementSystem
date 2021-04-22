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

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) this.props.history.push("/login");
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="Dashboard">
        <h4>Hey There, {user.name.split(" ")[0]}</h4>
        {(user.accessLevel === "librarian" || user.accessLevel === "admin") && (
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
