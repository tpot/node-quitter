const assert = require('assert/strict')
const { spawn } = require('child_process')

function spawn_wait(command, args) {
    const p = spawn(command, args)
    return new Promise((resolve, reject) => {
        p.on('exit', (code, signal) => resolve({ code, signal }))
        p.on('error', err => reject(err))
    })
}

describe('Exit code tests', function() {
    it('Returns zero exit code with no args', async function() {
        const { code,  signal } = await spawn_wait('node', ['quitter.js'])
        assert.equal(code, 0)
        assert.equal(signal, null)
    })
    it('Returns exit code using -e', async function() {
        const { code,  signal } = await spawn_wait('node', ['quitter.js', '-e', '123'])
        assert.equal(code, 123)
        assert.equal(signal, null)
    })
    it('Returns exit code using --exit', async function() {
        const { code,  signal } = await spawn_wait('node', ['quitter.js', '--exit', '123'])
        assert.equal(code, 123)
        assert.equal(signal, null)
    })
    it('Returns 255 exit code from cmd line opts', async function() {
        const { code,  signal } = await spawn_wait('node', ['quitter.js', '-e', 'foo'])
        assert.equal(code, 255)
        assert.equal(signal, null)
    })
})
