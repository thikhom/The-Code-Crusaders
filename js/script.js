pageNumber = 1;
moviesPageAmount = 5;
ImageURL = "";
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8ced3a6172msh4420e9f690764b0p152b71jsn3ef5dbc50576',
		'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
	}
};

class Movies{
    constructor(name, poster, genre){
        this.name = name;
        this.poster = poster;
        this.genre = genre;
    }
}

class Horror extends Movies{
    constructor(name, age){
        super(name, age);
        this.occ = "student";
    }
}

class Comedy extends Movies{
    constructor(name, age){
        super(name, age);
        this.occ = "student";
    }
}

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

async function GetGenres(){
    try {
        const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/utils/genres`, options);
        const result = await response.json();
        console.log(result);
        console.log(result.results.Comedy)
        //getImage(result);
    } catch (error) {
        console.error(error);
    }
}



function getImage(result){
    console.log(result.results[0].primaryImage);
    console.log(result.results[0].primaryImage.url);
    for (let index = 0; index < 5; index++) {
        document.getElementsByClassName("flex1")[index].src = result.results[index].primaryImage.url;
        document.getElementsByClassName("movieAnchor")[index].href = "https://www.imdb.com/title/" + result.results[index].id + "/";
    }
    
}
console.log()

GetGenres()
//GetMovies();