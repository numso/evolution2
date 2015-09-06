/* @flow */

import PIXI from 'pixi.js'
import {each} from 'lodash'

import gameMap from './maps/test'
import * as C from './constants'

export var container = new PIXI.Container()
export var components: Array<any> = []

each(gameMap.components, (col, x) => {
  each(col, (cell, y) => {
    if (cell === C.TILE_BLOCK) {
      var block = new PIXI.Sprite.fromImage('img/components/block.png')
      block.position.x = x * C.TILE_SIZE
      block.position.y = y * C.TILE_SIZE
      container.addChild(block)
      components.push({
        displayObj: block,
        type: 'block'
      })
    } else if (cell === C.TILE_TRAMPOLINE) {
      var trampoline = new PIXI.Sprite.fromImage('img/components/trampoline.png')
      trampoline.position.x = x * C.TILE_SIZE
      trampoline.position.y = y * C.TILE_SIZE
      container.addChild(trampoline)
      components.push({
        displayObj: trampoline,
        type: 'trampoline'
      })
    }
  })
})

export function update() {

}
