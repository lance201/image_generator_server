import * as images from './model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Retrieve images. 
*/
app.get('/home', (req, res) => {
    let filter = {};

    images.findImages(filter, '', 0)
        .then(images => {
            res.json(images);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Update the image whose id is provided in the path parameter and set
 */
 app.put('/favorite/:_id', (req, res) => {
    images.updateImage(req.params._id, req.body.fav)
        .then(modifiedCount => {
            if (modifiedCount === 1) {
                res.json({ _id: req.params._id, fav: req.body.fav})
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});