const cloneDeep = require('./utils/cloneDeep')
const contextHierarchy = []

let globalState = {}
let transactionContext = undefined

const state = function () {
  return transactionContext || globalState
}

const get = function (key) {
  return state()[key] || 'key not set'
}

const set = function (key, value) {
  state()[key] = value
}

const remove = function (key) {
  delete state()[key]
}

const count = function (value) {
  const currentState = state()

  const duplicates = Object.keys(currentState)
    .filter((stateKey) => {
      return currentState[stateKey] === value
    })

  // Stringify to mitigate any conditionals which would consider 0 to be falsy
  return `${ duplicates.length }`
}

const newContext = function () {
  const newContext = cloneDeep(state())

  contextHierarchy.push(newContext)
  transactionContext = newContext
}

const commit = function () {
  return new Promise((resolve, reject) => {
    if (typeof transactionContext === 'undefined') {
      return reject('no transaction')
    }

    const nextState = contextHierarchy.pop()
    const nestedContextLength = contextHierarchy.length

    if (nestedContextLength) {
      transactionContext = cloneDeep(nextState)
      contextHierarchy[nestedContextLength - 1] = cloneDeep(nextState)
    } else {
      transactionContext = undefined
      globalState = cloneDeep(nextState)
    }

    return resolve()
  })
}

const rollback = function () {
  return new Promise((resolve, reject) => {
    if (typeof transactionContext === 'undefined') {
      return reject('no transaction')
    }

    contextHierarchy.pop()

    const nestedContextLength = contextHierarchy.length

    if (nestedContextLength) {
      transactionContext = cloneDeep(
        contextHierarchy[nestedContextLength - 1]
      )
    } else {
      transactionContext = undefined
    }

    return resolve()
  })
}

module.exports = {
  get,
  set,
  remove,
  count,
  newContext,
  commit,
  rollback
}
