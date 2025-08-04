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
      moonIcon.setAttribute('fill', 'currentColor');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      moonIcon.setAttribute('fill', 'none');
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





  // Handle window resize
  window.addEventListener("resize", () => {
    // Re-initialize canvas to match new display size
    // Note: This will clear the canvas
    // initCanvas();
    console.log('Window resized');
  });
});