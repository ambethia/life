import life from '../src/life'
import { fromJS } from 'immutable'

const BLOCK = fromJS([
  { x: 1, y: 1 }, { x: 1, y: 2 },
  { x: 2, y: 1 }, { x: 2, y: 2 }
]).toSet()

const BLINKER_H = fromJS([
  { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }
]).toSet()

const BLINKER_V = fromJS([
  { x: 3, y: 2 },
  { x: 3, y: 3 },
  { x: 3, y: 4 }
]).toSet()

test('block', () => {
  expect(life(BLOCK).equals(BLOCK)).toBeTruthy()
})

test('blinker', () => {
  expect(life(BLINKER_H).equals(BLINKER_V)).toBeTruthy()
})
