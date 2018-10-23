const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const util = require('util');

const bodyParser = require('body-parser');

// If process.env.port does not exist, we'll set port equal to 3000 instead:
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// to be able to use req.body
app.use(bodyParser.json());


// added to all paths or globally
// Creates a log file and prints the request method and request url to the console
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    // console.log(req.body);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
});

// Displays a maintenance message and basically stops the app
// app.use((req, res, next) => {
// res.render('maintenance.hbs');
//next();
// });

// __dirname stores the path to the project directory
// Allows express to use the static files in /public
app.use(express.static(__dirname + '/public'));

// registers a helper in hbs. This will be available in the .hbs files
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function (text) {
    return text.toUpperCase();
});

hbs.registerHelper('lowerIt', (text) => {
    return text.toLowerCase();
});

// Requires 2 arguments (url, function to run which is what to send back to the person who made the request)
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'home',
        welcomeMessage: 'Welcome to my home page'
        // currentYear: new Date().getFullYear();
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        welcome: 'Welcome to my about page'
        // currentYear: new Date().getFullYear()
    });
});
app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to handle request'
    });
})

app.listen(port, () => console.log('server is up on port: ', port));