// custom JSON-placeholder server
const path = require('path');
const express = require('express');
const jsonServer = require('json-server');
const multer = require('multer');
const auth = require('./auth');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const staticDir = path.join(__dirname, 'public');
const middlewares = jsonServer.defaults();
const upload = multer({ dest: 'server/public/img' });

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(express.static(staticDir));

//in case there's a signup, validate fields and add random token first
server.post('/signup', auth.createUser);

server.post('/login', auth.login);
//make sure user has permissions
//TODO: uncomment the next line to use authentication!!!!
server.use(auth.isAuthorized);

//update contact creation to use default user image from server if no image provided
server.post('/contacts', (req, res, next) => {
  if(!req.body.picture || req.body.picture == "")
    req.body.picture = `http://localhost:3000/img/default-user.png`;
  next();
});

//update contact with image file, if provided
server.patch('/contacts/:id', upload.single('picture'), (req, res, next) => {
  if(req.file)
    req.body.picture = `http://localhost:3000/img/${req.file.filename}`;
  next();
});

//process CRUD ops on route resource based on db structure
server.use(router);

//remove user stored passwords from responses
router.render = (req, res) => {
  auth.cleanPasswords(req, res);
}

server.listen(3000, () => {
  console.log('JSON Server is running')
});