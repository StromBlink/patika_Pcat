const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db')

//create schema
const PhotoSchema = new Schema({
    title: String,
    description: String

})

const Photo = mongoose.model('Photo', PhotoSchema)

//create a photo
/*
Photo.create({
    title: "Photo 2",
    description: "Photo description 1 lorem ipsum"
}) */

//find a photo
// Photo.find({}).then((data) => console.log(data))

//update a Photo
let id = "65a3aaab832ccd85fa196c61"
//Photo.findByIdAndUpdate(id, {
//    title: "photo title 111 Updated",
//    description: 'Photo 1 updated'
//}, {
//    new: true /* guncellenmis veriyi logda gorebilmeyi saglar */
//}).then((data) => { console.log(data+ "UPDATED") })

//delete a photo

/* id = "65a3ab05cac7ddde8a6f13cf"
Photo.findByIdAndDelete(id).then((data) => { console.log(data + "DELETED") })
 */
