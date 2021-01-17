require('dotenv').config(); //Es la forma de requerir el archivo .env//
const server = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { User } = require('../db.js');

// Google login
server.get(
	'/google',
	passport.authenticate('google', {scope: ['profile', 'email'], display: 'popup'})
);

server.get(
	'/google/redirect',
	passport.authenticate('google'),
	function(req, res) {
		let token;
		let user =  req.user
		token = jwt.sign({
			user
		}, 'ecommerce-ft06-g07' , { expiresIn: 60*60*24*30}) 
		res.redirect("http://localhost:3000/LoginAuth?token=" + token)
		
	}
)

// Facebook login
server.get('/facebook', passport.authenticate('facebook', {scope: ['email'], display: 'popup'}));

server.get(
	'/facebook/redirect',
	passport.authenticate('facebook'), 
	function(req, res) {
		let token;
		let user =  req.user
		token = jwt.sign({
			user
		}, 'ecommerce-ft06-g07' , { expiresIn: 60*60*24*30}) 
		res.redirect("http://localhost:3000/LoginAuth?token=" + token)
		
	}
);

// Local login
server.post('/login', passport.authenticate('local'), (req, res) => {
	res.send(req.user);
});

server.post('/logout', (req, res) => {
	if (req.isAuthenticated()) {
		req.logout();
		res.sendStatus(200);
	}
	else res.status(400).send('No estabas logeado :/');
});

server.get('/me', (req, res) => {
	if (req.isAuthenticated()) return res.send(req.user);
	else return res.status(401).send('No estás logeado');
});

module.exports = server;