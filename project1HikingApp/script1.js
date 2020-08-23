$(document).ready(function () {

    const $search = $('#search');
    const $searching = $('#Searching')



    $searching.on('click', function (event) {
        event.preventDefault();

        const location = $search.val();
        // console.log(location);

        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=US&types=district&limit=1&access_token=pk.eyJ1Ijoic2ZjYXJ6IiwiYSI6ImNrZTNlNnhpeDBpNDEyc3BkcWNvemFxbWwifQ.3DHiansNJIe-pYfUswUVCw`;
        console.log(url);

        let mapBox = {
            $(document).ready(function () {
                const $search = $("#search");
                const $searching = $("#Searching");

                let position;
                navigator.geolocation.getCurrentPosition(function (pos) {
                    // console.log(pos);
                    position = pos;
                });

                $searching.on("click", function (event) {
                    event.preventDefault();
                    $search.empty();
                    // console.log(position);

                    const location = $search.val();
                    // console.log(location);
                    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=US&type=place&limit=1&access_token=pk.eyJ1Ijoic2ZjYXJ6IiwiYSI6ImNrZTNlNnhpeDBpNDEyc3BkcWNvemFxbWwifQ.3DHiansNJIe-pYfUswUVCw`;

                    if (position) {
                        url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=US&type=place&limit=1&proximity=${position.coords.longitude},${position.coords.latitude}&access_token=pk.eyJ1Ijoic2ZjYXJ6IiwiYSI6ImNrZTNlNnhpeDBpNDEyc3BkcWNvemFxbWwifQ.3DHiansNJIe-pYfUswUVCw`
                    };

                    // console.log(url);


                    let mapBox = {
                        url: url,
                        method: "GET",
                        timeout: 0,
                    };

                    $.ajax(mapBox).done(function (response) {
                        // console.log(response);

                        let mapLong = response.features[0].center[0];
                        let mapLat = response.features[0].center[1];

                        var hikingProject = {
                            url: `https://www.hikingproject.com/data/get-trails?lat=${mapLat}&lon=${mapLong}&maxDistance=10&key=200880411-841c1a0ca5adc9793fce6b5e9604bc2f`,
                            method: "GET",
                            timeout: 0,
                        };

                        $.ajax(hikingProject).done(function (response) {
                            // console.log(response);
                            // console.log(response.trails[0].difficulty);


                            let rating = response.trails[0].difficulty;
                            let image = response.trails[0].imgMedium;
                            let location = response.trails[0].location;
                            let name = response.trails[0].name;
                            let summary = response.trails[0].summary;

                            // console.log(rating, image, location, name, summary);


                        });
                    });

                    $.ajax({
                        url: `http://api.weatherstack.com/current?access_key=f1a8eeecc5bdbf06ef0f440e0391e09c&query=${location}`,
                        method: "GET",
                    }).then(function (response) {
                        console.log(response);

                        let feels = response.current.feelslike;
                        let humid = response.current.humidity;
                        let temp = response.current.temperature;
                        let vis = response.current.visibility;
                        let desc = response.current.weather_descriptions[0];
                        let name = response.location.name;

                        const payLoad = { feels, humid, temp, vis, desc, name };


                        let p = $('<p>').attr('data-attr', JSON.stringify(payLoad));
                        let feelsP = $('<p>').text(feels);
                        let humidP = $('<p>').text(humid);
                        let tempP = $('<p>').text(temp);
                        let visP = $('<p>').text(vis);
                        let descP = $('<p>').text(desc);


                        $('#weatherTitle').text(name);
                        $('#weatherInfo').append(feelsP, humidP, tempP, visP, descP, p);

                        console.log(feels, humid, temp, vis, desc);

                    });
                });


            });

            "url": url,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(mapBox).done(function (response) {
            // console.log(response);
            // console.log(response.features);
            // console.log(response.features[0]);
            // console.log(response.features[0].bbox);
            // console.log(response.features[0].bbox);

            // const lat = response.features.bbox.[0];
            // const lon = response.features.bbox.[1];
            // console.log(lat, lon);
        });

        $.ajax({
            url: `http://api.weatherstack.com/current?access_key=f1a8eeecc5bdbf06ef0f440e0391e09c&query=${location}`,
            method: "GET",
        }).then(function (response) {
            // console.log(response);

            const lat = response.location.lat;
            const long = response.location.lon;

            var hikingProject = {
                "url": `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=10&key=200880411-841c1a0ca5adc9793fce6b5e9604bc2f`,
                "method": "GET",
                "timeout": 0,
            };

            $.ajax(hikingProject).done(function (response) {
                // console.log(response);
                console.log(response.trails[0]);
            });


        });
    });












}); 