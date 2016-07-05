const { cyan } = require('./utils/colors')

const validations = {
  'GET': {
    chunks: 2,
    format: 'GET <key>'
  },
  'SET': {
    chunks: 3,
    format: 'SET <key> <value>'
  },
  'DELETE': {
    chunks: 2,
    format: 'DELETE <key>'
  },
  'COUNT': {
    chunks: 2,
    format: 'COUNT <value>'
  },
  'BEGIN': {
    chunks: 1,
    format: 'BEGIN'
  },
  'COMMIT': {
    chunks: 1,
    format: 'COMMIT'
  },
  'ROLLBACK': {
    chunks: 1,
    format: 'ROLLBACK'
  }
}

const validCommands = Object.keys(validations)

const parse = function (input) {
  return new Promise((resolve, reject) => {
    const chunks = input.split(' ')
    const [ command ] = chunks
    const commandValidations = validations[command]

    if (!commandValidations) {
      return reject(
        `Invalid command. You can use: ${ cyan(validCommands.join(', ')) }`
      )
    }

    if (commandValidations.chunks !== chunks.length) {
      return reject(
        `Invalid command format. Use: ${ cyan(commandValidations.format) }`
      )
    }

    const response = { command }

    commandValidations.format.split(' ').forEach((chunk, index) => {
      // Skip the command as its already been added and formatted
      if (index === 0) { return }
      response[chunk.replace(/<|>/gi, '')] = chunks[index]
    })

    return resolve(response)
  })
}

module.exports = parse
