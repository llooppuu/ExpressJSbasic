const express = require("express");

const app = express();
app.use(express.json());

const postsRoutes = require('./routes/posts.js')
app.use('/posts', postsRoutes)

app.listen(3002, () => {
  console.log("Server is running at http://localhos:3002/")
});
