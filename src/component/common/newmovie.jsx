import React, { Component } from "react";
import joi, { abort } from "joi-browser";
import Form from "./form";
import { getGenres } from "./../../services/fakeGenreService";
import { genres } from "./../../services/fakeGenreService";
import { saveMovie } from "./../../services/fakemovies";
import { getMovies } from "./../../services/fakemovies";
import Movie from "./../movie";
class Newmovie extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  schema = {
    _id: joi.string(),
    title: joi.string().required().label("Title"),
    genreId: joi.string().required().label("Genres"),
    numberInStock: joi
      .number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: joi
      .number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };
  username = React.createRef();
  // componentDidMount() {
  //   this.username.current.focus();
  // }
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres: genres });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    const movie = getMovies(movieId);
    if (!movie) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(movie) });
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genresId: movie.genres._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
    console.log("Submitted");
  };
  render() {
    console.log(this.state.genres);
    return (
      <div>
        <h2>Movie Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default Newmovie;
