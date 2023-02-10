#!/usr/bin/env node

const { main } = require('../dist/main.js');

const argument = process.argv[2];
main(argument);