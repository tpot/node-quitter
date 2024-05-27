const assert = require('assert/strict')
const { spawn } = require('child_process')

function spawn_wait(command, args) {
    const p = spawn(command, args)
    return new Promise((resolve, reject) => {
        p.on('exit', (code, signal) => resolve({ code, signal }))
        p.on('error', err => reject(err))
    })
}

describe('Signal tests', function() {
    it('Returns 255 exit code from bad signal', async function() {
        const { code,  signal } = await spawn_wait('node', ['quitter.js', '-s', 'SIGFOO'])
        assert.equal(code, 255)
        assert.equal(signal, null)
    })
    it('Exits correctly on SIGKILL', async function() {
        const { code,  signal } = await spawn_wait('node', ['quitter.js', '-s', 'SIGKILL'])
        assert.equal(code, null)
        assert.equal(signal, 'SIGKILL')
    })
    it('Exits correctly on SIGTERM', async function() {
        const { code,  signal } = await spawn_wait('node', ['quitter.js', '-s', 'SIGTERM'])
        assert.equal(code, null)
        assert.equal(signal, 'SIGTERM')
    })
})
