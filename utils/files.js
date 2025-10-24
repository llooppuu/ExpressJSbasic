const fs = require('node:fs/promises')

async function readFile(filename) {
    try {
        const fileContent = await fs.readFile(filename, { encoding: 'utf8' });
        const data = JSON.parse(fileContent)
        return data
    } catch (err) {
        console.error(err);
    }
}

async function writeFile(filename, data){
    try {
        data = JSON.stringify(data, null, 2)
        await fs.writeFile(filename, data, { encoding: 'utf8'})
    } catch(error){
        console.log(error)
    }
}

module.exports = { readFile, writeFile }