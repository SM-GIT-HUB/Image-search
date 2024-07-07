const searchForm = document.getElementById("searchForm");
const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");
const searchResult = document.getElementById("searchResult");
const showMore = document.getElementById("showMore");

const imageClass = ["w-[100%]", "h-[100px]", "object-cover", "rounded-[4px]", "md:h-[230px]"]

let keyword = "";
let page = 1;
const accessKey = "JHGWH5uO4VdDarWqP81TCLO6Y3HoSgLINQfUFGFygCc";

async function searchNow()
{
    keyword = searchBox.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);

    const data = await response.json();

    // console.log(data);

    const results = data.results;

    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.classList.add(...imageClass);

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        
        searchResult.appendChild(imageLink);
    })
    showMore.style.display = "block";
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (searchBox.value.toString().trim() == "") {
        return;
    }

    page = 1;
    searchResult.innerHTML = "";
    showMore.style.display = "none";
    searchNow();
})

showMore.addEventListener("click", () => {
    page++;
    searchNow();
})