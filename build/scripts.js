const fs = require('fs')

const browserify = require('browserify')
const concat = require('concat-stream')
const uglifyjs = require('uglify-js')

browserify('./src/js/index.js')
  .transform('babelify', {presets: ['es2015']})
  .bundle()
  .pipe(concat(body => {
    const code = body.toString()
    const result = uglifyjs.minify(code, {fromString: true})
    fs.writeFileSync('public/scripts/bundle.js', result.code)
  }))
