const assert = require('assert/strict')
const utils = require('./utils.js')

describe('Exit code tests', function() {
    it('Returns zero exit code with no args', async function() {
        const { code,  signal } = await utils.spawn_wait('node', ['quitter.js'])
        assert.equal(code, 0)
        assert.equal(signal, null)
    })
    it('Returns exit code using -e', async function() {
        const { code,  signal } = await utils.spawn_wait('node', ['quitter.js', '-e', '123'])
        assert.equal(code, 123)
        assert.equal(signal, null)
    })
    it('Returns exit code using --exit', async function() {
        const { code,  signal } = await utils.spawn_wait('node', ['quitter.js', '--exit', '123'])
        assert.equal(code, 123)
        assert.equal(signal, null)
    })
    it('Returns 255 exit code from cmd line opts', async function() {
        const { code,  signal } = await utils.spawn_wait('node', ['quitter.js', '-e', 'foo'])
        assert.equal(code, 255)
        assert.equal(signal, null)
    })
})
