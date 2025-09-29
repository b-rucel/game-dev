import './style.css'
import { Game, WEBGL } from 'phaser';

const config = {
  type: WEBGL,
  parent: 'app',
  width: 800,
  height: 600,
  backgroundColor: '#1DA1F2',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
}

// eslint-disable-next-line no-new
new Game(config);
