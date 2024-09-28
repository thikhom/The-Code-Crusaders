pageNumber = 1;
moviesPageAmount = 5;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8ced3a6172msh4420e9f690764b0p152b71jsn3ef5dbc50576',
		'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
	}
};


async function getName(){
    try {
        const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles?page=${pageNumber}&limit=${moviesPageAmount}&endYear=2022`, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}




getName();