// Snake Game Logic

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{x: 200, y: 200}];
let direction = 'RIGHT';
let food = {x: 300, y: 300};
let score = 0;

function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(segment.x, segment.y, 20, 20);
  });
}

function moveSnake() {
  const head = {x: snake[0].x, y: snake[0].y};

  switch(direction) {
    case 'RIGHT': head.x += 20; break;
    case 'LEFT': head.x -= 20; break;
    case 'UP': head.y -= 20; break;
    case 'DOWN': head.y += 20; break;
  }

  snake.unshift(head);
  snake.pop();
}

function drawFood() {
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(food.x, food.y, 20, 20);
}

function checkCollision() {
  // Check collision with walls
  if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
    resetGame();
  }

  // Check collision with itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      resetGame();
    }
  }

  // Check collision with food
  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    snake.push({});
    generateFood();
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * canvas.width / 20) * 20;
  food.y = Math.floor(Math.random() * canvas.height / 20) * 20;
}

function resetGame() {
  snake = [{x: 200, y: 200}];
  direction = 'RIGHT';
  score = 0;
  generateFood();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  moveSnake();
  drawFood();
  checkCollision();
}

setInterval(gameLoop, 500);

window.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowUp': direction = 'UP'; break;
    case 'ArrowDown': direction = 'DOWN'; break;
    case 'ArrowLeft': direction = 'LEFT'; break;
    case 'ArrowRight': direction = 'RIGHT'; break;
  }
});