const {
  get,
  set,
  remove,
  count,
  newContext,
  commit,
  rollback
} = require('./state')

const dispatch = function (action) {
  return new Promise((resolve, reject) => {
    const { command } = action

    switch (command) {
      case 'GET':
        return resolve(
          get(action.key)
        )
      case 'SET':
        return resolve(
          set(action.key, action.value)
        )
      case 'DELETE':
        return resolve(
          remove(action.key)
        )
      case 'COUNT':
        return resolve(
          count(action.value)
        )
      case 'BEGIN':
        return resolve(
          newContext()
        )
      case 'COMMIT':
        return commit()
          .then(resolve)
          .catch(reject)
      case 'ROLLBACK':
        return rollback()
          .then(resolve)
          .catch(reject)
      default:
        return reject('Unknown command.')
    }
  })
}

module.exports = dispatch
