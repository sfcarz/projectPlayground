$(document).ready(function () {

    let $humor = $('#giphy')








    var settings = {
        "url": "https://api.giphy.com/v1/gifs/trending?api_key=sqozeuXvDiURqERnyeCGIgAHDe2PAqM5&limit=3&offset=7&rating=r&random_id=e826c9fc5c929e0d6c6d423841a282aa",
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
});

// $('#giphyButton').on('click', function (event) {
//     event.preventDefault();
//     console.log('working');

//     let humor = $humor.val();

//     console.log(humor);
//     $humor.val('')

//     let settings = {
//         "url": `https://api.giphy.com/v1/gifs/search?api_key=sqozeuXvDiURqERnyeCGIgAHDe2PAqM5&q=${humor}&limit=1&offset=17&rating=r&lang=en`,
//         "method": "GET",
//         "timeout": 0,
//     };



//     $.ajax(settings).then(function (response) {
//         console.log(response);

//         let url = response.data[0].url;
//         console.log(url);
//     });
// });