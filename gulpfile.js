const path = require('path')
const exeq = require('exeq')

const basePath = path.resolve(__dirname)

const selfsign = () => {
  return new Promise((resolve, reject) => {
    const electronAppPath = path.join(
      basePath,
      'node_modules',
      'electron',
      'dist',
      'Electron.app'
    )
    const shellTask = `codesign -s - -f ${electronAppPath}`
    /****
     * I'm not sure why, but signing it with or without --deep on it's own doesn't
     * seem to work, however signing it with --deep first and then signing it a
     * second time without --deep seems to work. ¯\_(ツ)_/¯
     */
    exeq(`${shellTask} --deep`, shellTask)
      .then(() => {
        console.log('success')
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

module.exports = {
  selfsign
}
