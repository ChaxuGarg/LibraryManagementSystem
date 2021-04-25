import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import axios from "../../axios.js";

class editBook extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      publisher: "",
      genre: "",
      summary: "",
      ISBN: "",
      oldISBN: "",
      location: "",
      availableCopies: "",
      errors: {},
      edited: false,
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) this.props.history.push("/login");
    if (this.props.auth.user.accessLevel === "user")
      this.props.history.push("/dashboard");

    const data = {
      id: this.props.match.params.id,
    };

    axios.post("/api/books/book", data).then((res) => {
      this.setState({
        title: res.data.book.title,
        author: res.data.book.author,
        publisher: res.data.book.publisher,
        genre: res.data.book.genre,
        summary: res.data.book.summary,
        ISBN: res.data.book.ISBN,
        location: res.data.book.location,
        availableCopies: res.data.book.availableCopies,
        oldISBN: res.data.book.ISBN,
      });
    });
  }

  componentDidUpdate() {
    if (this.state.edited === true)
      this.props.history.push(`/book/${this.state.ISBN}`);
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
      oldISBN: this.state.oldISBN,
    };

    axios
      .post("/api/books/edit", bookData)
      .then((res) => {
        this.setState({
          edited: res.data.edited,
        });
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          edited: false,
        });
      });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="editBook">
        <h1>Edit Book</h1>
        <form noValidate onSubmit={this.onSubmit}>
          <label htmlFor="title">Title (Required)</label>
          <span style={{ color: "red" }}> {errors.title}</span>
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
          <span style={{ color: "red" }}> {errors.ISBN}</span>
          <input
            onChange={this.onChange}
            value={this.state.ISBN}
            error={errors.ISBN}
            id="ISBN"
            type="number"
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
          <span style={{ color: "red" }}> {errors.availableCopies}</span>
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
          <div style={{ margin: "10vh 30vw 2vh 30vw" }}>
            <button
              type="submit"
              style={{ width: "40vw", height: "50px", borderRadius: "3px" }}
            >
              Edit Book
            </button>
          </div>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <Link to="/dashboard">
              <h6>Back to Dashboard</h6>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

editBook.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(editBook));
