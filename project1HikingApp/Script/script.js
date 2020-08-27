$(document).ready(function () {

    const $weather = $('#weather');
    const $search = $('#search')
    const $searching = $('#Searching');
    const $cards = $('#containerCards');

    setInterval(function () {
        let date = moment().format('hh:mm:ss a');
        $('#time').text(date);
    }, 1000);


    let position;
    navigator.geolocation.getCurrentPosition(function (pos) {
        position = pos;
        // console.log(position);
        let geoLat = position.coords.latitude;
        let geoLon = position.coords.longitude;

        $.ajax({
            url: `http://api.weatherstack.com/current?access_key=f1a8eeecc5bdbf06ef0f440e0391e09c&query=${geoLat},${geoLon}`,
            method: "GET",
        }).then(function (response) {
            // console.log(response);

            const lat = response.location.lat;
            const long = response.location.lon;

            let feels = response.current.feelslike;
            let feelsF = (feels * 9 / 5) + 32;
            let humid = response.current.humidity;
            let temp = response.current.temperature;
            let tempF = (temp * 9 / 5) + 32;
            let vis = response.current.visibility;
            let desc = response.current.weather_descriptions[0];
            let name = response.location.name;

            const payLoad = { feels, humid, temp, vis, desc, name };

            let weatherCard = $('<div>').addClass('card text-center');
            let content = $('<div>').addClass('card-body elegant-color white-text rounded-bottom');
            let tittles = $('<h4>').addClass('card-title').text('Current Location');
            let p = $('<p>').attr('data-attr', JSON.stringify(payLoad));
            let feelsP = $('<p>').text(`Feels Like: ${feelsF}°`);
            let humidP = $('<p>').text(`Humidity: ${humid}%`);
            let tempP = $('<p>').text(`Temperature: ${tempF}° F`);
            let visP = $('<p>').text(`Visibility: ${vis} mi`);
            let descP = $('<p>').text(desc).addClass('pb-2');
            weatherCard.append(content);
            content.append(tittles, descP, feelsP, humidP, tempP, visP,);
            $('#userLocation').prepend(weatherCard);
        }); 
    });

$searching.on('click', function (event) {
        event.preventDefault();
    $weather.empty();
    $cards.empty();
    

        const location = $search.val();
        // console.log(location);
        
            let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=US&type=place&limit=1&access_token=pk.eyJ1Ijoic2ZjYXJ6IiwiYSI6ImNrZTNlNnhpeDBpNDEyc3BkcWNvemFxbWwifQ.3DHiansNJIe-pYfUswUVCw`;
                    
            if (position) {
                url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=US&type=place&limit=1&proximity=${position.coords.longitude},${position.coords.latitude}&access_token=pk.eyJ1Ijoic2ZjYXJ6IiwiYSI6ImNrZTNlNnhpeDBpNDEyc3BkcWNvemFxbWwifQ.3DHiansNJIe-pYfUswUVCw`
            };

            $search.val('')
            
            let mapBox = {
                url: url,        
                method: "GET",
                timeout: 0,
                    };

                    $.ajax(mapBox).then(function (response) {
                        // console.log(response);

                        let mapLong = response.features[0].center[0];
                        let mapLat = response.features[0].center[1];

                        let hikingProject = {
                            url: `https://www.hikingproject.com/data/get-trails?lat=${mapLat}&lon=${mapLong}&maxDistance=10&key=200880411-841c1a0ca5adc9793fce6b5e9604bc2f`,
                            method: "GET",
                            timeout: 0,
                        };

                        $.ajax(hikingProject).then(function (response) {
                            console.log(response);
                            let res = response.trails
                            // console.log(response.trails[0].difficulty);

                            let cardRow = $('<div>').addClass('row row-cols-1 row-cols-md-3');
                            $('#containerCards').prepend(cardRow);

                            for (let i = 0; i < res.length; i++) {
                                // console.log(i);
                                
                            let rating = response.trails[i].difficulty;
                            let image = response.trails[i].imgMedium;
                            let location = response.trails[i].location;
                            let name = response.trails[i].name;
                            let summary = response.trails[i].summary;
                            let length = response.trails[i].length;
                            let ascent = response.trails[i].ascent;
                            let descent = response.trails[i].descent;
                            let id = `modal-${[i]}`;
                            console.log(ascent, descent);
                            let payload = {rating, image, location, name, summary}
                            let stringPay = JSON.stringify(payload);

                            let cardMb = $('<div>').addClass('col mb-4');
                            let cardP4 = $('<div>').addClass('card h-100');
                            let cardImg = $('<div>').addClass('view overlay');
                            let img = $('<img>').addClass('card-img-top').attr('src', image);
                            let body = $('<div>').addClass('card-body');
                            let title = $('<h4>').addClass('card-title').text(name);
                            let cardText = $('<p>').addClass('card-text').text(`Length of Hike: ${length} mi`);
                            let cardText1 = $('<p>').addClass('card-text').text(`Total Ascent: ${ascent} ft`);
                            let cardText2 = $('<p>').addClass('card-text').text(`Total Descent: ${descent} ft`);
                            let button = $('<button>').addClass('btn btn-outline-info btn-rounded waves-effect').text('Read More').attr({type: 'button', id: `${id}`, 'data-toggle': 'modal', 'data-target': `${id}`, 'data-attr': `${stringPay}`, });

                            body.append(title, cardText, cardText1, cardText2, button);
                            cardImg.append(img);
                            cardP4.append(cardImg, body);
                            cardMb.append(cardP4);
                            cardRow.append(cardMb);
                        

                            $(`#${id}`).on('click', function (event) {
                                // console.log()
                                const place = $(this).attr("data-attr")
                                const payload = JSON.parse(place)
                                console.log(payload);

                                let rating = payload.rating;
                                let image = payload.image;
                                let location = payload.location;
                                let name = payload.name;
                                let summary = payload.summary;

                                const modalDiv = $("<div>").addClass("modal fade").attr({ id: "exampleModal", tabindex: "-1", role: "dialog", "aria-labelledby": "exampleModalLabel", "aria-hidden": "true" })
                            
                                modalDiv.html(`
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">${name}</h5>
                                    <button type="button" class="close modalExampleClose" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div>
                                  <img class="card-img-top" src="${image}"
                                        alt="Card image cap">
                                  </div>
                                  <div class="modal-body">
                                    ${summary}
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary modalExampleClose" data-dismiss="modal">Close</button>
                                  </div>
                                </div>
                              </div>
                                `)

                                $("body").append(modalDiv)
                                $("#exampleModal").modal()
                            });
                            
                            $(document).on('hidden.bs.modal', function (e) {
                                $("#exampleModal").remove()
                            });

                        };

                            // console.log(rating, image, location, name, summary);
                        });

                    });

                    $.ajax({
                        url: `http://api.weatherstack.com/current?access_key=f1a8eeecc5bdbf06ef0f440e0391e09c&query=${location}`,
                        method: "GET",
                    }).then(function (response) {
                        // console.log(response);

                        const lat = response.location.lat;
                        const long = response.location.lon;

                        let feels = response.current.feelslike;
                        let feelsF = (feels * 9 / 5) + 32;
                        let humid = response.current.humidity;
                        let temp = response.current.temperature;
                        let tempF = (temp * 9 / 5) + 32;
                        let vis = response.current.visibility;
                        let desc = response.current.weather_descriptions[0];
                        let name = response.location.name;

                        const payLoad = { feels, humid, temp, vis, desc, name };

                        let weatherCard = $('<div>').addClass('card text-center');
                        let content = $('<div>').addClass('card-body elegant-color white-text rounded-bottom');
                        let tittles = $('<h4>').addClass('card-title').text(name);
                        let p = $('<p>').attr('data-attr', JSON.stringify(payLoad));
                        let feelsP = $('<p>').text(`Feels Like: ${feelsF}°`);
                        let humidP = $('<p>').text(`Humidity: ${humid}%`);
                        let tempP = $('<p>').text(`Temperature: ${tempF}° F`);
                        let visP = $('<p>').text(`Visibility: ${vis} mi`);
                        let descP = $('<p>').text(desc).addClass('pb-2');
                        weatherCard.append(content);
                        content.append(tittles, descP, feelsP, humidP, tempP, visP,);
                        $('#weather').prepend(weatherCard);
                    });
});


});

// $(`#${id}`).on('click', function() {
//     console.log('this button works', id);

//     let getID = $(this).attr("id");
//     // console.log(getID);

//     let modalDiv = $('<div>').addClass('modal fade').attr({id: `${getID}`, 'tabindex': '-1', role: 'dialog', 'aria-labelledby': 'exampleModalCenterTitle'});
//     let modalDiv2 = $('<div>').addClass('modal-dialog modal-dialog-centered').attr('role', 'document');
//     let modalDiv3 = $('<div>').addClass('modal-content');
//     // append from bottom up //below//
//     let modalDiv4 = $('<div>').addClass('modal-header');
//     let titleDiv4 = $('<h5>').addClass('modal-title').text(`${name}`);
//     // append above//

//     let modalDiv5 = $('<div>').addClass('modal-body').text(location, rating);

//     // append from bottom up //below//
//     let modalDiv6 = $('<div>').addClass('modal-footer');
//     let modalButton = $('<button>').addClass('btn btn-secondary').attr({type: 'button', 'data-dismiss': 'modal',}).text('Close');
//     // append above//

//     modalDiv6.append(modalButton);
//     modalDiv4.append(titleDiv4);
//     modalDiv3.append(modalDiv4, modalDiv5, modalDiv6);
//     modalDiv2.append(modalDiv3);
//     modalDiv.append(modalDiv2);
//     $(`body`).append(modalDiv);
//     $(`#${id}`).modal();

// });