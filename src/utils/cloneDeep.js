/**
 * Naive solution. It works in this application since we aren't tracking
 * any complex state or functions.
 */
const cloneDeep = function (sourceObject) {
  return JSON.parse(
    JSON.stringify(sourceObject)
  )
}

module.exports = cloneDeep
