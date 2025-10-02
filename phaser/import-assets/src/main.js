import './style.css'
import { Scene, Game, WEBGL } from 'phaser'
import background from './alice.webp'

import dude from './dude.sprite.png'

const canvas = document.getElementById('game');

class GameScene extends Scene {
  constructor() {
    super()
  }

  preload() {
    this.load.image('background', background)

    this.load.spritesheet('dude', dude, {
      frameWidth: 32, frameHeight: 48
    })
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


    this.player = this.physics.add.sprite(300, 250, 'dude')

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Create keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    }
    else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

const config = {
  type: WEBGL,
  width: 800,
  height: 600,
  canvas,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 300 },
      debug: false
    }
  },
  scene: [
    GameScene
  ]
}

new Game(config)





// class GameScene extends Scene {
//   constructor() {
//     super()
//   }

//   preload() {
//     this.load.image('background', background)
//     // Preload additional backgrounds for switching
//     this.load.image('bg2', 'https://picsum.photos/800/600?random=1')
//     this.load.image('bg3', 'https://picsum.photos/800/600?random=2')
//   }

//   create() {
//     // Store reference to background for updates
//     this.currentBg = this.add.image(400, 300, 'background')

//     // Example 1: Simple texture swap
//     this.input.keyboard.on('keydown-ONE', () => {
//       this.currentBg.setTexture('bg2')
//     })

//     // Example 2: Replace background entirely
//     this.input.keyboard.on('keydown-TWO', () => {
//       this.currentBg.destroy()
//       this.currentBg = this.add.image(400, 300, 'bg3')
//     })

//     // Example 3: Load new image dynamically
//     this.input.keyboard.on('keydown-THREE', () => {
//       const key = 'dynamic-' + Date.now()
//       this.load.image(key, `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 100)}`)
//       this.load.start()
//       this.load.once('complete', () => {
//         this.currentBg.setTexture(key)
//       })
//     })

//     // Example 4: Fade transition
//     this.input.keyboard.on('keydown-FOUR', () => {
//       const newBg = this.add.image(400, 300, 'background')
//       newBg.setAlpha(0)

//       this.tweens.add({
//         targets: this.currentBg,
//         alpha: 0,
//         duration: 1000,
//         onComplete: () => this.currentBg.destroy()
//       })

//       this.tweens.add({
//         targets: newBg,
//         alpha: 1,
//         duration: 1000,
//         onComplete: () => this.currentBg = newBg
//       })
//     })

//     // Example 5: Scale and rotate effect
//     this.input.keyboard.on('keydown-FIVE', () => {
//       this.tweens.add({
//         targets: this.currentBg,
//         scaleX: 1.5,
//         scaleY: 1.5,
//         rotation: 0.1,
//         duration: 500,
//         yoyo: true,
//         ease: 'Back.easeInOut'
//       })
//     })

//     // Instructions
//     this.add.text(10, 10, 'Background Examples:\n1: Change texture\n2: Replace image\n3: Load from URL\n4: Fade transition\n5: Scale effect', {
//       fontSize: '14px',
//       fill: '#ffffff',
//       backgroundColor: 'rgba(0,0,0,0.7)',
//       padding: { x: 8, y: 8 }
//     })
//   }

//   update() {

//   }
// }




