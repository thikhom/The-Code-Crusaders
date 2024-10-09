pageNumber = 1;
moviesPageAmount = 10;

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8ced3a6172msh4420e9f690764b0p152b71jsn3ef5dbc50576',
		'x-rapidapi-host': 'moviesminidatabase.p.rapidapi.com'
	}
};

class Movies{
    constructor(name, poster, genre){
        this.name = name;
        this.poster = poster;
        this.genre = genre;
    }

    GetMovieNames(movie_Genre){
        async function movieName(){
            try{
                const response = await fetch(`https://moviesminidatabase.p.rapidapi.com/movie/byGen/${movie_Genre}/`, options)
                const result = await response.json();
                console.log(result);
            } catch(error){
                console.log(error);
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

class Action extends Movies{
    constructor(name, poster){
        super(name, poster);
        this.genre = "Action";
    }
}

let Horror1 = new Horror(4, "33");
let Action1 = new Action(4, "33");

//Horror1.GetMovieNames(Horror1.genre);
//Action1.GetMovieNames(Action1.genre);

function UpdateImages(result){
    //console.log(result.results[0].primaryImage);
    console.log(result.results[0].primaryImage.url);
    for (let index = 0; index < 5; index++) {
        document.getElementsByClassName("flex1")[index].src = result.results[index].primaryImage.url;
        document.getElementsByClassName("movieAnchor")[index].href = "https://www.imdb.com/title/" + result.results[index].id + "/";
    }
    
}