#!/usr/bin/env node
import program from 'commander';
import compareObjects from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(compareObjects(filepath1, filepath2));
  });

program.parse(process.argv);
//  console.log('type \'gendiff -h\' for more info');
