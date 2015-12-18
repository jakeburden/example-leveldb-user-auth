const xhr = require('xhr')

module.exports = ui => {
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
    }
  })
}
