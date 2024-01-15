
const photoModel = require('../models/Photos');

const pageController = (page) =>
    async (req, res) => {

        res.render(page);
    }


module.exports = { pageController };