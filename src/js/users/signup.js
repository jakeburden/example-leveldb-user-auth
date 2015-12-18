const xhr = require('xhr')
const login = require('./login')

module.exports = ui => {
  const username = ui.username()
  const email = ui.email()
  const password = ui.password()
  const confirmPassword = ui.confirmPassword()
  const creds = {
    username: username.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  }
  xhr({
    json: creds,
    uri: '/signup',
    method: 'POST'
  }, (err, resp, body) => {
    if (err) console.error(err)
    if (body === `${creds.username} has signed up!\n`) {
      console.log('sign up', body)
      login(ui)
    } else {
      console.log('not signed up', body)
    }
  })
}
