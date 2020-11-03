const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    jsonData = JSON.stringify(data);

    const url = 'https://us19.api.mailchimp.com/3.0/lists/5ccd6cb286'

    const options = {
        method: "POST",
        auth: "asifali:7dc7f227b092b98d232dddecf854ac94-us19"
    }

    const request = https.request(url, options, function (response) {
        response.on('data', function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});


app.listen(3000, function () {
    console.log("server is running on port 3000");
});

// 7dc7f227b092b98d232dddecf854ac94-us19

// 5ccd6cb286