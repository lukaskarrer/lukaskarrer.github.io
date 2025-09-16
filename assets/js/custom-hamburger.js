// assets/js/custom-hamburger.js
document.addEventListener('DOMContentLoaded', function () {
  // Suche Header + Navigation (robuste Selektoren)
  var header = document.querySelector('.site-header') || document.querySelector('header') || document.body;
  var nav = document.querySelector('.site-nav') || document.querySelector('nav') || document.querySelector('ul');

  if (!header || !nav) {
    console.log('custom-hamburger: Header oder nav nicht gefunden.');
    return;
  }

  // Verhindere Doppel-Button
  if (document.querySelector('.hamburger-btn')) return;

  // Erzeuge Button
  var btn = document.createElement('button');
  btn.className = 'hamburger-btn';
  btn.setAttribute('aria-label', 'Menü öffnen');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '&#9776;'; // drei Balken

  // Füge Button rechts oben ein (append = am Ende, CSS absolute: right)
  header.appendChild(btn);

  // Klick: togglet Klasse .show an der Navigation
  btn.addEventListener('click', function () {
    var shown = nav.classList.toggle('show');
    btn.setAttribute('aria-expanded', shown ? 'true' : 'false');
  });

  // Extra: falls irgendwo auf Seite ein Klick außerhalb Menüs => schließe das Menü
  document.addEventListener('click', function (e) {
    if (!nav.classList.contains('show')) return;
    if (e.target === btn) return;
    if (nav.contains(e.target)) return;
    // Klick außerhalb => Menü schließen
    nav.classList.remove('show');
    btn.setAttribute('aria-expanded', 'false');
  });
});
