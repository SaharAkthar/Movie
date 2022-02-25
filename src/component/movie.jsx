import React, { Component } from "react";
import MoviesTable from "./movieTable";
import { getMovie, getMovies } from "../services/fakemovies";
import Pagination from "./common/pagination";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utilis/paginate";
import ListGroup from "./common/listGroup";
import { genre } from "../services/fakeGenreService";
import _ from "lodash";
import SearchBox from "./selectbox";
import { Link } from "react-router-dom";
class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    searchQuery: "",
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: [...getMovies()], genres: genres });
  }
  getPageData = () => {
    const {
      currentPage,
      pageSize,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;
    const filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movie = paginate(sorted, currentPage, pageSize);
    console.log("movie", movie);
    return { totalcount: filtered.length, data: movie };
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleSort = (path) => {
    this.setState({ sortColumn: { path: path, order: "asc" } });
  };
  handleLike = (movie) => {
    const movies = { ...this.state.movies };
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({
      selectedQuery: query,
      selectedGenre: null,
      currentPage: 1,
    });
  };
  render() {
    const count = this.state.movies.length;
    if (count === 0) {
      return <p>There are no movies in the Database</p>;
    }
    const { totalcount, data } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalcount} movies in Database</p>
          <SearchBox
            value={this.searchQuery}
            onChange={this.handleSearch}
          ></SearchBox>
          <MoviesTable
            movies={data}
            onDelete={this.handleDelete}
            sortColumn={this.handleSort}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={totalcount}
            pageSize={this.pageSize}
            currentPage={this.currentPage}
            onPageChange={this.handePageChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default Movie;
