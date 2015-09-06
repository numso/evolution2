/* @flow */

import PIXI from 'pixi.js'
import {contains, each} from 'lodash'
import $ from 'jquery'

import gameMap from './default-map'
import * as C from './constants'

var renderer = PIXI.autoDetectRenderer()
renderer.view.style.display = 'block'
$('#editPanel').append(renderer.view)

$('#save').click(function () {
  var val = $('#lbl').val()
  if (val) {
    localStorage.setItem(val, JSON.stringify(gameMap))
    displayMessage('Saved under: ' + val)
  } else {
    displayMessage('You need to enter a name.')
  }
})

$('#load').click(function () {
  var val = $('#lbl').val()
  if (val) {
    var rawMap = localStorage.getItem(val)
    if (rawMap) {
      try {
        var parsedMap = JSON.parse(rawMap)
        for (var key in parsedMap) {
          gameMap[key] = parsedMap[key]
        }
        refresh()
        displayMessage('Loaded: ' + val)
      } catch (e) {
        displayMessage('Error loading map: ', e)
      }
    } else {
      displayMessage('Could not find a map at: ' + val)
    }
  } else {
    displayMessage('You need to enter a name.')
  }
})

function displayMessage(msg) {
  $('#messages').prepend('<div>' + msg + '</div>')
}

var curTile = C.TILE_BLOCK

$('.items div').click(function () {
  $('.selected').removeClass('selected')
  $(this).addClass('selected')
  curTile = $(this).data('tile-id')
})

var dragging = false
var sky = new PIXI.Graphics()
sky.beginFill(0x98c2ea)
sky.drawRect(0, 0, C.TILE_SIZE * C.WIDTH, C.TILE_SIZE * C.HEIGHT)
sky.endFill()

var components = new PIXI.Container()

var stage = new PIXI.Container()
stage.width = C.TILE_SIZE * C.WIDTH
stage.height = C.TILE_SIZE * C.HEIGHT
stage.addChild(sky)
stage.addChild(components)

stage.interactive = true

function addComponentAt(x, y) {
  x = Math.floor(x / C.TILE_SIZE)
  y = Math.floor(y / C.TILE_SIZE)

  if (contains(['start', 'end'], curTile)) {
    gameMap[curTile].x = x
    gameMap[curTile].y = y
  } else {
    gameMap.components[x][y] = curTile
  }

  refresh()
}

stage.mousedown = function (e) {
  dragging = true
  var {x, y} = e.data.global
  addComponentAt(x, y)
}

stage.mouseup = function () {
  dragging = false
}

stage.mousemove = function (e) {
  if (dragging) {
    var {x, y} = e.data.global
    addComponentAt(x, y)
  }
}

function gameLoop() {
  window.requestAnimationFrame(gameLoop)
  renderer.render(stage)
}
window.requestAnimationFrame(gameLoop)


function refresh() {
  components.removeChildren()
  each(gameMap.components, (col, x) => {
    each(col, (cell, y) => {
      if (cell === C.TILE_BLOCK) {
        var block = new PIXI.Sprite.fromImage('img/components/block.png')
        block.position.x = x * C.TILE_SIZE
        block.position.y = y * C.TILE_SIZE
        components.addChild(block)
      } else if (cell === C.TILE_TRAMPOLINE) {
        var trampoline = new PIXI.Sprite.fromImage('img/components/trampoline.png')
        trampoline.position.x = x * C.TILE_SIZE
        trampoline.position.y = y * C.TILE_SIZE
        components.addChild(trampoline)
      }
    })
  })
  var char = new PIXI.Sprite.fromImage('img/char/frame02_handDown.png')
  char.position.x = gameMap.start.x * C.TILE_SIZE
  char.position.y = (gameMap.start.y - 1) * C.TILE_SIZE
  components.addChild(char)
  var end = new PIXI.Sprite.fromImage('img/components/end-goal.png')
  end.position.x = gameMap.end.x * C.TILE_SIZE
  end.position.y = gameMap.end.y * C.TILE_SIZE
  components.addChild(end)
}
refresh()
