import React, { Component } from "react";
import joi, { abort } from "joi-browser";
import Form from "./form";
import { saveMovies, getMovies } from "../../services/movieService";
import { getGenres } from "../../services/genreServise";

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

  async populateGenre() {
    const { data: genres } = await getGenres();
    this.setState({ genres: genres });
  }
  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      console.log(this.props);
      if (movieId === "new") return;
      const { data: movie } = await getMovies(movieId);
      console.log(movie, movieId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateGenre();
    await this.populateMovie();
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  doSubmit = async () => {
    await saveMovie(this.state.data);
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
