let btn = document.querySelector("button");
let input = document.querySelector("input");
let info = document.querySelector(".info");
let suggest = document.querySelector("#suggestions");
let spinner = document.querySelector(".spinner");

let movieFind = async () => {
    let movie = input.value.trim();
    if (movie === "") {
        alert("Can't be empty!");
        return;
    }

    let url = `https://www.omdbapi.com/?t=${movie}&apikey=42ea74a4`;

    try {
         spinner.style.display="block";
        let response = await fetch(url);
        let data = await response.json();
        spinner.style.display="none";

        if (data.Response === "False") {
            throw new Error(data.Error);
        }
        console.log(data);
        suggest.style.display="none";
        const { Title, Poster, Language, Director, Genre, Released, imdbRating, Type, Country, Runtime,Plot } = data;

        const movieHtml = `
            <div class="movie-card">
                <img src="${Poster}" alt="${Title} Poster">
                <div class="movie-details">
                    <h2>${Title}</h2>
                    <p><strong>Type:</strong> ${Type}</p>
                    <p><strong>Genre:</strong> ${Genre}</p>
                    <p><strong>Plot:</strong> ${Plot}</p>
                    <p><strong>Released:</strong> ${Released}</p>
                    <p><strong>IMDb Rating:</strong> ${imdbRating}</p>
                    <p><strong>Director:</strong> ${Director}</p>
                    <p><strong>Country:</strong> ${Country}</p>
                    <p><strong>Runtime:</strong> ${Runtime}</p>
                    <p><strong>Language:</strong> ${Language}</p>
                </div>
            </div>
        `;

        info.innerHTML = movieHtml;
        suggest.innerHTML ="";

    } catch (error) {
        info.innerHTML = `<p>Error: ${error.message}</p>`;
        console.error("Error:", error.message);
    }
};

btn.addEventListener("click", movieFind);
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        movieFind();
    }
});
let fetchSuggestions=async (query)=>
{
    if(query<3)
    {
        suggest.innerHTML ="";
        suggest.style.display="none";
        return;
    }
    // suggest.style.display="block";
    try
    {
        let url = `https://www.omdbapi.com/?s=${query}&apikey=42ea74a4`;
        let response = await fetch(url);
        let data =await response.json();
        if(data.Response==="True")
        {
            suggest.style.display="block";
            display(data.Search);
        }
        else
        {
            suggest.style.display="block";
            suggest.innerHTML="<li>No suggestions found!</li>";
            // setTimeout(()=>
            // {suggest.style.display="none";
            //     suggest.innerHTML="";
            // },2000);
        }

    }
    catch(error)
    {
        console.error("Error fetching suggestions:",error);
    }
};
let display=(movies)=>
{
    suggest.innerHTML ="";
    movies.forEach(movie=>
        {
            let li =document.createElement("li");
            li.textContent =movie.Title;
            li.addEventListener("click",()=>
            {
                input.value=movie.Title;
                suggest.style.display="none";   
                suggest.innerHTML="";
            });
            suggest.appendChild(li);

        })
}
input.addEventListener("input",()=>fetchSuggestions(input.value));
