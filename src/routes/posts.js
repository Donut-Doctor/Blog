const express = require ('express');
const Post = require ('../models/Post');
const router = express.Router();

function isAuthenticated(req, res, next)
{
	if (req.isAuthenticated()) 
		return next();
	res.status(401).send('Not Authenticated.');
}

router.post('/create', isAuthenticated, async (req,res) => 
{
	await new Post({...req.body, author : req.user._id}).save();
	res.send('Post Created');
});

router.get("/", async (req,res) => {
	const posts =  await Post.find(req.query.category ? { category : req.query.category } : {});
	res.json(posts);
});

router.put ('/:id', isAuthenticated, async (req, res) => 
{
	await Post.findByIdUpdate(req.params.id, req.body);
	req.send('Post Updated');
});

router.delete('/:id', isAuthenticated, async (req, res) => 
{
	await Post.findByIdDelete(req.params.id);
	req.send('Post Deleted');
});

module.export = router;
