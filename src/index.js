import life from './life'
import { List, fromJS } from 'immutable'

const SCALE = 128
const SPEED = 512
const COUNT = 32
let scale = 0
let hue = 0

let states = List.of(fromJS([
  { x: 1, y: 0 },
  { x: 3, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
  { x: 4, y: 2 },
  { x: 5, y: 2 },
  { x: 6, y: 2 }
]).toSet())

const canvas = document.querySelector('canvas')
const fpsEl = document.querySelector('.fps')
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

let lastCalledTime = new Date().getTime()
let counter = 0
let fpsArray = []
let average = 0

const draw = () => {
  const delta = (new Date().getTime() - lastCalledTime) / 1000
  const fps = Math.ceil((1 / delta))
  lastCalledTime = new Date().getTime()

  if (counter >= 60) {
    average = Math.ceil(fpsArray.reduce(function (a, b) { return a + b }) / fpsArray.length)
    fpsEl.textContent = `${average} fps`
    counter = 0
  } else {
    if (fps !== Infinity) {
      fpsArray.push(fps)
    }
    counter++
  }

  context.clearRect(0, 0, canvas.width, canvas.height)

  states.forEach((state, i) => {
    context.fillStyle = `hsla(${(hue + Math.round(i / COUNT * 720)) % 360}, 80%, 50%, ${(i / COUNT)})`
    state.forEach((cell) => {
      const x = cell.get('x')
      const y = cell.get('y')
      context.fillRect(...worldToView(x, y), scale, scale)
    })
  })

  window.requestAnimationFrame(draw)
}
window.requestAnimationFrame(draw)

window.setInterval(() => {
  hue = (hue + 1) % 360
  states = states.push(life(states.last())).takeLast(COUNT)
}, 1000 / SPEED)
