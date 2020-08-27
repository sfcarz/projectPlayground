$(document).ready(function () {

    const $weather = $('#weather');
    const $search = $('#search')
    const $searching = $('#Searching');
    const $cards = $('#containerCards');


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
            console.log(response);

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
    $searching.val('');
    

        const location = $search.val();
        // console.log(location);
        
            let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=US&type=place&limit=1&access_token=pk.eyJ1Ijoic2ZjYXJ6IiwiYSI6ImNrZTNlNnhpeDBpNDEyc3BkcWNvemFxbWwifQ.3DHiansNJIe-pYfUswUVCw`;
                    
            if (position) {
                url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=US&type=place&limit=1&proximity=${position.coords.longitude},${position.coords.latitude}&access_token=pk.eyJ1Ijoic2ZjYXJ6IiwiYSI6ImNrZTNlNnhpeDBpNDEyc3BkcWNvemFxbWwifQ.3DHiansNJIe-pYfUswUVCw`
            };
            
            let mapBox = {
                url: url,        
                method: "GET",
                timeout: 0,
                    };

                    $.ajax(mapBox).done(function (response) {
                        // console.log(response);

                        let mapLong = response.features[0].center[0];
                        let mapLat = response.features[0].center[1];

                        let hikingProject = {
                            url: `https://www.hikingproject.com/data/get-trails?lat=${mapLat}&lon=${mapLong}&maxDistance=10&key=200880411-841c1a0ca5adc9793fce6b5e9604bc2f`,
                            method: "GET",
                            timeout: 0,
                        };

                        $.ajax(hikingProject).done(function (response) {
                            // console.log(response);
                            let res = response.trails
                            // console.log(response.trails[0].difficulty);

                            let cardRow = $('<div>').addClass('row row-cols-3 row-cols-md-3');
                            $('#containerCards').prepend(cardRow);

                            for (let i = 0; i < res.length; i++) {
                                // console.log(i);
                                
                            let rating = response.trails[i].difficulty;
                            let image = response.trails[i].imgMedium;
                            let location = response.trails[i].location;
                            let name = response.trails[i].name;
                            let summary = response.trails[i].summary;
                            // console.log(summary);

                            // cardMb goes to cardRow
                            
                            // cardP4 goes to cardMb
                            let cardMb = $('<div>').addClass('col mb-4');
                            cardRow.append(cardMb);
                        
                            // Must set the unique Id for each card
                            // in order appending to card P-4 (CardImg, body)
                            let cardP4 = $('<div>').addClass('card h-100');
                        
                        
                            // anchor then img append to CardImg
                            let cardImg = $('<div>').addClass('view overlay');
                            let img = $('<img>').addClass('card-img-top').attr('src', image);
                            // cardP4.append(cardImg, body);
                            let body = $('<div>').addClass('card-body');
                            let title = $('<h4>').addClass('card-title').text(name);
                                let cardText = $('<p>').addClass('card-tet').text(summary);
                                let button = $('<button>').addClass('btn btn-outline-info btn-rounded waves-effect').text('Read More').attr('type', 'button');
                            body.append(title, cardText, button);
                            cardImg.append(img);
                            cardP4.append(cardImg, body);
                            cardMb.append(cardP4);
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
