// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')

const router = express.Router()

router.get('/' , (req, res)=>{
Posts.find()
.then(posts => {
    res.json(posts)
})
.catch(err=> {
    res.status(500).json({message: "The posts information could not be retrieved",
    err: err.message
    })
})
})
router.get( '/:id', (req, res)=>{
 Posts.findById(req.params.id)
    .then(post => {
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        }
    })
    .catch(err=>{
        res.status(500).json({ message: "The post information could not be retrieved",
        err: err.message
    })
    })
})
router.post('/' , (req, res)=>{
    const { title, contents }= req.body
    if(!title || !contents){
        res.status(400).json({ 
            message: "Please provide title and contents for the post"})
    }else {
         Posts.insert({title, contents})
        .then(({id})=> {
        return Posts.findById(id)
    })
    
    .then(createdPost=>{
        res.status(201).json(createdPost)
    })
    .catch(err=> {
        res.status(500).json({ message: "There was an error while saving the post to the database",
        err: err.message
    })
    })

}
})
router.delete('/:id' , async (req, res)=>{
    
try {
    const erase= await Posts.findById(req.params.id)
    if(!erase){
        res.status(404).json({ message: "The post with the specified ID does not exist"})
    } else{
        await Posts.remove(req.params.id)
        res.json(erase)
    }
}catch(err){
    res.status(500).json({
        message: "The post could not be removed",
        err: err.message
    })

}
})
router.put('/:id', (req, res)=>{
    const id = req.params.id
    const {title, contents } = req.body
    if(!title || !contents){
        res.status(400).json({ message: 'Please provide title and contents for the post'})
    } else{
        Posts.findById(id)
        .then(post=>{
            if(!post){
                res.status(404).json({ message: "The post with teh specified Id does not exist"})
            } else{
                return Posts.update(id, req.body)
            }
        })
        .then(data=>{
            if(data){
                return Posts.findById(id)
            }
        })
        .then(post =>{
            if(post){
                res.json(post)
            }
        }) .catch(err=>{
            res.status(500).json({ message: "The post information could not be modified", 
            err: err.message
    })
        })
    } 
        
    
})

 
router.get('/:id/comments' , async (req, res)=>{
    const id = req.params.id
    try{ 
        const post = await Posts.findById(id)
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        } else{
            const comments = await Posts.findPostComments(id)
            res.json(comments)
        }
    
    } catch(err){
        res.status(500).json({
           message: "The comments information could not be retrieved",
           err: err.message
        })
    }
}) 
 module.exports = router