import './style.css'
import { Scene, Game, WEBGL } from 'phaser'
import background from './alice.webp'

const canvas = document.getElementById('game');

class GameScene extends Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image('background', background)
  }

  create() {
    // Store reference to background for updates
    this.currentBg = this.add.image(400, 300, 'background')
  }
}

const config = {
  type: WEBGL,
  width: 800,
  height: 600,
  canvas,
  scene: [
    GameScene
  ]
}

new Game(config)
