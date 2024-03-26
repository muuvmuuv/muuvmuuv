const fs = require("fs")
const path = require("path")

const packages = ["marvin", "marvinheilemann", "muuvmuuv"]

const readmePath = path.join(__dirname, "..", "README.md")
let readme = fs.readFileSync(readmePath, "utf8")

readme += `
> This is a copy of the original readme: https://github.com/muuvmuuv/muuvmuuv
`

for (let i = 0; i < packages.length; i++) {
  const name = packages[i]

  const packagePath = path.join(__dirname, "..", "packages", name, "README.md")

  fs.writeFileSync(packagePath, readme)
}
