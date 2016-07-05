const readline = require('readline')
const os = require('os')

const parse = require('./src/parse')
const dispatch = require('./src/dispatch')
const { red } = require('./src/utils/colors')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.setPrompt('> ')
rl.prompt()

const handleInput = function (parsedInput) {
  dispatch(parsedInput)
    .then((response) => {
      if (response) { console.log(response) }
      rl.prompt()
    })
    .catch((error) => {
      console.error(error)
      rl.prompt()
    })
}

rl.on('line', (input) => {
  if (!input) { return rl.prompt() }

  parse(input)
    .then(handleInput)
    .catch((error) => {
      console.error(`${ red('ERROR: ') + error }`)
      rl.prompt()
    })
})

rl.on('close', () => {
  rl.write(os.EOL)
  process.exit(0)
})
