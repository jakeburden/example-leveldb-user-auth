const setTemplate = require('./setTemplate')

module.exports = (handler, container) => {
  handler.addEventListener('click', e => {
    e.preventDefault()
    const pathname = e.target.pathname.slice(1)
    setTemplate(container, pathname)
  })
}
