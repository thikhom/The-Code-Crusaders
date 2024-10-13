pageNumber = 1;
moviesPageAmount = 10;
chunkSize = 3;
moviePointer = 0;
RowPointer = 0;

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

async function LoadMovieSpecialized(MovieID){
    const response = await fetch(`https://moviesminidatabase.p.rapidapi.com/movie/id/${MovieID}/`, options_mmd)
    const api_result_cached = await response.json();
    api_result = api_result_cached;
    console.log(api_result);

    //document.getElementById(MovieID).href = "https://www.imdb.com/title/" + api_result.results[0].imdb_id + "/";
    document.getElementById(MovieID).src = api_result.results[0].banner;
}

class Movies{
    constructor(name, row, genre){
        this.name = name;
        this.row = row;
        this.genre = genre;

    }
    GetMovieNames(Movie){
        async function movieName(){
            try{
                let result;

                //checking to see if i already have the result stored: to reduce API calls

                if(getJsonObject(String(pageNumber) + Movie.genre) == null)
                {
                    //calling API for result as it not stored
                    const response = await fetch(`https://moviesminidatabase.p.rapidapi.com/movie/byGen/${Movie.genre}/`, options_mmd)
                    const _result = await response.json();
                    result = _result;

                     //updating home page images
                    UpdateImages(result, Movie);

                    //saving result for future use
                    saveJsonObject(JSON.stringify(result), String(pageNumber) + Movie.genre);
                } 
                else
                {
                    //using the already stored result
                    result = getJsonObject(String(pageNumber) + Movie.genre)

                     //updating home page images
                    UpdateImages(JSON.parse(result), Movie);
                }
                //console.log(JSON.parse(result));
                //console.log(RowPointer);

            } catch(error){
                console.log(error);
            }
        }
        movieName();
    }
    
}

class Horror extends Movies{
    constructor(name, row){
        super(name, row);
        this.genre = "Horror";
    }
}

class Thriller extends Movies{
    constructor(name, row){
        super(name, row);
        this.genre = "Thriller";
    }
}

class Comedy extends Movies{
    constructor(name, row){
        super(name, row);
        this.genre = "Comedy";
    }
}

class War extends Movies{
    constructor(name, row){
        super(name, row);
        this.genre = "War";
    }
}

let Thriller1 = new Thriller("ThrillerRow", 7);
let Comedy1 = new Comedy("ComedyRow", 3);
let Horror1 = new Horror("HorrorRow", 7);
let War1 = new War("WarRow", 4)

//calling the object functions

//localStorage.clear();

const movieRowList = [Comedy1, Horror1, Thriller1, War1]

movieRowList[0].GetMovieNames(movieRowList[0]);

async function loadRows(){
    for(const fn of movieRowList){
        await fn.GetMovieNames(fn);
    }
}

//loadRows();

async function UpdateImages(result, Instance){
    try{
        let api_result;
        //const JSON_result = JSON.parse(result);

        //looping through the total images on home screen
        for (let index = 0; index < Instance.row; index++) {
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
            
            image_Buffer.push(api_result);
            //console.log(api_result);
            //console.log(image_Buffer);
            //finally setting the images, using a buffer to load the images in chuncks

            document.getElementsByClassName(Instance.name)[index].src = api_result.results.banner;
            document.getElementsByClassName(Instance.name+"Anchor")[index].href = "https://www.imdb.com/title/" + api_result.results.imdb_id + "/";
            if(document.getElementsByClassName(Instance.name+"Title")[index] != undefined){
                document.getElementsByClassName(Instance.name+"Title")[index].innerHTML = api_result.results.title;
            }
        }
        RowPointer++;
        //console.log(RowPointer);
        if(RowPointer < movieRowList.length){
            console.log(RowPointer)
            movieRowList[RowPointer].GetMovieNames(movieRowList[RowPointer]);
        }else{
            console.log(RowPointer);
            RowPointer = 0;
        }
        image_Buffer = [];
    }
    catch(error){
        console.log(error);
    }
}