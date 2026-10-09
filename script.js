// メールアドレスの組み立て（HTML に mailto を直書きしないスパム対策）
document.querySelectorAll('.js-mail').forEach(function (el) {
  var addr = el.dataset.u + '@' + el.dataset.d + '.' + el.dataset.t;
  var a = document.createElement('a');
  a.className = 'link';
  a.href = 'mail' + 'to:' + addr;
  a.textContent = addr;
  el.replaceWith(a);
});

// 上部のタブ：画面の上に留め、トップでは絵を過ぎたら生成りの帯にする。
// スマホではスクロールしたら屋号の段を上へ逃がし、タブだけを残す。
(function () {
  var nav = document.querySelector('.gnav');
  if (!nav) return;
  var root = document.documentElement;
  var tabs = nav.querySelector('.gnav__tabs');
  var hero = nav.classList.contains('gnav--over') ? document.querySelector('.hero') : null;
  root.classList.add('has-gnav');

  function measure() {
    root.style.setProperty('--gnav-h', nav.offsetHeight + 'px');
    // タブの段より上にある部分の高さ（スマホで上へ逃がす量）
    var row1 = tabs.getBoundingClientRect().top - nav.getBoundingClientRect().top;
    root.style.setProperty('--gnav-row1', Math.max(0, Math.round(row1)) + 'px');
  }
  var queued = false;
  function update() {
    queued = false;
    var y = window.pageYOffset || root.scrollTop;
    if (hero) nav.classList.toggle('is-solid', y > hero.offsetHeight - nav.offsetHeight);
    nav.classList.toggle('is-compact', y > 40);
  }
  measure();
  update();
  window.addEventListener('scroll', function () {
    if (!queued) { queued = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', function () { measure(); update(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

  // ショップの小窓：外を押すか Esc で閉じる
  var shop = nav.querySelector('.gnav__shop details');
  if (shop) {
    document.addEventListener('click', function (e) {
      if (shop.open && !shop.contains(e.target)) shop.open = false;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && shop.open) {
        shop.open = false;
        shop.querySelector('summary').focus();
      }
    });
  }
})();

// 作品紹介の絞り込み（シリーズ・絵師）
(function () {
  var bar = document.querySelector('.filter');
  if (!bar) return;
  var buttons = bar.querySelectorAll('button');
  var cards = document.querySelectorAll('.card[data-tags]');
  var sections = document.querySelectorAll('.gallery__sec');
  bar.hidden = false;
  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    var key = btn.dataset.filter;
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
    cards.forEach(function (c) {
      c.hidden = !(key === 'all' || (' ' + c.dataset.tags + ' ').indexOf(' ' + key + ' ') !== -1);
    });
    sections.forEach(function (s) {
      s.hidden = !s.querySelector('.card[data-tags]:not([hidden])');
    });
  });
})();

// 江戸ジャーナルの道：見えたときに一度だけ、日本橋から箱根まで歩く
(function () {
  var road = document.querySelector('.road');
  if (!road) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        road.classList.add('is-walked');
        io.disconnect();
      }
    });
  }, { threshold: 0.6 });
  io.observe(road);
})();
