// assets/js/custom-hamburger.js
document.addEventListener('DOMContentLoaded', function () {
  // Suche Header und Navigation (robust)
  var header = document.querySelector('.site-header') || document.querySelector('header') || document.body;
  // mögliche Nav-Varianten prüfen:
  var nav = document.querySelector('.site-nav') || document.querySelector('nav.site-nav') || document.querySelector('nav') || document.querySelector('header nav') || document.querySelector('ul');

  if (!header || !nav) {
    console.log('custom-hamburger: Header oder nav nicht gefunden.');
    return;
  }

  // Falls nav ein <nav> enthält ein <ul>, dann benutzen wir das UL für die show-Klasse
  var innerNav = nav.querySelector('ul') || nav.querySelector('ol') || nav;
  // Entferne leere LIs (Whitespace-only)
  try {
    var items = Array.prototype.slice.call(innerNav.querySelectorAll('li'));
    items.forEach(function(li){
      if (!li.textContent || li.textContent.trim().length === 0) {
        li.parentNode.removeChild(li);
      } else {
        // trim excess whitespace nodes inside
        li.innerHTML = li.innerHTML.trim();
      }
    });
  } catch (e) {
    // ignore if structure unexpected
  }

  // Falls Button schon existiert: nichts tun
  if (document.querySelector('.hamburger-btn')) return;

  // Erzeuge Button
  var btn = document.createElement('button');
  btn.className = 'hamburger-btn';
  btn.setAttribute('aria-label', 'Menü öffnen');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '&#9776;'; // ☰

  // Anfügen: ins header (appendChild = am Ende)
  header.appendChild(btn);

  // Klick: togglet .show an der innerNav (UL/OL/Nav)
  btn.addEventListener('click', function (ev) {
    ev.stopPropagation();
    var shown = innerNav.classList.toggle('show');
    btn.setAttribute('aria-expanded', shown ? 'true' : 'false');
  });

  // Klick außerhalb schließt das Menü
  document.addEventListener('click', function (e) {
    if (!innerNav.classList.contains('show')) return;
    if (e.target === btn) return;
    if (innerNav.contains(e.target)) return;
    innerNav.classList.remove('show');
    btn.setAttribute('aria-expanded', 'false');
  });

  // Optional: Escape schließt
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && innerNav.classList.contains('show')) {
      innerNav.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});
