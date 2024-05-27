const assert = require('assert/strict')
const utils = require('./utils.js')

describe('Signal tests', function() {
    it('Returns 255 exit code from bad signal', async function() {
        const { code,  signal } = await utils.spawn_wait('node', ['quitter.js', '-s', 'SIGFOO'])
        assert.equal(code, 255)
        assert.equal(signal, null)
    })
    it('Exits correctly on SIGKILL', async function() {
        const { code,  signal } = await utils.spawn_wait('node', ['quitter.js', '-s', 'SIGKILL'])
        assert.equal(code, null)
        assert.equal(signal, 'SIGKILL')
    })
    it('Exits correctly on SIGTERM', async function() {
        const { code,  signal } = await utils.spawn_wait('node', ['quitter.js', '-s', 'SIGTERM'])
        assert.equal(code, null)
        assert.equal(signal, 'SIGTERM')
    })
})
