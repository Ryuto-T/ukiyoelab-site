// メールアドレスの組み立て（HTML に mailto を直書きしないスパム対策）
document.querySelectorAll('.js-mail').forEach(function (el) {
  var addr = el.dataset.u + '@' + el.dataset.d + '.' + el.dataset.t;
  var a = document.createElement('a');
  a.className = 'link';
  a.href = 'mail' + 'to:' + addr;
  a.textContent = addr;
  el.replaceWith(a);
});
