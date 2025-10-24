const express = require('express')
const router = express.Router()

const { getPosts, postPost, getPostByID, putPost, patchPost, deletePost } = require('../controllers/posts');

router.get('/', getPosts);
router.post('/', postPost);
router.get('/:id', getPostByID);
router.put('/:id', putPost);
router.patch('/:id/publish', patchPost);
router.delete('/:id', deletePost);

module.exports = router;