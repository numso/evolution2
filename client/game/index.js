/* @flow */

import PIXI from 'pixi.js'

import * as music from './music'
import * as bg from './background'
import * as char from './character'
import * as components from './components'
import * as goal from './goal'
import {SCREEN_WIDTH, SCREEN_HEIGHT} from './constants'

var renderer = PIXI.autoDetectRenderer()
// renderer.view.style.width = window.innerWidth + 'px'
// renderer.view.style.height = window.innerHeight + 'px'
renderer.view.style.display = 'block'
document.body.appendChild(renderer.view)

var stage = new PIXI.Container()
stage.addChild(bg.container)
stage.addChild(components.container)
stage.addChild(goal.container)
stage.addChild(char.container)

function gameLoop() {
  window.requestAnimationFrame(gameLoop)
  update()
  renderer.render(stage)
}

function update() {
  bg.update()
  char.update(components.components)
  components.update()
  goal.update()
  updateStagePosition(char.container.position)
}

music.bg.play()
window.requestAnimationFrame(gameLoop)

function updateStagePosition(c) {
  var stageX = bound(c.x - SCREEN_WIDTH / 2, 0, 800 - SCREEN_WIDTH)
  var stageY = bound(c.y - SCREEN_HEIGHT / 2, 0, 600 - SCREEN_HEIGHT)
  stage.x = -stageX
  stage.y = -stageY
}

function bound(num, lower, upper) {
  return Math.min(Math.max(num, lower), upper)
}
