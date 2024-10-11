pageNumber = 1;
moviesPageAmount = 10;
chunkSize = 3;

image_Buffer = [];

const options_mmd = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8ced3a6172msh4420e9f690764b0p152b71jsn3ef5dbc50576',
		'x-rapidapi-host': 'moviesminidatabase.p.rapidapi.com'
	}
};

//saves a JSON Object with its unique ID
function saveJsonObject(jsonObject, ID){
    try{
        localStorage.setItem(ID, JSON.stringify(jsonObject))
        console.log("Cached: " + ID);
    }
    catch (error){
        console.log(error);
    }
}

//Retrieves JSON object with ID
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

                //checking to see if i already have the result stored: to reduce API calls

                if(getJsonObject(String(pageNumber) + movie_Genre) == null)
                {
                    //calling API for result as it not stored
                    const response = await fetch(`https://moviesminidatabase.p.rapidapi.com/movie/byGen/${movie_Genre}/`, options_mmd)
                    const _result = await response.json();
                    result = _result;

                     //updating home page images
                    UpdateImages(result);

                    //saving result for future use
                    saveJsonObject(JSON.stringify(result), String(pageNumber) + movie_Genre);
                } 
                else
                {
                    //using the already stored result
                    result = getJsonObject(String(pageNumber) + movie_Genre)

                     //updating home page images
                    UpdateImages(JSON.parse(result));
                }
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

class Comedy extends Movies{
    constructor(name, poster){
        super(name, poster);
        this.genre = "Comedy";
    }
}

let Horror1 = new Horror(4, "33");
let Action1 = new Action(4, "33");
let Comedy1 = new Comedy(4, "33");

//calling the object functions

Horror1.GetMovieNames(Horror1.genre);
//Action1.GetMovieNames(Action1.genre);
//Comedy1.GetMovieNames(Comedy1.genre);

async function UpdateImages(result){
    try{
        let api_result;
        //const JSON_result = JSON.parse(result);

        let rowSize = chunkSize;
        //looping through the total images on home screen
        for (let index = 0; index < 7; index++) {
            //checking to see if i already have JSON object stored
            if(getJsonObject(result.results[index].imdb_id) == null){
                //calling API for results

                const response = await fetch(`https://moviesminidatabase.p.rapidapi.com/movie/id/${result.results[index].imdb_id}/`, options_mmd)
                const api_result_cached = await response.json();
                api_result = api_result_cached;

                //saving the result for future use
                saveJsonObject(JSON.stringify(api_result) , result.results[index].imdb_id);
            } 
            else{
                
                //retrieving the stored JSON object and turning it into something useful
                let api_result_raw = getJsonObject(result.results[index].imdb_id);
                api_result = JSON.parse(api_result_raw);
                console.log(api_result.results.title);
            }
            
            image_Buffer.push(api_result.results.banner)

            //finally setting the images, using a buffer to load the images in chuncks

            if(index >= rowSize - 1){
                for (let index = 0; index < rowSize; index++){
                    document.getElementsByClassName("flex1")[index].src = image_Buffer[index];
                    document.getElementsByClassName("movieAnchor")[index].href = "https://www.imdb.com/title/" + result.results[index].imdb_id + "/";
                }
                rowSize = rowSize + chunkSize;
            }
        }
    }
    catch(error){
        console.log(error);
    }
}