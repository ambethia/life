import life from '../src/life'
import { fromJS } from 'immutable'

const BLOCK = [
  '1,1', '1,2',
  '2,1', '2,2'
]

const BLINKER_H = [
  '2,3', '3,3', '4,3'
]

const BLINKER_V = [
  '3,2',
  '3,3',
  '3,4'
]

test('block', () => {
  expect(life(BLOCK)).toEqual(BLOCK)
})

test('blinker', () => {
  expect(life(BLINKER_H)).toEqual(BLINKER_V)
})
