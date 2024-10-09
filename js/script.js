pageNumber = 1;
moviesPageAmount = 10;

image_Buffer = [];
image_cache = [];
movie_results_cache = [];

const options_mmd = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8ced3a6172msh4420e9f690764b0p152b71jsn3ef5dbc50576',
		'x-rapidapi-host': 'moviesminidatabase.p.rapidapi.com'
	}
};

function saveJsonObject(jsonObject, ID){
    try{
        localStorage.setItem(ID, JSON.stringify(jsonObject))
        console.log("Cached: " + ID);
    }
    catch (error){
        console.log(error);
    }
}

function getJsonObject(ID){
    const item = localStorage.getItem(ID);
    //console.log(JSON.parse(item));
    return JSON.parse(item);
}

class Movies{
    constructor(name, poster, genre){
        this.name = name;
        this.poster = poster;
        this.genre = genre;
    }

    GetMovieNames(movie_Genre){
        async function movieName(){
            try{
                let result;
                if(getJsonObject(String(pageNumber) + movie_Genre) == null)
                {
                    const response = await fetch(`https://moviesminidatabase.p.rapidapi.com/movie/byGen/${movie_Genre}/`, options_mmd)
                    const _result = await response.json();
                    result = _result;
                    saveJsonObject(JSON.stringify(result), String(pageNumber) + movie_Genre);
                } 
                else
                {
                    result = getJsonObject(String(pageNumber) + movie_Genre)
                }
                console.log(result);
                UpdateImages(JSON.parse(result));
                
            } catch(error){
                console.log(error);
            }
        }
        movieName();
    }
    
}
console.log()

class Horror extends Movies{
    constructor(name, poster){
        super(name, poster);
        this.genre = "Horror";
    }
}

class Action extends Movies{
    constructor(name, poster){
        super(name, poster);
        this.genre = "Adventure";
    }
}

class Comedy extends Movies{
    constructor(name, poster){
        super(name, poster);
        this.genre = "Comedy";
    }
}

let Horror1 = new Horror(4, "33");
let Action1 = new Action(4, "33");
let Comedy1 = new Comedy(4, "33");

//Horror1.GetMovieNames(Horror1.genre);
Action1.GetMovieNames(Action1.genre);
//Comedy1.GetMovieNames(Comedy1.genre);

async function UpdateImages(result){
    try{
        let api_result;
        //const JSON_result = JSON.parse(result);
        for (let index = 0; index < 5; index++) {
            if(getJsonObject(result.results[index].imdb_id) == null){
                const response = await fetch(`https://moviesminidatabase.p.rapidapi.com/movie/id/${result.results[index].imdb_id}/`, options_mmd)
                const api_result_cached = await response.json();
                api_result = api_result_cached;
                saveJsonObject(JSON.stringify(api_result) , result.results[index].imdb_id);
            } else{
                let api_result_raw = getJsonObject(result.results[index].imdb_id);
                api_result = JSON.parse(api_result_raw);
                console.log(api_result.results.title);
            }
            
            image_Buffer.push(api_result.results.banner)
            
        }

        for (let index = 0; index < 5; index++){
            document.getElementsByClassName("flex1")[index].src = image_Buffer[index];
            document.getElementsByClassName("movieAnchor")[index].href = "https://www.imdb.com/title/" + result.results[index].imdb_id + "/";
        }
    }
    catch(error){
        console.log(error);
    }
}
