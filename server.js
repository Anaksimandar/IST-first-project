import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { getPosts, updatePost, createPost,deletePost,getPostById } from './controllers/posts/post.controller.js';

const PORT = process.env.LOCAL_PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', getPosts);

app.get('/new-post', (req, res) => {
    console.log('post new')
    res.render('create-post')
})

app.get('/post/:id', getPostById)

app.post('/post/edit/:id', updatePost);

app.post('/new-post', createPost);

app.delete('/post/:id', deletePost)

app.listen(PORT,()=>{
    console.log("Server hosted on port " + PORT)
})