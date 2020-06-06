#!/usr/bin/env node
import program from 'commander';


program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action(function(filepath1, filepath2) {
    pathValue1 = filepath1
    pathValue2 = filepath2
    });

program.parse(process.argv);

console.log('type \'gendiff -h\' for more info');
