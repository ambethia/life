import { Set, Map, Range } from 'immutable'

const N = Range(-1, 2).map((x, i, r) => r.map(y => Map({x, y}))).flatten(true).toSet().delete(Map({x: 0, y: 0}))

const join = (a, b) => Map({ x: a.get('x') + b.get('x'), y: a.get('y') + b.get('y') })

const life = (state) => {
  const neighbors = state.reduce((cells, cell) => cells.union(N.map(n => join(cell, n))), new Set())
  const nextState = neighbors.union(state).reduce((cells, cell) => {
    const count = N.reduce((c, n) => state.has(join(cell, n)) ? c + 1 : c, 0)
    return state.has(cell) && count === 2 || count === 3 ? cells.add(cell) : cells
  }, new Set())
  return nextState
}

export default life
