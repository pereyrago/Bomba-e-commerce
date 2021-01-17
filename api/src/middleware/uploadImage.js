const multer = require('multer');
const {Product, User}= require('../db')


 const storage = multer.diskStorage({
	destination: (req, file, cb)=>{
        cb(null, ('src/media/images'))
    },
	filename: (req, file, cb) => {
		cb(null, file.originalname.toLowerCase())
	},
})

const addProductUploader = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
        const {mimetype}= file
        // el .test evalua si el RegEx se cumple con el parametro que le pasamos
        const extensionsSupported=/jpg|jpeg|png|svg|gif|webp/.test(mimetype);
        if (!extensionsSupported) {
            return cb(new Error('only extensions [.jpeg, .jpg, .png, .svg .gif] are supported'))
        }
        cb(null, true)
	},
}).array('image')


const editProductUploader = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
        const {mimetype}= file
        const {productId}=req.params
        // el .test evalua si el RegEx se cumple con el parametro que le pasamos
        const extensionsSupported=/jpg|jpeg|png|svg|gif|webp/.test(mimetype);
        if (!extensionsSupported) {
            return cb(new Error('only extensions [.jpeg, .jpg, .png, .svg .gif] are supported'))
        }

        Product.findByPk(productId)
        .then(product => {
            if (!product) throw `product id: ${productId} does not exist`
            cb(null, true)
        })
        .catch(cb)   
	},
}).array('image')


const userUploadImg = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
        const {mimetype}= file
        const {userId}=req.params
        // el .test evalua si el RegEx se cumple con el parametro que le pasamos
        const extensionsSupported=/jpg|jpeg|png|svg|gif|webp/.test(mimetype);
        if (!extensionsSupported) {
            return cb(new Error('only extensions [.jpeg, .jpg, .png, .svg .gif] are supported'))
        }

        User.findByPk(userId)
        .then(user => {
            if (!user) throw `user id: ${userId} does not exist`
            cb(null, true)
        })
        .catch(cb)
	},
}).single('image')


/* const fileTypes = /jpeg|jpg|png|PNG/
const mimeType = fileTypes.test(file.mimetype)
const extName = fileTypes.test(path.extname(file.originalname))
if (mimeType && extName) {
    return cb(null, true)
}
cb('Error: debe subir un archivo valido') */
module.exports={
    addProductUploader,
    editProductUploader,
    userUploadImg
}