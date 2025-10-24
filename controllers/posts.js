const { readFile } = require('../utils/files')
const { writeFile } = require('../utils/files')

function validatePost(post){
    if (3 <= post.title.length 
        && post.title.length <= 120 
        && post.content.length > 10 
        && post.author.length > 0){
        return true
    }
    return false
}

const initPost = async() => {
    const posts = await readFile("./data/posts.json")
    if (posts === null){
        return []
    }
    return posts
}

const getPosts = async(req, res) => {
    const posts = await initPost()
    const publishedPosts = posts.filter( (post) => {return post.published === true})
    res.json(publishedPosts);
}

const getPostByID = async(req, res) => {
    const posts = await initPost()
    const postID = parseInt(req.params.id)
    const post = posts.find(t => t.id === postID)
    if (!post){
        res.status(404).json({message: 'Post not found'})
    }
    else{
        res.status(201).json(post)
    }
}

const postPost = async(req, res) => {
    const posts = await initPost()
    newPost = req.body
    if (validatePost(newPost)){
        newPost.id = posts.length > 0 ? Math.max(...posts.map(t => t.id)) + 1 : 1
        newPost.createdAt = (new Date).toISOString()
        newPost.updatedAt = (new Date).toISOString()
        newPost.published = false
        posts.push(newPost)
        }
    else{
        res.status(400).json({message: 'Invalid JSON'})
        return
    }
    await writeFile('./data/posts.json', posts)
    res.status(201).json(newPost)
}

const putPost = async(req, res) => {
    const posts = await initPost()
    const id = parseInt(req.params.id)
    const index = posts.findIndex(t => t.id === id)
    postUpdate = req.body
    if (validatePost(postUpdate)){
        console.log('jtuejwhnwe')
        posts[index].title = postUpdate.title
        posts[index].content = postUpdate.content
        posts[index].author = postUpdate.author
        posts[index].published = postUpdate.published
        posts[index].updatedAt = (new Date()).toISOString()
        await writeFile('./data/posts.json', posts)
        res.status(200).json(posts[index])
    }
}

const patchPost = async(req, res) => {
    const posts = await initPost()
    const {published} = req.body

    const id = parseInt(req.params.id)
    const index = posts.findIndex(t => t.id === id)

    if (index < 0){
        res.status(404).json({message: 'Post not found'})
    }
    else{
        if (posts[index].published === false){
            posts[index].published = true
        }
        else {
            posts[index].published = false
        }
        posts[index].updatedAt = (new Date).toISOString()
        await writeFile('./data/posts.json', posts)
        res.status(201).json(posts[index])
    }
}

const deletePost = async(req, res) => {
    const posts = await initPost()
    const id = parseInt(req.params.id)
    const index = posts.findIndex(t => t.id === id)
    if (index !== -1) {
        posts.splice(index, 1)
        await writeFile('./data/posts.json', posts)
        res.status(204).json({message: 'Post has been deleted'})
    } else {
        res.status(404).json({message: 'Post not found'})
    }
}

module.exports = {
    getPosts,
    getPostByID,
    postPost,
    patchPost,
    putPost,
    deletePost
}