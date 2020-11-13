const input = document.getElementById("search-bar");
input.focus();

const categoryTiles = document.getElementsByClassName("category");

for(let i = 0; i < categoryTiles.length; i++) {
    categoryTiles[i].addEventListener('click', function() {
        document.location.href = "subs/fruits.html/";
    })
}

const hidableTiles = document.querySelectorAll("li:not(.category) > img, li:not(.category) > p");

Object.keys(hidableTiles).forEach(function (key) {
    hidableTiles[key].style.display = 'none';
});