/* @flow */
/* eslint no-multi-spaces: 0 */

var gameMap = {
  start: {
    x: 1,
    y: 4
  },
  end: {
    x: 18,
    y: 7
  },
  components: [
    [-1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [-1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [-1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [-1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  1,  0,  0,  0,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  1,  0,  0,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  1,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  1, -1, -1, -1,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0],
    [-1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0]
  ]
}

var mapName = (location.search || '').replace('?map=', '') || ''

if (mapName) {
  var rawMap = localStorage.getItem(mapName)
  if (rawMap) {
    try {
      gameMap = JSON.parse(rawMap)
    } catch (e) {
      console.error(e)
    }
  }
}

export default gameMap
