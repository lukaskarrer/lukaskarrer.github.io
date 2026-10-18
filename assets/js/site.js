(() => {
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* Sprache: Deutsch im HTML, Englisch in data-en */
  const nodes = [...document.querySelectorAll('[data-en]')];
  nodes.forEach(n => { n.dataset.de = n.innerHTML; });
  const toggle = document.querySelector('[data-lang-toggle]');
  function setLang(lang) {
    document.documentElement.lang = lang;
    nodes.forEach(n => { n.innerHTML = lang === 'en' ? n.dataset.en : n.dataset.de; });
    if (toggle) toggle.textContent = lang === 'en' ? 'DE' : 'EN';
    const t = document.querySelector('meta[name="title-en"]');
    if (t) document.title = lang === 'en' ? t.content : t.dataset.de;
    store.set('lang', lang);
  }
  const titleEn = document.querySelector('meta[name="title-en"]');
  if (titleEn) titleEn.dataset.de = document.title;
  if (store.get('lang') === 'en') setLang('en');
  toggle && toggle.addEventListener('click', () => setLang(document.documentElement.lang === 'en' ? 'de' : 'en'));

  /* Menü auf dem Handy */
  const menu = document.querySelector('[data-menu]');
  const navEl = document.getElementById('nav');
  if (menu && navEl) {
    const setMenu = open => { navEl.classList.toggle('open', open); menu.setAttribute('aria-expanded', open); };
    menu.addEventListener('click', () => setMenu(!navEl.classList.contains('open')));
    navEl.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  }

  /* Projektdetails als Dialog */
  let lastTrigger = null;
  document.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const d = document.getElementById(btn.dataset.open);
      if (!d) return;
      lastTrigger = btn;
      document.documentElement.classList.add('modal-open');
      d.showModal();
      d.scrollTop = 0;
      /* Aufruf eines Projekts im Zähler vermerken (keine Cookies) */
      try { window.goatcounter && window.goatcounter.count({ path: 'projekt/' + btn.dataset.open.replace('p-', ''), title: d.querySelector('h2').textContent, event: true }); } catch (e) {}
    });
  });
  document.querySelectorAll('dialog.sheet').forEach(d => {
    d.addEventListener('click', e => { if (e.target === d) d.close(); });
    d.querySelector('[data-close]').addEventListener('click', () => d.close());
    d.addEventListener('close', () => {
      document.documentElement.classList.remove('modal-open');
      lastTrigger && lastTrigger.focus({ preventScroll: true });
    });
  });

  /* Videos nur abspielen, wenn sichtbar; Laserlinie einmal zeichnen */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vids = document.querySelectorAll('video[data-autoplay]');
  /* Startbild: Laser trifft das Ziel, danach übernimmt das Video */
  function handoff(stage) {
    if (!stage.hasAttribute('data-handoff')) return;
    const v = stage.querySelector('video');
    if (reduce || !v) return;
    v.removeAttribute('data-autoplay');
    setTimeout(() => {
      stage.classList.add('handed');
      v.play().catch(() => {});
      v.setAttribute('data-autoplay', '');
      io && io.observe(v);
    }, 2800);
  }
  let io = null;
  const stages = document.querySelectorAll('[data-laser]');
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        const el = en.target;
        if (el.tagName === 'VIDEO') {
          if (en.isIntersecting && !reduce) { el.play().catch(() => {}); } else { el.pause(); }
        } else if (en.isIntersecting) {
          el.classList.add('run');
          io.unobserve(el);
          handoff(el);
        }
      });
    }, { threshold: 0.35 });
    vids.forEach(v => { if (!v.closest('[data-handoff]')) io.observe(v); });
    stages.forEach(s => io.observe(s));
  } else {
    stages.forEach(s => s.classList.add('run'));
  }
  if (reduce) vids.forEach(v => { v.controls = true; });

  /* Navigation über dunklen Bereichen dunkel färben (ohne Scroll-Listener) */
  const nav = document.getElementById('nav');
  const darks = document.querySelectorAll('.dark');
  if (nav && darks.length && 'IntersectionObserver' in window) {
    const active = new Set();
    const navIo = new IntersectionObserver(entries => {
      entries.forEach(en => en.isIntersecting ? active.add(en.target) : active.delete(en.target));
      nav.classList.toggle('on-dark', active.size > 0);
    }, { rootMargin: '-24px 0px -92% 0px', threshold: 0 });
    darks.forEach(s => navIo.observe(s));
  }
  /* Sprungziel nach dem Laden sauber anfahren (Bilder/Schriften können das Layout noch verschieben) */
  if (location.hash.length > 1) {
    const go = () => { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); t && t.scrollIntoView({ block: 'start' }); };
    window.addEventListener('load', go);
    document.fonts && document.fonts.ready.then(go);
  }
})();
