import React from "react";
const MovieForm = ({ match }) => {
  return (
    <div>
      Movie Form {match.params.id}
      <button
        className="btn btn-primary"
        onClick={() => {
          this.history.push("/movie");
        }}
      >
        Save{" "}
      </button>
    </div>
  );
};

export default MovieForm;
