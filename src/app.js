const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000 // heroku and local

// Define paths for Express config
const home = path.join(__dirname, '../public');
const templates = path.join(__dirname, '../templates/views');
const partials = path.join(__dirname, '../templates/partials');

// Setup hbs engine and views location
app.set('view engine', 'hbs');
app.set('views', templates);
hbs.registerPartials(partials);

// Setup static dir to serve
app.use(express.static(home));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Azron Brian'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Azron Brian'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'How can we help you?',
        name: 'Azron Brian'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must enter an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error});
                } else {
                    res.send({
                        location: location,
                        forecast: forecastData
                    })
                }   
            })
        }    
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Azron Brian'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Azron Brian'
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});