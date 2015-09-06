/* @flow */

import PIXI from 'pixi.js'

var sky = new PIXI.Graphics()
sky.beginFill(0x98c2ea)
sky.drawRect(0, 0, 800, 600)
sky.endFill()

var cloud = new PIXI.Sprite.fromImage('img/bg/cloud01.svg')
cloud.position.x = 10
cloud.position.y = 10

var cloud2 = new PIXI.Sprite.fromImage('img/bg/cloud02.svg')
cloud2.position.x = 400
cloud2.position.y = 320

var tree = new PIXI.Sprite.fromImage('img/bg/tree01.svg')
tree.position.x = 250

var tree2 = new PIXI.Sprite.fromImage('img/bg/tree02.svg')
tree2.position.x = 400

export var container = new PIXI.Container()
container.addChild(sky)
container.addChild(cloud)
container.addChild(cloud2)
container.addChild(tree)
container.addChild(tree2)

export function update() {
  tree.position.y = 600 - tree.height
  tree2.position.y = 600 - tree2.height

  cloud.position.x -= 0.2
  if (cloud.position.x + cloud.width < 0) {
    cloud.position.x = 800
  }

  cloud2.position.x -= 0.1
  if (cloud2.position.x + cloud2.width < 0) {
    cloud2.position.x = 800
  }
}
