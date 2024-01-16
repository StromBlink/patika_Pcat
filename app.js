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


//Connect DB
mongoose.connect('mongodb+srv://FERDEM:8yK.5Y.R_reXM$P@atlascluster.qb0qhm7.mongodb.net/pcat-db?retryWrites=true&w=majority').then(() => { console.log('db CONNETCT') }).catch((err) => { console.log(err) })

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

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});


