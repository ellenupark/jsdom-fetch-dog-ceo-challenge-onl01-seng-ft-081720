
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(json => selectImg(json));

    fetch("https://dog.ceo/api/breeds/list/all")
    .then(resp => resp.json())
    .then(json => selectDogBreeds(json));

    document.getElementById("breed-dropdown").addEventListener('change', function() {
        filterBreeds();
    })
});


let isMagenta = false;
let completeBreeds = []

// Filter breeds by letter
function filterBreeds() {
    const selectedIndex = document.getElementById("breed-dropdown").selectedIndex
    const selectionAsString = document.getElementById("breed-dropdown")[selectedIndex].value
    const filteredArray = completeBreeds.filter(breed => breed[0] == selectionAsString)

    document.getElementById("dog-breeds").innerHTML = "" 

    filteredArray.forEach(function(breed) {
        document.getElementById("dog-breeds").innerHTML += createFilterListItem(breed)
    })
}

function createFilterListItem(breed) {
    return `
        <li>${breed}</li>
    `
};

// Change breed color on click
function changeBreedColor(li) {
    if (isMagenta == false) {
        li.style.color = "magenta"
        isMagenta = true;
    } else {
        li.style.color = "black";
        isMagenta = false;
    }
};

// Display random dog images
function selectImg(json) {
    let images = json.message.map(m => m)
    images.forEach(url => createImgHtml(url))
};

function createImgHtml(imgUrl) {
    let img = document.createElement("img");
    img.setAttribute('src', imgUrl);
    img.setAttribute('max-width', '300px');
    document.body.appendChild(img)
}

// List dog breeds
const selectDogBreeds = (json) => {
    const breedArray = Object.keys(json.message);
    completeBreeds = breedArray;
    breedArray.forEach(breed => createBreedHtml(breed))
}

const createBreedHtml = (breed) => {
    const breedList = document.getElementById("dog-breeds");
    let li = document.createElement("li");
    li.innerText = breed
    breedList.appendChild(li)
    li.addEventListener("click", () => {
        changeBreedColor(li)
    });
};
