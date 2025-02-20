import fs from 'node:fs'
import path from 'node:path'

const packages = ['marvin', 'marvinheilemann', 'muuvmuuv']

const readmePath = path.resolve('./', 'README.md')
let readme = fs.readFileSync(readmePath, 'utf8')

readme += `
> This is a copy of the original readme: https://github.com/muuvmuuv/muuvmuuv
`

for (let i = 0; i < packages.length; i++) {
	const name = packages[i]

	const packagePath = path.join('./', 'packages', name, 'README.md')

	fs.writeFileSync(packagePath, readme)
}
