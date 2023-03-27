// implement your posts router here
const express = require('express')
//const Posts = require('./posts-model')

const router = express.Router()

/*
postRouter.get('/', (req, res)=>{
    Posts.find()
    .then(posts => {
        res.status(200).json([posts])
    })
    .catch(error=> {
        console.log(error);
        res.status(500).json({message: "The posts information could not be retrieved"})
    })
}) */
router.get('/' , (req, res)=>{
 res.json('yay')
})
router.get( '/:id', (req, res)=>{

})
router.post('/' , (req, res)=>{

})
router.delete('/:id' , (req, res)=>{

})
router.put('/:id' , (req, res)=>{

})
router.get('/' , (req, res)=>{

})
 module.exports = router