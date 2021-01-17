const server = require('express').Router();
const {addProductUploader}= require('./../middleware/uploadImage')
const {Image}= require('./../db')

// Ruta que devuelve una imagen
server.get('/:imageFilename', (req, res, next) => {
    const { imageFilename } = req.params;
    if (!imageFilename) {
        return res.status(400).send('A filename is required to show the image');
    }
    var splitedPath = __dirname.split(/\/|\\/)
    splitedPath.pop()
    res.sendFile(splitedPath.join('/') + '/media/images/' + imageFilename)
})

server.post('/', addProductUploader , (req, res, next) => {
    const { files } = req;
    if (!files) return res.status(400).send('A filename is required to show the image');
    
    let imagePromise = files.map(image=> Image.create({imgUrl:`/image/${image.filename}`, productId: 4}))
    Promise.all([...imagePromise])
    .then(()=>res.sendStatus(200))
    .catch(()=> res.sendStatus(500))
})

module.exports = server;