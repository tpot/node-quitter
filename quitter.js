#!/usr/bin/env node

// Unfortunately, no way to distinguish an input error from regular behaviour
const EXIT_BAD_ARGS = 255

const { parseArgs } = require('util')

// Parse command line options
let opts
try {
    opts = parseArgs({
        options: {
            exit:    { type: 'string',  short: 'e', default: '0' },   // Set exit
            signal:  { type: 'string',  short: 's', default: ''  },   // Exit with signal
            verbose: { type: 'boolean', short: 'v', default: false }, // Display some output
        }
    })
} catch (err) {
    console.log(JSON.stringify(err))
    process.exit(EXIT_BAD_ARGS)
}

// Validate command line options
const code = Number(opts.values.exit)
if (isNaN(code)) {
    console.error(`Argument to -e/--exit is not a number!`)
    process.exit(EXIT_BAD_ARGS)
}

if (opts.values.signal.length > 0) {

    // Hit ourselves with a signal
    if (opts.values.verbose) {
        console.log(`Signalling ourselves with ${opts.values.signal}`)
    }

    try {
        process.kill(process.pid, opts.values.signal)
    } catch (err) {
        console.log(JSON.stringify(err))
        process.exit(EXIT_BAD_ARGS)
    }

} else {

    // Exit with specified exit code
    if (opts.values.verbose) {
        console.log(`Exiting with status ${code}`)
    }
    process.exit(code)
}
