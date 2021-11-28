const bodyParser = require("body-parser");
const { response } = require("express");
const express = require("express");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
    console.log(req.body.cityName);
    const quary = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + quary + "&appid=932ebf732073af9d364a990f253613c9&units=metric"
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDiscription = weatherData.weather[0].description
            res.write("<p>the weather is curently " + weatherDiscription + " </p>")
            res.write("<h1>The temperature in " + quary + " is " + temp + " celcius</h>");
            res.send()
        })
    })

})

app.listen(3000, function() {
    console.log("Server is runing on port 3000.")
})