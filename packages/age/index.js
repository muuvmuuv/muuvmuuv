const fs = require('fs')
const path = require('path')

const readmePath = path.join(__dirname, '..', '..', 'README.md')
let readme = fs.readFileSync(readmePath, 'utf8')

const birthdayYear = 1996
const thisYear = new Date().getFullYear()
const myAge = thisYear - birthdayYear

readme = readme.replace(/<age>.*?<\/age>/, `<age>${myAge}</age>`)

fs.writeFileSync(readmePath, readme)
