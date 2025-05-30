const express = require('express');
const session = require ('express-session');
const passport = require ('passport');
const mongoose = require ('mongoose');
const LocalStrategy = require ('passport-local').Strategy;
const User = require ('./models/User');
const authRoutes = require ('./models/auth');
const postRoutes = require ('./models/posts');
require ('dotenv').config();

const app = express();
mongoose.connect(process.env.MONGO_URL);

app.use(express.urlencoded({extended: false}));
app.use(session({secret : 'secret', resave : false, saveUninitialized: false}));

passport.use(new LocalStrategy(
async (username, password, done) => {
	const user = await User.findOne ({ username});
	if (!user || !(await require('bcrypt').compare(password, user.password)))
		{
			return done (null, false);
		}
});

passport.serializeUser(user, done) => done (null, user.id));
passport.deserilizeUser (async (id, done) => done (null, await User.findById(id)));

app.use(passport.initialize());
app.use(passport.session());

app.use(/auth', authRoutes);
app.use('/posts', postRoutes);

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
