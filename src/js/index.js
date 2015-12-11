const templates = require('./templates')
const ui = require('./ui')
const pushState = require('./lib/pushState')
const router = require('./lib/router')

router(ui.nav, ui.app)

window.addEventListener('popstate', () => {
  const pathname = window.location.pathname.slice(1)
  if (templates[pathname]) {
    ui.app.innerHTML = templates[pathname]
  } else {
    pushState('/')
    ui.app.innerHTML = ''
  }
})
