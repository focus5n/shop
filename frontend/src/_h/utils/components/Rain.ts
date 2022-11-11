import {DataUtils} from '../DataUtils'

export interface RainOption {
  x: number
  y: number
  l: number
  xs: number
  ys: number
}

class Rain { 
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  w: number
  h: number
  wind: number
  water: number
  rains: object[]
  rain: RainOption

  constructor(_element: HTMLCanvasElement) {
    this.canvas = _element
    this.w = this.canvas.width = window.innerWidth
    this.h = this.canvas.height = window.innerHeight
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.wind = 0
    this.water = 0
    this.rains = []
    this.rain = {} as RainOption

    this.init()
    DataUtils.set(this.canvas, 'canvas', this)
  }

  private craeteRain() {
    this.rain = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      l: Math.random(),
      xs: -4 + Math.random() * 4 + 2,
      ys: Math.random() * 30 + 10,
    }
    return this.rain
  }

  private init() {
    this.ctx.strokeStyle = 'rgba(174,194,224,0.5)'
    this.ctx.lineWidth = 1
    for (let i = 0; i < 1000; i += 1) {
      this.rains.push(this.craeteRain())
    }
    setInterval(() => this.draw(), 30)
  }

  private move() {
    for (let i = 0; i < this.rains.length; i++) {
      const rain = this.rains[i] as RainOption
      rain.x += rain.xs
      rain.y += rain.ys
      if (rain.x > this.w || rain.y > this.h) {
        rain.x = Math.random() * this.w
        rain.y = -20
      }
    }
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.w, this.h)
    for (let i = 0; i < this.rains.length; i += 1) {
      const rain = this.rains[i] as RainOption
      this.ctx.beginPath()
      this.ctx.moveTo(rain.x, rain.y)
      this.ctx.lineTo(rain.x + rain.l * rain.xs + this.wind, rain.y + rain.l * rain.ys + this.water)
      this.ctx.stroke()
    }
    this.move()
  }

  resize = () => {
    this.w = this.canvas.width = window.innerWidth
    this.h = this.canvas.height = window.innerHeight
    this.ctx.strokeStyle = 'rgba(174,194,224,0.5)'
    this.ctx.lineWidth = 1
  }

  setWind = (_wind: number) => {
    this.wind = _wind
  }

  setWater = (_water: number) => {
    this.water = _water
  }

  mouseInteraction = (e: MouseEvent) => {
    const medium = window.innerWidth / 2
    if (medium < e.pageX) {
      this.setWind((e.pageX - medium) / 50)
    } else {
      this.setWind(-(medium - e.pageX) / 50)
    }

    const bottom = window.innerHeight - 250
    if (e.pageY > bottom) {
      this.setWater(Math.sqrt(e.pageY - bottom))
    } else {
      this.setWater(0)
    }
  }

  public static hasInstance(element: HTMLElement) {
    return DataUtils.has(element, 'canvas')
  }

  public static getInstance(element: HTMLCanvasElement) {
    if (element !== null && Rain.hasInstance(element)) {
      return DataUtils.get(element, 'canvas')
    }
  }

  public static createInstance(selector: string) {
    const element = document.querySelector(selector) as HTMLCanvasElement
   
    if(!element) {
      return
    }

    let canvas = Rain.getInstance(element)
    if (!canvas) {
      canvas = new Rain(element)
    }
  }

  public static bootstrap(attr: string = '#rain_canvas') {
    Rain.createInstance(attr)
    Rain.resize()
    Rain.mouse()
  }

  public static resizeUpdate() {
    const element = document.querySelector('#rain_canvas')
    const instance = Rain.getInstance(element as HTMLCanvasElement)
    if (instance) {
      instance.resize()
    }
  }

  public static mouseUpdate(e: MouseEvent) {
    const element = document.querySelector('#rain_canvas')
    const instance = Rain.getInstance(element as HTMLCanvasElement)
    if (instance) {
      instance.mouseInteraction(e)
    }
  }

  public static resize() {
    window.addEventListener('resize', function () {
      Rain.resizeUpdate()
    })
  }

  public static mouse() {
    window.addEventListener('mousemove', function (e) {
      Rain.mouseUpdate(e as MouseEvent)
    })
  }
}

export {Rain}

// const rain = new Rain()
// rain.init()
// rain.drop()

// window.onresize = () => {
//   rain.resize()
// }

// window.onmousemove = (e) => {
//   const medium = window.innerWidth / 2
//   if (medium < e.pageX) {
//     rain.setWind((e.pageX - medium) / 50)
//   } else {
//     rain.setWind(-(medium - e.pageX) / 50)
//   }

//   const bottom = window.innerHeight - 250
//   if (e.pageY > bottom) {
//     rain.setWater(Math.sqrt(e.pageY - bottom))
//   } else {
//     rain.setWater(0)
//   }
// }
