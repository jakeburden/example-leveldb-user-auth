const http = require('http')

const routes = require('patterns')()
const st = require('st')
const serve = st({
  path: 'public'
})

const userSignUp = require('./routes/users/signup')
const userLogin = require('./routes/users/login')

routes.add('POST /signup', userSignUp)
routes.add('GET /login', userLogin)

http.createServer((req, res) => {
  const m = routes.match(req.method + ' ' + req.url)
  if (!m) {
    serve(req, res)
    return
  }
  m.value(req, res)
}).listen(9090, () => console.log('server is listening on http://0.0.0.0:9090'))
