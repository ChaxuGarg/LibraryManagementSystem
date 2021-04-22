import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions.js";
import { connect } from "react-redux";
import classNames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="Register">
        <h1>Register Below</h1>
        <form noValidate onSubmit={this.onSubmit}>
          <label htmlFor="name">Name</label>
          <span style={{ color: "red" }}>{errors.name}</span>
          <input
            onChange={this.onChange}
            value={this.state.name}
            error={errors.name}
            id="name"
            type="text"
            className={classNames("", {
              invalid: errors.name,
            })}
          />
          <label htmlFor="email">Email</label>
          <span style={{ color: "red" }}>{errors.email}</span>
          <input
            onChange={this.onChange}
            value={this.state.email}
            error={errors.email}
            id="email"
            type="email"
            className={classNames("", {
              invalid: errors.email,
            })}
          />
          <label htmlFor="username">Username</label>
          <span style={{ color: "red" }}>{errors.username}</span>
          <input
            onChange={this.onChange}
            value={this.state.username}
            error={errors.username}
            id="username"
            type="text"
            className={classNames("", {
              invalid: errors.username,
            })}
          />
          <label htmlFor="password">Password</label>
          <span style={{ color: "red" }}>{errors.password}</span>
          <input
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            id="password"
            type="password"
            className={classNames("", {
              invalid: errors.password,
            })}
          />
          <label htmlFor="password2">Confirm Password</label>
          <span style={{ color: "red" }}>{errors.password2}</span>
          <input
            onChange={this.onChange}
            value={this.state.password2}
            error={errors.name}
            id="password2"
            type="password"
            className={classNames("", {
              invalid: errors.password2,
            })}
          />
          <div style={{ margin: "10vh 30vw" }}>
            <button
              type="submit"
              style={{ width: "40vw", height: "50px", borderRadius: "3px" }}
            >
              Register
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            <Link to="/">
              <h6>Back to Home</h6>
            </Link>
            <Link to="/login">
              <h6>Already have an account? Login</h6>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
