const express = require('express')
const upload = require('../config/multer.config')
const fileModel = require('../models/file.models')
const authMiddleWare = require('../middlewares/auth')
const router = express.Router()


router.get('/home', authMiddleWare, async(req,res)=>{

    const userFiles = await fileModel.find({
        userId: req.user.userId
    })

    res.render('home',{
        files: userFiles
    })
})

router.post('/upload-file', authMiddleWare, upload.single('file'), async(req, res)=>{

    // console.log(req.file)
    // console.log("Saving in DB by original name " + req.file.originalname)
    // console.log("Saving in DB by path " + req.file.path)
    const newFile = await fileModel.create({
        path: req.file.path,
        originalName: req.file.originalname,
        userId: req.user.userId
    })
 
    // console.log(req.file)

    res.send(newFile)
})

router.get('/download', authMiddleWare, async (req, res) => {
    console.log(req.query)
    const loggedInUserId = req.user.userId
    const filePath = req.query.path

    const file = await fileModel.findOne({
        userId: loggedInUserId,
        path: filePath
    })

    if (!file){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    console.log("File path:", filePath)

    res.download(filePath, file.originalName, err => {
        if (err) {
            return res.status(404).send('File not found')
        }
    })
})

module.exports = router
