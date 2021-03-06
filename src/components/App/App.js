import './App.css';
import React from 'react';
import moviedatabase from '../../api/moviedatabase'
import SearchBar from '../SearchBar/SearchBar';
import MovieList from '../MovieList/MovieList';
import MovieDetail from '../MovieDetail/MovieDetail';
import Footer from '../Footer/Footer';

class App extends React.Component {
    state = {movies: [], selectedMovie: null}

    componentDidMount() {
        this.onSearchSubmit('Star Wars');
    }

    onSearchSubmit = async term => {
        // const apiKey = process.env.REACT_APP_API_KEY
      const apiKey = '004fe88364bf7b2db8cbedbea28c063c'

        const response = await moviedatabase.get(`/search/multi?api_key=${apiKey}&query=${term}`);

        this.setState({movies: response.data.results, selectedMovie: response.data.results[0]});
        console.log(response.data.results);
        console.log(this.state);
    }

    onMovieSelect = movie => {
        this.setState({selectedMovie: movie});
    }
    
    render() {
        console.log(this.state.movies);
        return (
          <div className="component-container">
            <div className="search-bar">
              <SearchBar onSubmit={this.onSearchSubmit} />
            </div>
            <div className="movie-display-container">
              <div className="movie-detail">
                <MovieDetail movie={this.state.selectedMovie} />
              </div>
              <div className="movie-list">
                <MovieList
                  movies={this.state.movies}
                  onMovieSelect={this.onMovieSelect}
                />
              </div>
            </div>
            <div className="footer">
              <Footer />
            </div>
          </div>
        );
    }
}

export default App;