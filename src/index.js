import life from './life'
import { fromJS } from 'immutable'

const SCALE = 256
const SPEED = 64
let scale = 0
let hue = 0

let state = fromJS([
  { x: 1, y: 0 },
  { x: 3, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
  { x: 4, y: 2 },
  { x: 5, y: 2 },
  { x: 6, y: 2 }
]).toSet()

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const resize = () => {
  canvas.width = parseInt(window.getComputedStyle(canvas).getPropertyValue('width'))
  canvas.height = parseInt(window.getComputedStyle(canvas).getPropertyValue('height'))
  scale = Math.min(canvas.width, canvas.height) / SCALE
}
window.addEventListener('resize', resize)
resize()

const worldToView = (x, y) => {
  return [canvas.width / 2 + x * scale, canvas.height / 2 + y * scale]
}

const draw = () => {
  // context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = `hsl(${hue}, 80%, 40%)`

  state.forEach((cell) => {
    const x = cell.get('x')
    const y = cell.get('y')
    context.fillRect(...worldToView(x, y), scale, scale)
  })

  window.requestAnimationFrame(draw)
}
window.requestAnimationFrame(draw)

window.setInterval(() => {
  state = life(state)
  hue = (hue + 2) % 360
}, 1000 / SPEED)
