import expres from 'express';
const router = expres.Router();
import { getPosts, updatePost, createPost, deletePost, getPostById } from '../controllers/posts/post.controller.js';


router.get('/', getPosts);
router.get('/edit/:id', getPostById);
router.put('/edit/:id', updatePost);
router.post('/new', createPost);
router.delete('/:id', deletePost)


export default router;