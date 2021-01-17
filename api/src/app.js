const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const {User,Image} = require('./db.js')
// declaraciones para uso del Passport
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const cors = require('cors')

//Deprecamos claves del Passport
const {
	googleClientID,
	googleClientSecret,
	facebookClientID,
	facebookClientSecret
} = process.env;


const server = express();

server.name = 'API';
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH'); //allows using all 4 request types
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

var sess = {
	secret: 'larala',
	resave: false,
	saveUninitialized: true
  }
  if (server.get('env') === 'production') {
	server.set('trust proxy', 1)
	sess.cookie = { secure: true, sameSite: 'none' }
  }

server.use(session(sess));

passport.use(
	new GoogleStrategy(
		{
      clientID: googleClientID,
      clientSecret: googleClientSecret,
			callbackURL: '/auth/google/redirect'
		},
		async (accessToken, refreshToken, profile, done) => {
			photo=profile.photos[0].value
			try {
				const [user, created] = await User.findOrCreate({
					where: {email: profile.emails[0].value},
					defaults: {first_name: profile.name.givenName,
							   last_name: profile.name.familyName,
							   rol: 'user',
							   reset: true,
							   googleId: profile.id}
				});
				// On error
				if (!user) return done(null, false, {message: 'No pudimos loguearte con esa cuenta'});
				// On success
				Image.create({imgUrl: photo, userId: user.dataValues.id})
				.then(resp=>{
					res.send(200)
				})
				return done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: facebookClientID,
			clientSecret: facebookClientSecret,
			callbackURL: '/auth/facebook/redirect',
			profileFields: ['id', 'emails', 'displayName']
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log(profile)
			try {
				var usuario = profile.displayName.split(' ')
				var nombre = usuario[0]
				var apellido = usuario[usuario.length-1]
			
				const [user, created] = await User.findOrCreate({
					where: {email: profile.emails[0].value},
					defaults: {first_name: nombre,
						last_name: apellido,
						rol: 'user',
						reset: true,
						facebookId: profile.id}
				});
				
				// On error
				if (!user) return done(null, false, {message: 'No pudimos loguearte con esa cuenta'});
				
				// On success
				/* Image.create({imgUrl: photo, userId: user.dataValues.id}) */
			/* 	.then(resp=>{
					res.send(200)
				}) */
				return done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(function(id, done) {
	User.findByPk(id).then(user => done(null, user)).catch(err => done(err, null));
});

// ================= Sessions ============================== //

//server.use(session({secret: passportSecret, resave: false, saveUninitialized: true}));

server.use(passport.initialize());
server.use(passport.session());

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;