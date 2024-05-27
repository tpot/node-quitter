const { spawn } = require('child_process')

function spawn_wait(command, args) {
    const p = spawn(command, args)
    return new Promise((resolve, reject) => {
        p.on('exit', (code, signal) => resolve({ code, signal }))
        p.on('error', err => reject(err))
    })
}

module.exports = { spawn_wait }
