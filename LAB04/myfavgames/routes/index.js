const express = require('express'); // I import the Express framework
const router = express.Router(); // I create a router instance using Express

// Handling GET requests for the root path
router.get('/', function(req, res, next) {
    res.render('index', { title: 'My Favorite Games' }); // I render the index view with the title 'My Favorite Games'
});

// Handling GET requests for the Valorant path
router.get('/valorant', function(req, res, next) {
    res.render('valorant', { title: 'Valorant' }); // I render the Valorant view with the title 'Valorant'
});

// Handling GET requests for the PUBG path
router.get('/pubg', function(req, res, next) {
    res.render('pubg', { title: 'PUBG' }); // I render the PUBG view with the title 'PUBG'
});

// Handling GET requests for the GTA 5 path
router.get('/gta5', function(req, res, next) {
    res.render('gta5', { title: 'GTA 5' }); // I render the GTA 5 view with the title 'GTA 5'
});

// Handling GET requests for the COD Warzone path
router.get('/cod_warzone', function(req, res, next) {
    res.render('cod_warzone', { title: 'COD Warzone' }); // I render the COD Warzone view with the title 'COD Warzone'
});

module.exports = router; // I export the router module for use in other modules
