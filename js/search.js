function search() {
    const showableTiles = document.querySelectorAll("li:not(.category) > img, li:not(.category) > p");

    Object.keys(showableTiles).forEach(function (key) {
        showableTiles[key].style.display = '';
    });

    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-bar");
    input.focus();
    filter = input.value.toUpperCase();
    ul = document.getElementById("tiles");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("p")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}