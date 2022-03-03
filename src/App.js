import React, { Component } from "react";
import logo from "./logo.svg";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Rental from "./component/rental";
import NotFound from "./component/notFound";
import Customer from "./component/customers";
import Movie from "./component/movie";
import LoginForm from "./component/loginForm";
import Newmovie from "./component/common/newmovie";
import MovieForm from "./component/movieForm";
import Navbar from "./component/navbar";
import Register from "./component/common/registerform";
import Logout from "./component/common/logout";
import ProtectedRoute from "./component/common/protectedroute";
import auth from "./services/authService";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const user = user;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <ProtectedRoute path="/movies/new" component={Newmovie} />
            <Route
              path="/movies"
              render={(props) => {
                <movies {...props} user={user} />;
              }}
            />
            <Route path="/customers" component={Customer} />
            <Route path="/rental" component={Rental} />
            <Route path="/register" component={Register} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movie"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
