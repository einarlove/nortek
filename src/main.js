const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const pixelRatio = window.devicePixelRatio || 1
let mouse = { x: 0, y: 0, updated: Date.now() }

const distanceBetween = (ax, bx, ay, by) => (
  Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2))
)

const setDimensions = () => {
  canvas.width = window.innerWidth * pixelRatio
  canvas.height = window.innerHeight * pixelRatio
}

const onMouseMove = ({ layerX, layerY }) => mouse = {
  x: layerX * pixelRatio,
  y: layerY * pixelRatio,
  velocity: distanceBetween(mouse.x, layerX * pixelRatio, mouse.y, layerY * pixelRatio),
  angle: Math.atan2((layerX * pixelRatio) - mouse.x, (layerY * pixelRatio) - mouse.y),
}

window.addEventListener('resize', setDimensions)
canvas.addEventListener('mousemove', onMouseMove)

setDimensions()

const areal = 40 * pixelRatio
const padding = 2 * pixelRatio
const lineWidth = 0

const draw = () => {
  ctx.fillStyle = '#111'
  ctx.strokeStyle = '#eee'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.lineWidth = lineWidth

  ctx.fillRect(0, 0, 100, )

  for (let x = 0; x < Math.ceil(canvas.width / areal); x++) {
    for (let y = 0; y < Math.ceil(canvas.height / areal); y++) {
      const centerX = (x * areal) + (areal / 2)
      const centerY = (y * areal) + (areal / 2)

      const distanceFromMouse = distanceBetween(mouse.x, centerX, mouse.y, centerY)

      ctx.save()
      ctx.translate(x * areal, y * areal)

      // ctx.font = "30px Helvetica"
      // ctx.textAlign = 'center'
      // ctx.fillStyle = '#222'
      // ctx.fillText(Math.round(1 - (distanceFromMouse / (areal * 3))), areal / 2, areal / 2)

      // Rotate
      ctx.translate(areal / 2, areal / 2)
      ctx.rotate(-mouse.angle)
      ctx.lineWidth = (1 - distanceFromMouse / (areal * 5)) * 10
      ctx.translate(-areal / 2, -areal / 2)


      // Draw line
      ctx.beginPath()
      ctx.moveTo(areal / 2, padding)
      ctx.lineTo(areal / 2, areal - padding)
      ctx.stroke()

      ctx.restore()
    }
  }

  requestAnimationFrame(draw)
}

requestAnimationFrame(draw)
