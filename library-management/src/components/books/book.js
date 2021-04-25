import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../axios.js";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import isEmpty from "is-empty";

class Book extends Component {
  constructor() {
    super();
    this.state = {
      book: {
        title: "",
      },
      due: "",
      newDue: "",
      requested: false,
      errors: {},
      request: {},
    };
  }

  editBook = (e, id) => {
    this.props.history.push(`/book/edit/${id}`);
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  requestBook = (e, ISBN, username) => {
    e.preventDefault();
    const data = {
      ISBN: ISBN,
      username: username,
      due: this.state.due,
    };



    this.setState({
      book: [],
    });

    axios
      .post("/api/requests/request", data)
      .then((res) => {})
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: true,
        });
      });

    this.props.history.push(`/book/${this.state.book.ISBN}`);
  };

  renewBook = (e, ISBN, username) => {
    e.preventDefault();
    const data = {
      ISBN: ISBN,
      username: username,
      newDue: this.state.newDue,
    };



    this.setState({
      book: [],
    });

    axios
      .patch("/api/requests/renewRequest", data)
      .then((res) => {})
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: true,
        });
      });

    this.props.history.push(`/book/${this.state.book.ISBN}`);
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) this.props.history.push("/login");

    const data = {
      id: this.props.match.params.id,
      username: this.props.auth.user.username,
    };

    axios.post("/api/books/book", data).then((res) => {
      this.setState({
        book: res.data.book,
        request: res.data.request,
        loading: false,
      });
    });
  }

  

  render() {
    const { book } = this.state;
    const { user } = this.props.auth;
    const {request} = this.state;

    if (book === undefined) {
      window.location.reload(false);
      return <h1>Loading...</h1>;
    }
    return (
      <div className="book">
        <h1>{book.title}</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            {" "}
            <h5>
              {book.author && (
                <span>
                  <br />
                  Author:{" "}
                </span>
              )}
              <b>{book.author}</b>
              {book.publisher && (
                <span>
                  <br />
                  Publisher:{" "}
                </span>
              )}
              <b>{book.publisher}</b>
              {book.genre && (
                <span>
                  <br />
                  Genre:{" "}
                </span>
              )}
              <b>{book.genre}</b>
              {book.summary && (
                <span>
                  <br />
                  Summary:{" "}
                </span>
              )}
              <b>{book.summary}</b>
              <br />
              ISBN: <b>{book.ISBN}</b>
              {book.location && (
                <span>
                  <br />
                  Location:{" "}
                </span>
              )}
              <b>{book.location}</b>
              <br />
              Available Copies: <b>{book.availableCopies}</b>
            </h5>
          </div>
          {(user.accessLevel === "librarian" ||
            user.accessLevel === "admin") && (
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={(e) => {
                this.editBook(e, book.ISBN);
              }}
            >
              Edit Book Details
            </button>
          )}
          {user.accessLevel === "user" &&
            isEmpty(request) &&
            book.availableCopies > 0 && (
              <div>
                <label htmlFor="due">Return Date</label>
                <input
                  type="date"
                  id="due"
                  onChange={this.onChange}
                  value={this.state.due}
                  placeholder="yyyy-mm-dd"
                />
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  onClick={(e) => {
                    this.requestBook(e, book.ISBN, user.username);
                  }}
                >
                  Request Book
                </button>
              </div>
            )}{user.accessLevel === "user" &&
            request.status === "Accepted" &&
            book.availableCopies > 0 && (
              <div>
                <label htmlFor="newDue">Return Date</label>
                <input
                  type="date"
                  id="newDue"
                  onChange={this.onChange}
                  value={this.state.newDue}
                  placeholder="yyyy-mm-dd"
                />
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  onClick={(e) => {
                    this.renewBook(e, book.ISBN, user.username);
                  }}
                >
                  Renew Book
                </button>
              </div>
            )}
          {user.accessLevel === "user" && (request.status === "Pending" || request.status === "Renew")   && (
            <span style={{ color: "red" }}>Book already requested</span>
          )}
          {user.accessLevel === "user" && book.availableCopies === 0 && (
            <span style={{ color: "red" }}>Book Unavailable</span>
          )}

          <span style={{ color: "red" }}> {this.state.errors.due}</span>
        </div>
        <div style={{ textAlign: "center", margin: "5vh" }}>
          <Link to="/dashboard">
            <h6>Back to Dashboard</h6>
          </Link>
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Book));
