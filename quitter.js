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

// Exit with specified exit code
if (opts.values.verbose) {
    console.log(`Exiting with status ${code}`)
}
process.exit(code)
