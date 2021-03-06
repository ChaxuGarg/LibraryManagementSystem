import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/landing/landing.js";
import Register from "./components/auth/Register.js";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store.js";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken.js";
import { setCurrentUser, logoutUser } from "./actions/authActions.js";
import PrivateRoute from "./components/private-route/PrivateRoute.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import AddNewBook from "./components/books/addNew.js";
import UserList from "./components/userList.js";
import BooksList from "./components/books/booksList.js";
import BookDetails from "./components/books/book.js";
import EditBook from "./components/books/EditBook.js";
import requestList from "./components/requestList.js";
import Requests from "./components/Requests.js";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.login.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/addnewbook" component={AddNewBook} />
            <PrivateRoute exact path="/userlist" component={UserList} />
            <PrivateRoute exact path="/books" component={BooksList} />
            <PrivateRoute exact path="/book/:id" component={BookDetails} />
            <PrivateRoute exact path="/book/edit/:id" component = {EditBook} />
            <PrivateRoute exact path="/requestlistall" component = {requestList} />
            <PrivateRoute exact path="/requestlist" component={Requests} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
