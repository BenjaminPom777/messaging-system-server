const express = require('express')
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const messagesRoutes = require('./controller/messagesRoute');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');


const port = process.env.PORT || 4000;


const users = [];

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  app.use(express.urlencoded({ extended: false }))
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use(express.static(path.join(__dirname, 'client/messaging-system/build')));

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)


app.use(session({
  secret: 'fwefwefwf',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('I am ok!')
})



app.post('/api/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {  
    if (err) { return res.status(500).send(err) }
    // if (!user) { return res.redirect('/login'); }
    if (user) {
      req.logIn(user.id, function (err) { //serialization
        if (err) { return next(err); }
        // return res.redirect('/users/' + user.username);
        return res.status(200).send({ id: user.id, email: user.email })
      });
    }

  })(req, res, next);
});

app.post('/api/register', (req, res) => {
  const data = req.body;
  if (data && data.userName && data.password) {
    const user = {
      id: Date.now().toString(),
      email: data.userName,
      password: bcrypt.hashSync(data.password, 10)
    }
    for (const existingUser of users) {
      if (existingUser.email === user.email) {
        return res.status(409).send('User with that username already exist')
      }
    }
    users.push(user);
    console.log('users :', users)
    return res.status(200).send('ok')
  } else {
    return res.status(404).send('Some of the required parameters is missing')
  }
})

app.delete('/api/logout', (req, res) => {
  req.logOut()
  res.status(200).send('ok')
})

app.get('/api/user', checkAuthenticated, (req, res) => {
  if (req.user) {
    const user = users.find(user => user.id === req.user)
    if (user){
      res.status(200).send({email:user.email, id:user.id })
    }    
  }
})

app.get('/api/messages', checkAuthenticated, messagesRoutes.getUserMessagesHandler)
app.post('/api/message', checkAuthenticated, messagesRoutes.postMessageHandler)
app.delete('/api/message', checkAuthenticated, messagesRoutes.deleteMessageHandler)


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(403).send('not authenticated')
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/messaging-system/build/index.html'));
});


app.listen(port, () => {
  console.log(`listening at port: ${port}`)
})


