// Get the theme toggle switch
const themeToggle = document.getElementById('theme-toggle');

// Check if the user prefers dark mode and toggle the class
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}

// Function to toggle between light and dark modes
themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

//============================================================================================

document.querySelectorAll('.game-mode-btn').forEach(button => {
  button.addEventListener('click', function() {
      const gameMode = this.getAttribute('data-mode');
      const username = document.querySelector('.username').value || 'Human';

      window.location.href = `index.html?mode=${gameMode}&username=${encodeURIComponent(username)}`;
  });
});
