document.querySelectorAll('.game-mode-btn').forEach(button => {
    button.addEventListener('click', function() {
        const gameMode = this.getAttribute('data-mode');
        window.location.href = 'index.html?mode=' + gameMode;
    });
});
