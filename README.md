## GenDiff Util
### About 
<hr/>
Compare two configuration files. Pass two files, choose format and that's it. <br/>  
<a href="https://codeclimate.com/github/possesion/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/01d535a023416c5787f0/test_coverage" /></a>

<a href="https://codeclimate.com/github/possesion/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/01d535a023416c5787f0/maintainability" /></a>

![](https://github.com/possesion/frontend-project-lvl2/workflows/main.yml/badge.svg)

## Setup
$ make install
## Run tests
$ make test
## How to use
$ gendiff [-format] <path_1> <path_2> 
(use flag '-h' for more info)

## Examples
#### $ gendiff stylish formatter
<a href="https://asciinema.org/a/kARlORnAXAbMA84a1nA6W14Gd" target="_blank"><img src="https://asciinema.org/a/kARlORnAXAbMA84a1nA6W14Gd.svg" /></a>

#### $ gendiff -f plain path/to/first.json path/to/second.json
<a href="https://asciinema.org/a/8cNIo53bhJLCqlfkNFUfLLAvR" target="_blank"><img src="https://asciinema.org/a/8cNIo53bhJLCqlfkNFUfLLAvR.svg" /></a>


#### $ gendiff json formatter
<a href="https://asciinema.org/a/67Rzybs1fmotQ6BBqFw8cv0vL" target="_blank"><img src="https://asciinema.org/a/67Rzybs1fmotQ6BBqFw8cv0vL.svg" /></a>

