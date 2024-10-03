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



function getImage(result){
    console.log(result.results[0].primaryImage);
    console.log(result.results[0].primaryImage.url);
    for (let index = 0; index < 5; index++) {
        document.getElementsByClassName("flex1")[index].src = result.results[index].primaryImage.url;
        document.getElementsByClassName("movieAnchor")[index].href = "https://www.imdb.com/title/" + result.results[index].id + "/";
    }
    
}

GetMovies();