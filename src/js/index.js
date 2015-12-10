const ui = require('./ui')
const pushState = require('./lib/pushState')

ui.nav.addEventListener('click', e => {
  e.preventDefault()
  pushState(e.target.pathname)
})
