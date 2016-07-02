const resetValue = 0;
const redValue = 31;
const cyanValue = 36;

const escapeColor = function (value) {
  return `\x1b[${ value }m`;
}

const buildString = function (text, colorValue) {
  return escapeColor(colorValue) + text + escapeColor(resetValue)
}

const colors = {
  red (text) {
    return buildString(text, redValue);
  },
  cyan (text) {
    return buildString(text, cyanValue);
  }
}

module.exports = colors
