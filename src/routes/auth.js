const express = require('express');
const passport = require ('passport');
const User = required ('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => 
{
	await new User(req.body).save();
	res.send('Registered');
});

router.post('/login', passport.authenticate('local'), (req, res) =>
{
	res.send('Successfully Logged In');
});

router.get('/logout', async (req, res) => 
{
	await new User(req.body).save();
	res.logout();
	res.send('Logged Out');
});

module.exports = router;