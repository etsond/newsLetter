
const express = require("express");
//const bodyParser = require("body-parser");
const https = require("https");
const request = require("request")
const app = express();
 
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
 
app.post("/", function (req, res) {
 
    const firstName = req.body.fName; //fName is my name value in signup.html for first name input
    const lastName = req.body.lName; //lName is my name value in signup.html for last name input
    const email = req.body.email;  //email is my name value in signup.html for email input
    console.log(firstName, lastName, email);
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
 
    const jsonData = JSON.stringify(data);
 
//You need to input your server number and list ID where I wrote YOURSERVERNUMBER and YOURLISTID
 
    const url = "https://us8.api.mailchimp.com/3.0/lists/75d832ae3";
    const options = {
        method: "POST",
 
//You need to input YOURAPIKEY between the quotes, you can also change whatevername1
 
        auth: "etsond:590b4a8d4221381a1d97838fb4383a1c-us8"
    };
 
    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", (req,res) => {
    res.redirect("/")
})

 
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
});

// API Key 590b4a8d4221381a1d97838fb4383a1c-us8

// audience id
// 75d832ae3