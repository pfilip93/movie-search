import React from "react";

import "./App.scss";

function App() {
  const textInput = React.useRef(null);
  const [phrase, setPhrase] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState(null);
  const [error, setError] = React.useState(null);

  async function fetchData() {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=20d04afb&s=${phrase}`
    );
    const data = await res.json();
    return data;
  }

  const getMovies = async (event) => {
    event.preventDefault();

    setLoading(true);
    setList(null);
    setError(null);

    const data = await fetchData();

    if (data.Response === "True") {
      setList(data.Search);
    } else {
      setError(data.Error);
    }

    setLoading(false);
    textInput.current.focus();
  };

  return (
    <div className="App">
      <h1 className="Header">Movie Search</h1>

      <form className="SearchBar" onSubmit={getMovies}>
        <input
          autoFocus
          ref={textInput}
          type="text"
          value={phrase}
          placeholder="Type title..."
          onChange={(event) => setPhrase(event.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>

      {loading ? (
        <h3 className="Message">Loading...</h3>
      ) : error || !list ? (
        <h3 className="Message">{error}</h3>
      ) : (
        <ul className="List">
          {list.map((movie, index) => (
            <li key={index}>
              <img src={movie.Poster} alt="" />
              <span>{movie.Title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
