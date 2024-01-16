const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const fs = require("fs");
const methodOverride = require('method-override')
const ejs = require('ejs');
const path = require("path");

const { photoController } = require('./controllers/photoControllers')
const { pageController } = require('./controllers/pageController')
const { Photo } = require('./models/Photos');

const app = express();
const port = 3000;

//Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db')

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));



//TEMPLATE ENGINE
app.set("view engine", "ejs")


//ROUTES

// Routes
app.get('/about', pageController('about'))
app.get('/add', pageController('add'))

app.get("/", photoController.getAllPhotos);
app.get("/Photo/:id", photoController.getPhotoById);
app.get("/Photo/edit/:id", photoController.getEditPhoto);
app.put("/Photo/:id", photoController.updatePhoto);
app.delete("/Photo/:id", photoController.deletePhoto);
app.post('/photos', photoController.addPhoto);
app.get("/page=:pagenumber", photoController.pageNation)


app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});


