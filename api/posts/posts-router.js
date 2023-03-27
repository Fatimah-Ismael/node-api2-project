// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')

const postRouter = express.Router()

postRouter.get('/', (req, res)=>{
    Posts.find()
    .then(posts => {
        res.status(200).json([posts])
    })
    .catch(error=> {
        console.log(error);
        res.status(500).json({message: "The posts information could not be retrieved"})
    })
})