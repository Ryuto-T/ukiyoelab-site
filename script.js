// メールアドレスの組み立て（HTML に mailto を直書きしないスパム対策）
document.querySelectorAll('.js-mail').forEach(function (el) {
  var addr = el.dataset.u + '@' + el.dataset.d + '.' + el.dataset.t;
  var a = document.createElement('a');
  a.className = 'link';
  a.href = 'mail' + 'to:' + addr;
  a.textContent = addr;
  el.replaceWith(a);
});

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
