pageNumber = 1;
moviesPageAmount = 10;
MoviesResult = [];

const options_md = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8ced3a6172msh4420e9f690764b0p152b71jsn3ef5dbc50576',
		'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
	}
};

<<<<<<< Updated upstream

async function GetMovies(){
    try {
        const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles?page=${pageNumber}&limit=${moviesPageAmount}&endYear=2022`, options);
        const result = await response.json();
        console.log(result);
        getImage(result);
    } catch (error) {
        console.error(error);
    }
}



=======
const options_imdb = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8ced3a6172msh4420e9f690764b0p152b71jsn3ef5dbc50576',
		'x-rapidapi-host': 'imdb146.p.rapidapi.com'
	}
};

let API_Response;

async function SetMovieData(){
    try {
        const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles?page=${pageNumber}&limit=${moviesPageAmount}`, options_md);
        API_Response = await response.json();
        console.log(API_Response);
        //getImage(result);
        for (let index = 0; index < moviesPageAmount; index++) {
            MoviesResult.push(API_Response.results[index].id);
        }
        console.log(MoviesResult);
        return response;
    } catch (error) {
        console.error(error);
    }
}

class Movies{
    constructor(name, poster, genre){
        this.name = name;
        this.poster = poster;
        this.genre = genre;  
    }

    GetMovieName(){
        //let movieResponse = SetMovieData();
        async function movieName(){
            try{
                let naam = await SetMovieData();
                console.log(naam.text());
            }
            catch(error){
                console.error(error);
            }
        }
        movieName();
    }
    
}

class Horror extends Movies{
    constructor(name, poster){
        super(name, poster);
        this.genre = "Horror";
    }
}

let horror1 = new Horror(API_Response, "33");

//horror1.GetMovieName();

function storeMovieIDs(result){
    for (let index = 0; index < moviesPageAmount; index++) {
        MoviesResult.push([result.results[index].id], )
    }
}

>>>>>>> Stashed changes
function getImage(result){
    console.log(result.results[0].primaryImage);
    console.log(result.results[0].primaryImage.url);
    for (let index = 0; index < 5; index++) {
        document.getElementsByClassName("flex1")[index].src = result.results[index].primaryImage.url;
        document.getElementsByClassName("movieAnchor")[index].href = "https://www.imdb.com/title/" + result.results[index].id + "/";
    }
    
}

<<<<<<< Updated upstream
GetMovies();
=======
//GetGenres()
SetMovieData();
>>>>>>> Stashed changes
