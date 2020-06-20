$(document).ready(function() {
    // INITIALIZING GLOBAL VARIABLES
    let genres = [];

    $('#searchButton').on('click', function(event) {
        event.preventDefault();
        // API call to tvmaze
        console.log('clicked');
        let tvShow = $('#inputSearch').val();
        let queryURL = 'https://api.tvmaze.com/singlesearch/shows?q=' + tvShow;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            console.log(response);
            genres = [];
            let i = 0;
            while (i < response.genres.length) {
                let showGenre = response.genres[i];
                genres.push(showGenre);
                i++;
            };
            console.log(genres);
            $('.container-fluid').empty();
            //API call to google books
            let queryURL2 = 'https://www.googleapis.com/books/v1/volumes?key=AIzaSyDQcHbPNLRpWvqCjR3cYCQgwCK3Llt09M0&langRestrict=en&q=subject:' + genres[0];
            $.ajax({
                url: queryURL2,
                method: 'GET'
            }).then(function(response) {
                console.log(response);
                let searchAgainRow = $('<div class="row"><div class ="col-sm-12" id="search-bar"><h5 id="prompt">Didn\'t find what you were looking for?</h5></div></div><div class="row"><div class="col-sm-4" id="book-search"><form><input id="inputSearch" class="form-control mr-sm-2" type="search" placeholder="Input TV Show" aria-label="Search"></input><button id = "searchButton" class="btn btn-outline-success my-2 my-sm-0" type="submit">Find Books</button></form></div></div>');
                $('.container-fluid').append(searchAgainRow);
                console.log(tvShow);
                let i = 0;
                while (i < 10) {
                    let bookAuthor = response.items[i].volumeInfo.authors[0];
                    let bookTitle = response.items[i].volumeInfo.title;
                    let bookYear = response.items[i].volumeInfo.publishedDate;
                    let bookDesc = response.items[i].volumeInfo.description;
                    let bookCover = response.items[i].volumeInfo.imageLinks.thumbnail;
                    let searchResultsRow = $('<div class="row"><div class="col-sm-1"><img id = "book' + i + 'Cover" src =' + bookCover + '></img></div><div class="col-sm-2"><p id = "book' + i + 'Title">' + bookTitle + '</p><p id = "book' + i + 'Author">' + bookAuthor + '</p><p id = "book' + i + 'Year">' + bookYear + '</p></div><div id = "book' + i + 'Desc" class="col-sm-8">' + bookDesc + '</div><div class="col-sm-1"><button type="button" class="btn btn-link" id = "book' + i + 'BuyBtn">Buy Here</button></div></div><br>');
                    $(".container-fluid").append(searchResultsRow);
                    i++;
                }
            });
        });
    });   
});
    // https://www.googleapis.com/books/v1/volumes?q=search+terms
    /* http://api.tvmaze.com/singlesearch/shows?q=Pok%C3%A9mon */