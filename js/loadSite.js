const input = document.getElementById("search-bar");
input.focus();

[].forEach.call(document.querySelectorAll('li:not(.category)'), function (f) {
    f.style.display = 'none';
});