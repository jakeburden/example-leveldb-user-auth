const xhr = require('xhr')
const pushState = require('../lib/pushState')

const login = ui => {
  const username = ui.username()
  const password = ui.password()
  const creds = {
    username: username.value,
    password: password.value
  }
  console.log('login creds', creds)
  xhr({
    json: creds,
    uri: '/login',
    method: 'POST'
  }, (err, resp, body) => {
    if (err) console.error(err)
    if (body === 'Incorrect username or password\n') {
      console.log('not logged in', body)
    } else {
      console.log('logged in', body)
      if (body.username) {
        pushState('/')
        const user = ui.user()
        const main = ui.app()
        main.innerHTML = ''
        user.innerHTML = `Hello, ${body.username}`
      } else login(ui)
    }
  })
}
module.exports = login
