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

    this.tweens.add({
      targets: this.currentBg,
      scaleX: 1.5,
      scaleY: 1.5,
      rotation: 0.1,
      duration: 500,
      yoyo: true,
      ease: 'Back.easeInOut'
    })

    // key input, do tweeen effect
    this.input.keyboard.on('keydown-FIVE', () => {
      this.tweens.add({
        targets: this.currentBg,
        scaleX: 1.5,
        scaleY: 1.5,
        rotation: 0.1,
        duration: 300,
        yoyo: true,
        ease: 'Back.easeInOut'
      })
    })

    // Instructions
    this.add.text(10, 10, 'Background Examples:\n1: Change texture\n2: Replace image\n3: Load from URL\n4: Fade transition\n5: Scale effect', {
      fontSize: '14px',
      fill: '#ffffff',
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: { x: 8, y: 8 }
    })
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
