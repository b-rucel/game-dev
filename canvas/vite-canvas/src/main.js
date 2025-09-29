import './style.css'

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// set background color
ctx.fillStyle = '#1DA1F2';
ctx.fillRect(0, 0, canvas.width, canvas.height);

