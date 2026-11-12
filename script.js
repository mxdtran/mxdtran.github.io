(function () {
  var dlg = document.getElementById('lb'), art = document.getElementById('lbArt');
  document.querySelectorAll('.piece').forEach(function (b) {
    b.addEventListener('click', function () {
      art.innerHTML = '';
      art.appendChild(b.querySelector('svg, img').cloneNode(true));
      document.getElementById('lbT').textContent = b.dataset.t;
      document.getElementById('lbM').textContent = b.dataset.m;
      dlg.showModal();
    });
  });
  document.getElementById('lbX').addEventListener('click', function () { dlg.close() });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close() });
  var fb = document.querySelectorAll('.filters button'), figs = document.querySelectorAll('.works figure');
  fb.forEach(function (b) {
    b.addEventListener('click', function () {
      fb.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false') });
      figs.forEach(function (f) { f.hidden = b.dataset.f !== 'all' && f.dataset.cat !== b.dataset.f });
    });
  });

  /* Light / dark mode switch */
  var root = document.documentElement, tb = document.getElementById('themeToggle');
  function mode() {
    var a = root.getAttribute('data-theme');
    if (a) return a;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function label() {
    var next = mode() === 'dark' ? 'light' : 'dark';
    tb.textContent = next === 'dark' ? 'Dark' : 'Light';
    tb.setAttribute('aria-label', 'Switch to ' + next + ' mode');
  }
  tb.addEventListener('click', function () {
    var next = mode() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next) } catch (e) { }
    label();
  });
  label();
})();