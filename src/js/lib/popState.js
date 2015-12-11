const setTemplate = require('./setTemplate')

module.exports = (handler, container) => {
  window.addEventListener('popstate', () => {
    const pathname = window.location.pathname.slice(1)
    setTemplate(container, pathname)
  })
}
