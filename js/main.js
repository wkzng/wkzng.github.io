// Theme toggle: respects system preference, allows manual override via localStorage
(function () {
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const root = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.classList.remove('dark', 'light');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
    icon.innerHTML = theme === 'dark' ? '&#9788;' : '&#9790;';
  }

  // On load: use saved preference or fall back to system
  const saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);
  } else {
    // Let CSS media query handle it, just set icon
    icon.innerHTML = getSystemTheme() === 'dark' ? '&#9788;' : '&#9790;';
  }

  // Toggle on click
  if (toggle) {
    toggle.addEventListener('click', function () {
      const current = root.classList.contains('dark')
        ? 'dark'
        : root.classList.contains('light')
          ? 'light'
          : getSystemTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }
})();
