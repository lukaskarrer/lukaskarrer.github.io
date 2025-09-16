// assets/js/custom-hamburger.js
document.addEventListener('DOMContentLoaded', function () {
  // Suche die Stelle, wo das Header-Element ist
  var header = document.querySelector('.site-header') || document.querySelector('header') || document.body;
  var nav = document.querySelector('.site-nav') || document.querySelector('nav');

  if (!header || !nav) {
    // falls Struktur anders ist, beende und zeige Fehler in Console
    console.log('custom-hamburger: Kein Header oder keine site-nav gefunden.');
    return;
  }

  // Wenn der Button schon existiert (mehrfache Einfügungen verhindern)
  if (document.querySelector('.hamburger-btn')) return;

  // Erzeuge Button
  var btn = document.createElement('button');
  btn.className = 'hamburger-btn';
  btn.setAttribute('aria-label', 'Menü öffnen');
  btn.innerHTML = '&#9776;'; // drei Balken

  // Button vorne in den Header einfügen
  header.insertBefore(btn, header.firstChild);

  // Klick: togglet Klasse .show an der Navigation
  btn.addEventListener('click', function () {
    nav.classList.toggle('show');
  });
});
