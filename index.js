const http = require('http')
const fs = require('fs')

const pass = require('pwd')
const cookie = require('cookie')
const body = require('body/any')
const hyperstream = require('hyperstream')
const oppressor = require('oppressor')

const st = require('st')
const serve = st({
  path: 'public'
})

const level = require('level')
const db = level('db', {
  keyEncoding: require('bytewise'),
  valueEncoding: 'json'
})

const sessions = {}

const userLogin = require('./routes/users/login')(sessions, cookie)
const userAction = require('./lib/userAction')(body, db, pass)
const userSignUp = require('./routes/users/signup')

const render = require('./lib/render')(oppressor, fs, hyperstream, cookie, sessions, db)
const renderSignUp = render('signup')
const renderLogin = render('login')
const renderLogout = render('logout')

const routes = require('patterns')()

routes.add('GET /', (req, res) => render('index')(req, res))

routes.add('GET /signup', renderSignUp)
routes.add('POST /signup', userAction(userSignUp))

routes.add('GET /login', renderLogin)
routes.add('POST /login', userAction(userLogin))

routes.add('GET /logout', renderLogout)

http.createServer((req, res) => {
  const m = routes.match(req.method + ' ' + req.url)
  if (!m) {
    serve(req, res)
    return
  }
  m.value(req, res)
}).listen(9090, () => {
  console.log('server is listening on http://127.0.0.1:9090')
})
