import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions.js";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="Register">
        <h1>Login</h1>
        <form noValidate onSubmit={this.onSubmit}>
          <label htmlFor="username">Username</label>
          <span style={{ color: "red" }}>
            {errors.username}
            {errors.usernamenotfound}
          </span>
          <input
            onChange={this.onChange}
            value={this.state.username}
            error={errors.username}
            id="username"
            type="text"
            className={classnames("", {
              invalid: errors.username || errors.usernamenotfound,
            })}
          />
          <label htmlFor="password">Password</label>
          <span style={{ color: "red" }}>
            {errors.password}
            {errors.passwordincorrect}
          </span>
          <input
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            id="password"
            type="password"
            className={classnames("", {
              invalid: errors.password || errors.passwordincorrect,
            })}
          />
          <div style={{ margin: "10vh 30vw" }}>
            <button
              type="submit"
              style={{ width: "40vw", height: "50px", borderRadius: "3px" }}
            >
              Login
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            <Link to="/">
              <h6>Back to Home</h6>
            </Link>
            <Link to="/register">
              <h6>Dont Have an account? Register</h6>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
