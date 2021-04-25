import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "../../axios.js";
import classnames from "classnames";

class booksList extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      displayBooks: [],
      search: "",
    };
  }

  onFilter = (e) => {
    this.setState({
      search: e.target.value,
    });

    if (this.state.search !== "") {
      let display = [];
      this.state.books.map((book) => {
        if (
          book.title.toLowerCase().includes(this.state.search.toLowerCase())
        ) {
          display.push(book);
        }
      });
      this.setState({
        displayBooks: display,
      });
    } else {
      this.setState({
        displayBooks: this.state.books,
      });
    }
  };

  viewBook = (e, id) => {
    this.props.history.push(`/book/${id}`);
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) this.props.history.push("/login");

    axios.get("/api/books/list").then((res) => {
      this.setState({
        books: res.data.booksList,
        displayBooks: res.data.booksList,
      });
    });
  }

  render() {
    const { displayBooks } = this.state;
    return (
      <div className="booksList">
        <h1>Books List</h1>
        <label htmlFor="search">Search</label>
        <input
          onKeyUp={this.onFilter.bind(this)}
          onInput={this.onFilter.bind(this)}
          value={this.state.search}
          id="search"
          type="text"
          style={{marginBottom: "5vh"}}
          className={classnames("")}
        />
        <table
          style={{
            fontFamily: "arial, sans-serif",
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <tbody>
            {displayBooks.map((book) => (
              <tr key={book.ISBN} style={{ border: "1px solid lightgray" }}>
                <td style={{ textAlign: "center" }}>
                  {book.title}
                  <br />
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                    }}
                    onClick={(e) => {
                      this.viewBook(e, book.ISBN);
                    }}
                  >
                    View Book Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: "center", margin: "5vh" }}>
          <Link to="/dashboard">
            <h6>Back to Dashboard</h6>
          </Link>
        </div>
      </div>
    );
  }
}

booksList.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(booksList));
