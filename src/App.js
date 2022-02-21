import React, { Component } from "react";
import logo from "./logo.svg";
import { Route, Redirect, Switch } from "react-router-dom";
import Rental from "./component/rental";
import NotFound from "./component/notFound";
import Customer from "./component/customers";
import Movie from "./component/movie";
import "./App.css";
import MovieForm from "./component/movieForm";
import Navbar from "./component/navbar";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/movie/:id" component={MovieForm}></Route>
            <Route path="/movie" component={Movie} />
            <Route path="/customers" component={Customer} />
            <Route path="/rental" component={Rental} />
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
