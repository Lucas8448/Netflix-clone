import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root')

class App extends Component {
    state = {
        movies: [],
        searchTerm: '',
        selectedMovie: null
    };

    handleSearchChange = event => {
        this.setState({ searchTerm: event.target.value });
    };

    handleSearchSubmit = event => {
        event.preventDefault();

        axios.get(`http://www.omdbapi.com/?apikey=8481f0a&s=${this.state.searchTerm}`)
            .then(res => {
                const movies = res.data.Search;
                this.setState({ movies });
            });
    };

    handleMovieClick = movie => {
        this.setState({ selectedMovie: movie });
    };

    handleModalClose = () => {
        this.setState({ selectedMovie: null });
    };

    render() {
        return (
            <div className="bg-gradient-to-b from-black to-gray-800 text-white min-h-screen">
                <header className="py-4 px-8">
                    <form onSubmit={this.handleSearchSubmit} className="mt-2">
                        <input
                            type="text"
                            placeholder="Titles, people, genres"
                            value={this.state.searchTerm}
                            onChange={this.handleSearchChange}
                            className="py-1 px-3 rounded w-full bg-gray-800 text-white placeholder-gray-400"
                        />
                    </form>
                </header>
                <main className="px-8 py-4 overflow-x-auto">
                    <h2 className="text-xl font-bold mb-4">Search Results</h2>
                    <div className="flex space-x-6">
                        {this.state.movies.map(movie => (
                            <div key={movie.imdbID} className="flex-none w-64 cursor-pointer" onClick={() => this.handleMovieClick(movie)}>
                                <img src={movie.Poster} alt={movie.Title} className="w-full rounded-md shadow-md transform transition hover:scale-105"/>
                                <p className="mt-2 text-sm">{movie.Title}</p>
                            </div>
                        ))}
                    </div>
                </main>
                <Modal 
                    isOpen={this.state.selectedMovie !== null} 
                    onRequestClose={this.handleModalClose} 
                    style={{
                        overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
                        content: {
                            backgroundColor: '#111',
                            border: 'none',
                            borderRadius: '10px',
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%',
                            maxWidth: '600px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }
                    }}
                >
                    {this.state.selectedMovie && (
                        <div className="text-center">
                            <button onClick={this.handleModalClose} className="absolute right-2 top-2 text-white text-2xl">&times;</button>
                            <img src={this.state.selectedMovie.Poster} alt={this.state.selectedMovie.Title} className="w-full mt-4 rounded-md shadow-md object-contain max-h-64"/>
                            <h2 className="text-2xl font-bold mt-4 text-white">{this.state.selectedMovie.Title}</h2>
                            <p className="mt-2 text-white">{this.state.selectedMovie.Year}</p>
                        </div>
                    )}
                </Modal>
            </div>
        );
    }
}

export default App;
