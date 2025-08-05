document.addEventListener("DOMContentLoaded", function () {
  console.log('DOMContentLoaded');

  // Check for saved theme preference, otherwise check system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  }

  const themeToggle = document.getElementById('themeToggle');
  const moonIcon = themeToggle.querySelector('svg');
  
  // Update the icon and theme based on current state
  const updateThemeUI = (isDark) => {
    if (isDark) {
      // moonIcon.setAttribute('fill', 'currentColor');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      // moonIcon.setAttribute('fill', 'none');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Set initial icon state
  updateThemeUI(document.documentElement.classList.contains('dark'));

  themeToggle.addEventListener('click', () => {
    const isDark = !document.documentElement.classList.contains('dark');
    updateThemeUI(isDark);
  });



  const fullScreenButton = document.getElementById('fullScreen');

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      // document.body.classList.remove('fullscreen');
      document.exitFullscreen();
    } else {
      // document.body.classList.add('fullscreen');
      document.documentElement.requestFullscreen();
    }
  }

  fullScreenButton.addEventListener('click', () => {
    // document.body.classList.toggle('fullscreen');
    toggleFullScreen()
  });


  const canvas = document.getElementById('drawing');
  const ctx = canvas.getContext('2d');

  const colorPicker = document.getElementById('colorPicker');
  colorPicker.addEventListener('change', (e) => {
    currentColor = e.target.value;
  });

  const brushSizeSlider = document.getElementById('brushSize');
  brushSizeSlider.addEventListener('input', (e) => {
    currentBrushSize = e.target.value;
  });

  const brushSizeValue = document.getElementById('brushSizeValue');
  const clearButton = document.getElementById('clearCanvas');

  // Clear canvas event listener
  clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Initialize drawing variables
  let currentColor = "#2d3436";
  let currentBrushSize = 7;
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  const setContextProperties = () => {
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentBrushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  const resizeCanvas = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = window.innerHeight * 0.7; // Set a reasonable height
    setContextProperties();
  };

  resizeCanvas();

  const draw = (e) => {
    if (!isDrawing) return;

    setContextProperties();

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  };

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
  });

  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  canvas.addEventListener("mousemove", draw);

  // Handle window resize
  window.addEventListener("resize", () => {
    // Re-initialize canvas to match new display size
    // Note: This will clear the canvas
    // initCanvas();
    console.log("Window resized");
  });
});