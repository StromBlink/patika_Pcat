const express = require('express')

const app = express();

app.get(`/`, (req, res) => {

    const photo = {
        id: 1,
        name: "Photo Name",
        descripton: "photo descripton"
    }
    res.send(photo)
})


const port = 3000;
app.listen(port, () => {
    console.log(`${port} port started`);
});

