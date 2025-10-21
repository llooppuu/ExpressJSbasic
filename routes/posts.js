const express = require('express')
const router = express.Router()

const { getPosts, createPost, getPostById, updatePost, publishPost, deletePost } =
require('../controllers/posts')

router.get('/', (req, res) => getPosts(req, res));

router.post('/', (req, res) => createPost(req, res));

router.get('/:id', (req, res) => getPostById(req, res));

router.put('/:id', (req, res) => updatePost(req, res));

router.patch('/:id/publish', (req, res) => publishPost(req, res));

router.delete('/:id', (req, res) => deletePost(req, res));

module.exports = router
