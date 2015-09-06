/* @flow */

import PIXI from 'pixi.js'
import {any, map, range, reduce} from 'lodash'

import * as C from './constants'
import gameMap from './maps/test'

function createCharacter() {
  var imgs = map(range(1, 5), num => `img/char/frame0${num}_handDown.png`)
  var textureArray = map(imgs, img => PIXI.Texture.fromImage(img))
  var char = new PIXI.MovieClip(textureArray)
  char.animationSpeed = 0.2
  char.anchor.x = char.anchor.y = 0.5
  return char
}

export var container = new PIXI.Container()
var char = createCharacter()
char.play()
container.addChild(char)
container.position.x = gameMap.start.x * C.TILE_SIZE
container.position.y = (gameMap.start.y - 1) * C.TILE_SIZE

var dy = 0
var dx = 1

export function update(components: any) {
  // UPDATE X
  var oldX = container.position.x
  container.scale.x = dx
  container.position.x += dx * C.ACCEL * 2
  var collides = true
  if (container.position.x < char.width / 2) { // check for left wall collision
    container.position.x = char.width / 2
  } else if (container.position.x > 800 - char.width / 2) { // check for right wall collision
    container.position.x = 800 - char.width / 2
  } else if (any(components, component => doesCollide(container, component))) { // check for obstacle collision
    container.position.x = oldX
  } else {
    collides = false
  }
  if (collides) {
    dx *= -1
  }
  // UPDATE Y
  var oldY = container.position.y
  dy += C.GRAVITY
  container.position.y += dy
  var collidesWithObstacle = reduce(components, (memo, component) => memo || doesCollide(container, component), false)
  if (container.position.y > 600 - char.height / 2) { // check for floor collision
    container.position.y = 600 - char.height / 2
    dy = 0
  } else if (collidesWithObstacle) { // check for obstacle collision
    container.position.y = oldY
    if (collidesWithObstacle.type === 'trampoline') {
      dy = -dy + 1
    } else {
      dy = 0
    }
  }
}

function doesCollide(obj1, component) {
  var obj2 = component.displayObj
  var w1 = Math.abs(obj1.width)
  var x1 = obj1.x - w1 / 2
  var y1 = obj1.y - obj1.height / 2
  var collides = (x1 + w1 > obj2.x && x1 < obj2.x + obj2.width)
    && (y1 + obj1.height > obj2.y && y1 < obj2.y + obj2.height)
  if (!collides) {
    return false
  }
  return { type: component.type }
}
