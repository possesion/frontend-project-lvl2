#!/usr/bin/env node
import program from 'commander';


program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')

program.parse(process.argv);

console.log('type \'gendiff -h\' for more info');