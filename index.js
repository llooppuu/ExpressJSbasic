const express = require('express');
const app = express();

app.use(express.json());

let posts = [];
let idCounter = 1;


const validatePost = (post) => {
    const errors = [];

    if (!post.title || typeof post.title !== 'string' || post.title.length < 3 || post.title.length > 120) {
        errors.push('Title must be a string between 3 and 120 characters.');
    }

    if (!post.content || typeof post.content !== 'string' || post.content.length < 10) {
        errors.push('Content must be at least 10 characters.');
    }

    if (!post.author || typeof post.author !== 'string') {
        errors.push('Author is required.');
    }

    return errors;
};


app.get('/posts', (req, res) => {
    let result = [...posts];
    const { q, published } = req.query;

    if (q) {
        const lowerQ = q.toLowerCase();
        result = result.filter(
            p => p.title.toLowerCase().includes(lowerQ) || p.content.toLowerCase().includes(lowerQ)
        );
    }

    if (published === 'true' || published === 'false') {
        const isPublished = published === 'true';
        result = result.filter(p => p.published === isPublished);
    }

    res.json(result);
});


app.post('/posts', (req, res) => {
    const data = req.body;

    const errors = validatePost(data);
    if (errors.length) {
        return res.status(400).json({ errors });
    }

    const newPost = {
        id: idCounter++,
        title: data.title,
        content: data.content,
        author: data.author,
        published: typeof data.published === 'boolean' ? data.published : false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    posts.push(newPost);
    res.status(201).json(newPost);
});


app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json(post);
});


app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: 'Post not found' });

    const data = req.body;
    const errors = validatePost(data);
    if (errors.length) return res.status(400).json({ errors });

    const updatedPost = {
        ...posts[index],
        title: data.title,
        content: data.content,
        author: data.author,
        published: typeof data.published === 'boolean' ? data.published : false,
        updatedAt: new Date().toISOString()
    };

    posts[index] = updatedPost;
    res.json(updatedPost);
});


app.patch('/posts/publish/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const { published } = req.body;
    if (typeof published !== 'boolean') {
        return res.status(400).json({ errors: ['"published" must be true or false'] });
    }

    post.published = published;
    post.updatedAt = new Date().toISOString();

    res.json(post);
});


app.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: 'Post not found' });

    posts.splice(index, 1);
    res.status(204).send(); 
});


app.listen(3002, () => {
    console.log('Express server running at http://localhost:3002');
});
