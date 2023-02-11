#!/usr/bin/env node

const { main } = require('../dist/main.js');

const returnValue = main(process.argv[2], process.argv[3]);
process.exit(returnValue);