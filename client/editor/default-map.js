/* @flow */

import {map, range} from 'lodash'

import {WIDTH, HEIGHT} from './constants'

export default {
  start: {
    x: 1,
    y: HEIGHT - 2
  },
  end: {
    x: WIDTH - 2,
    y: HEIGHT - 2
  },
  components: map(range(WIDTH), () => map(range(HEIGHT), y => y == HEIGHT - 1 ? 0 : -1))
}
