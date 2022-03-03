import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="#">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/Movies">
            Movies <span className="sr-only">(current)</span>
          </NavLink>
          <NavLink className="nav-link" to="/Customers">
            Customers
          </NavLink>
          <NavLink className="nav-link" to="/Rental">
            Rentals
          </NavLink>
          <NavLink className="nav-link disabled" to="/NotFound">
            Not Found
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-link disabled" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link disabled" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-link disabled" to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-link disabled" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
