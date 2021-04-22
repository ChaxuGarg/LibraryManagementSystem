import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { addNewBook } from "../../actions/bookActions.js";

class addNew extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      publisher: "",
      genre: "",
      summary: "",
      ISBN: "",
      location: "",
      availableCopies: "",
      errors: {},
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) this.props.history.push("/login");
    if (this.props.auth.user.accessLevel === "user") this.props.history.push("/dashboard");
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

    const bookData = {
      title: this.state.title,
      author: this.state.author,
      publisher: this.state.publisher,
      genre: this.state.genre,
      summary: this.state.summary,
      ISBN: this.state.ISBN,
      location: this.state.location,
      availableCopies: this.state.availableCopies,
    };

    this.props.addNewBook(bookData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="addNew">
        <h1>Add New Book</h1>
        <form noValidate onSubmit={this.onSubmit}>
          <label htmlFor="title">Title (Required)</label>
          <span style={{ color: "red" }}>{errors.title}</span>
          <input
            onChange={this.onChange}
            value={this.state.title}
            error={errors.title}
            id="title"
            type="text"
            className={classnames("", {
              invalid: errors.title,
            })}
          />
          <label htmlFor="author">Author</label>
          <input
            onChange={this.onChange}
            value={this.state.author}
            id="author"
            type="text"
            className={classnames("")}
          />
          <label htmlFor="publisher">Publisher</label>
          <input
            onChange={this.onChange}
            value={this.state.publisher}
            id="publisher"
            type="text"
            className={classnames("")}
          />
          <label htmlFor="genre">Genre</label>
          <input
            onChange={this.onChange}
            value={this.state.genre}
            id="genre"
            type="text"
            className={classnames("")}
          />
          <label htmlFor="summary">Summary</label>
          <input
            onChange={this.onChange}
            value={this.state.summary}
            id="summary"
            type="text"
            className={classnames("")}
          />
          <label htmlFor="ISBN">ISBN (Required)</label>
          <span style={{ color: "red" }}>{errors.ISBN}</span>
          <input
            onChange={this.onChange}
            value={this.state.ISBN}
            error={errors.ISBN}
            id="ISBN"
            type="text"
            className={classnames("", {
              invalid: errors.ISBN,
            })}
          />
          <label htmlFor="location">Location</label>
          <input
            onChange={this.onChange}
            value={this.state.location}
            id="location"
            type="text"
            className={classnames("")}
          />
          <label htmlFor="availableCopies">
            No. of copies available (Required)
          </label>
          <span style={{ color: "red" }}>{errors.availableCopies}</span>
          <input
            onChange={this.onChange}
            value={this.state.availableCopies}
            error={errors.availableCopies}
            id="availableCopies"
            type="number"
            className={classnames("", {
              invalid: errors.availableCopies,
            })}
          />
          <div style={{ margin: "10vh 30vw" }}>
            <button
              type="submit"
              style={{ width: "40vw", height: "50px", borderRadius: "3px" }}
            >
              Add Book
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            <Link to="/dashboard">
              <h6>Back to Dashboard</h6>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

addNew.propTypes = {
  addNewBook: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { addNewBook })(withRouter(addNew));
