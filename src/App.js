import React, { Component } from "react";
import logo from "./logo.svg";
import { Route, Redirect, Switch } from "react-router-dom";
import Rental from "./component/rental";
import NotFound from "./component/notFound";
import Customer from "./component/customers";
import Movie from "./component/movie";
import LoginForm from "./component/loginForm";
import Newmovie from "./component/common/newmovie";
import "./App.css";
import MovieForm from "./component/movieForm";
import Navbar from "./component/navbar";
import Register from "./component/common/registerform";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/movies/new" component={Newmovie} />
            <Route path="/movies" component={Movie} />
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
