// API Key and Token
const apiKey = '6e00b06598170f7a64de09754ef370ac';
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTAwYjA2NTk4MTcwZjdhNjRkZTA5NzBhYyIsIm5iZiI6MTcyNjg2NjgwMC41NDQwMDUsInN1YiI6IjY2ZWRlNTEwNzMwMGE1YmEyMTNhZGU3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mEjRHhCrZTk0_Bcp2zEjr7XsfMrZCLklw5HSEDQP050';
const accountId = '66ede5107300a5ba213ade7e'; 
const sessionId = 'YOUR_SESSION_ID'; //we need to get authorization, so for now this is a place holder.

// The API URL for fetching favorite movies
const apiUrl = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${apiKey}&session_id=${sessionId}`;

// Function to fetch favorite movies
function fetchFavorites() {
    $.ajax({
        url: apiUrl,
        type: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        success: function (data) {
            const movies = data.results;
            displayMovies(movies);
        },
        error: function () {
            alert('Error fetching favorite movies');
        }
    });
}

// Function to display movies on the page
function displayMovies(movies) {
    const movieList = $('#movieList');
    movieList.empty();  // Clear any existing content

    movies.forEach(movie => {
        const movieItem = `
            <div class="movie-item">
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.vote_average}</p>
            </div>
        `;
        movieList.append(movieItem);
    });
}

// Call the function when the page is ready
$(document).ready(function () {
    fetchFavorites();
});

