/* @flow */

import PIXI from 'pixi.js'

import * as C from './constants'
import gameMap from './maps/test'

export var container = new PIXI.Container()

var goal = new PIXI.Sprite.fromImage('img/components/end-goal.png')
goal.position.x = 0
goal.position.y = 0
container.addChild(goal)

container.position.x = gameMap.end.x * C.TILE_SIZE
container.position.y = gameMap.end.y * C.TILE_SIZE

export function update() {

}
