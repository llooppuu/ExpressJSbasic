const express = require('express');

const app = express();
app.use(express.json());

app.get('/posts', (req, res) => {
    res.json(posts);
});



app.post('/posts', (req, res) => {
    const {title, content, author} = req.body;
    if(!title || !content || !author) {
        res.status(400).json({ message: 'Title, content and author are required'});
        return;
    }
    const newPost = {};
    newPost.title = title;
    newPost.content = content
    newPost.author = author;
    newPost.published = false;
    newPost = createdAt = new Date().toISOString();
    newPost = updateAt = new Date().toISOString();
    if(posts.length > 0) {
        newPost.id = posts[posts.length - 1].id + 1;
    }  else {
        newPost.id = 1;
    }
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.get('/posts/:id', (req, res) => {
    console.log(req.params.id)
    const id = parseInt(req.params.id)
    const post = posts.find( (post) => {
        return post.id === id && post.published === true;
    });
    if(!post) {
        res.status(404).json({ message: 'Post not found' })
    }
})

app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
});