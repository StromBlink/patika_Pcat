const fs = require("fs");
const photoModel = require('../models/Photos');

const photoController = {
    getAllPhotos: async (req, res) => {
        const photos = await photoModel.Photo.find({}).sort('-dateCreated');
        const pages = {

            start: 0,
            count: 6
        }
        if (photos.length < 6) { pages.count = photos.length }
        res.render('index', { photos, pages });
    },

    getPhotoById: async (req, res) => {
        const id = req.params.id;
        const photos = await photoModel.Photo.find({});
        const photo = await photoModel.Photo.findById(id);
        res.render('photo', { photo, photos });
    },

    getEditPhoto: async (req, res) => {
        const id = req.params.id;
        const photos = await photoModel.Photo.find({});
        const photo = await photoModel.Photo.findById(id);
        res.render('edit', { photo });
    },

    updatePhoto: async (req, res) => {
        const id = req.params.id;
        const photo = await photoModel.Photo.findById(id);

        // Update
        photo.title = req.body.title;
        photo.description = req.body.description;
        photo.save();
        res.redirect(`/Photo/${id}`);
    },

    deletePhoto: async (req, res) => {
        const id = req.params.id;
        const photo = await photoModel.Photo.findById(id);

        // Delete
        fs.unlinkSync(`./public${photo.image}`, (err) => {
            if (err) throw err;
            else console.log("removed");
        });
        await photoModel.Photo.findByIdAndDelete(id);
        res.redirect('/');
    },

    addPhoto: async (req, res) => {
        const uploadDir = 'public/uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        let uploadedImage = req.files.image;
        let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

        uploadedImage.mv(uploadPath, async () => {
            await photoModel.Photo.create({
                ...req.body,
                image: '/uploads/' + uploadedImage.name
            });
            res.redirect('/');
        });
    },

    pageNation: async (req, res) => {


        const pagenumber = parseInt(req.params.pagenumber);
        if (pagenumber === 1) { return await res.redirect('/'); }
        else {

            const photos = await photoModel.Photo.find({}).sort('-dateCreated');
            const pages = {

                start: (pagenumber - 1) * 6,
                count: pagenumber * 6
            }
            if (photos.length < pagenumber * 6) pages.count = photos.length
            //New Direct
            res.render('index', { photos, pages });
        }

    }
};

module.exports = { photoController };
