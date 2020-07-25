const fs = require('fs')
const path = require('path')

const { packages } = require('./utils')

const readmePath = path.join(__dirname, '..', '..', 'README.md')
let readme = fs.readFileSync(readmePath, 'utf8')

readme += `
> This is an copy from the original file located here: xxx
`

for (let i = 0; i < packages.length; i++) {
  const name = packages[i]

  const packagePath = path.join(__dirname, '..', name, 'README.md')

  fs.writeFileSync(packagePath, readme)
}
