// assets/js/custom-hamburger.js
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header') || document.querySelector('header') || document.body;
  if (!header) return;

  // Erzeuge Button, falls noch nicht vorhanden
  if (!document.querySelector('.custom-hamburger-btn')) {
    var btn = document.createElement('button');
    btn.className = 'custom-hamburger-btn';
    btn.innerHTML = '&#9776;'; // ☰
    btn.setAttribute('aria-label','Menü öffnen');
    header.appendChild(btn);
  } else {
    var btn = document.querySelector('.custom-hamburger-btn');
  }

  // Erzeuge Menü-Container
  var menu = document.querySelector('.custom-hamburger-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.className = 'custom-hamburger-menu';
    header.appendChild(menu);
  }

  // Funktion: sammle Navigationseinträge aus existierender Nav oder baue aus Links auf der Seite
  function buildMenu() {
    var sourceNav = document.querySelector('.site-nav') || document.querySelector('nav') || document.querySelector('header nav') || document.querySelector('ul');
    var items = [];
    if (sourceNav) {
      // falls UL/OL vorhanden, nimm LIs
      var ul = sourceNav.querySelector('ul') || sourceNav.querySelector('ol') || sourceNav;
      var lis = Array.prototype.slice.call(ul.querySelectorAll('li'));
      if (lis.length === 0) {
        // falls nav direkt aus <a>-links besteht
        var links = ul.querySelectorAll('a');
        links.forEach(function(a){
          items.push({text: a.textContent.trim(), href: a.getAttribute('href')});
        });
      } else {
        lis.forEach(function(li){
          var a = li.querySelector('a');
          if (a) {
            var text = a.textContent.trim();
            var href = a.getAttribute('href');
            // skip empty or purely whitespace entries
            if (!text || text.length === 0) return;
            items.push({text: text, href: href});
          }
        });
      }
    } else {
      // fallback: suche alle sichtbaren interne Links in header/main that look like nav
      var links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="#"]');
      links.forEach(function(a){
        var text = a.textContent.trim();
        if (!text) return;
        items.push({text: text, href: a.getAttribute('href')});
      });
    }

    // dedupe items by text (case-insensitive) and remove links that are only "/"
    var seen = {};
    var filtered = [];
    items.forEach(function(it){
      var t = it.text.trim().toLowerCase();
      if (!t) return;
      if (it.href === '/' && t.length === 0) return;
      if (!seen[t]) { seen[t] = true; filtered.push(it); }
    });

    // baue HTML
    var html = '<ul>';
    filtered.forEach(function(it){
      // sanitize href: if null -> '#'
      var href = it.href || '#';
      html += '<li><a href="'+href+'">'+it.text+'</a></li>';
    });
    html += '</ul>';
    menu.innerHTML = html;
  }

  // initial build
  buildMenu();

  // Klick toggled das Menü
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    menu.classList.toggle('show');
  });

  // Klick außerhalb schließt
  document.addEventListener('click', function(e){
    if (!menu.classList.contains('show')) return;
    if (menu.contains(e.target) || btn.contains(e.target)) return;
    menu.classList.remove('show');
  });

  // beobachte DOM-Mutationen (falls theme nav später nachlädt), rebuild falls nötig
  var obs = new MutationObserver(function(muts){
    // rebuild ungefähr einmal nach Änderungen
    buildMenu();
  });
  obs.observe(document.body, {childList: true, subtree: true});
});
