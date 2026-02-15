import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { getPosts, updatePost, createPost,deletePost,getPostById } from './controllers/posts/post.controller.js';
import router from './routes/post.route.js';
const PORT = process.env.LOCAL_PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use('/post', router)

app.get('/new-post', (req, res) => {
    console.log('post new')
    res.render('create-post')
})

app.listen(PORT,()=>{
    console.log("Server hosted on port " + PORT)
})