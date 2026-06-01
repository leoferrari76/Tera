(function () {
  const SCREEN_KEY = 'mentor-theme-screen';

  function pageName() {
    return window.location.pathname.split('/').pop() || '';
  }

  // Redirect -light variants to canonical (we're light-only now)
  const lightRedirects = {
    'onboarding-light.html': 'onboarding.html',
    'home-light.html': 'home.html',
    'conclusao-light.html': 'conclusao.html',
    'sugestoes-light.html': 'sugestoes.html'
  };
  const page = pageName();
  if (lightRedirects[page]) {
    window.location.replace(lightRedirects[page] + window.location.hash);
    return;
  }

  function restoreActiveContext() {
    const id = sessionStorage.getItem(SCREEN_KEY);
    if (!id) return;
    const screen = document.getElementById(id);
    if (!screen || !screen.classList.contains('screen')) return;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
    sessionStorage.removeItem(SCREEN_KEY);
  }

  document.addEventListener('DOMContentLoaded', restoreActiveContext);
})();
