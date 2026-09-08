/**
 * DAGV – Diretório Acadêmico Gaspar Vianna
 * script.js | Medicina UFTM
 *
 * Funcionalidades:
 *  1. Header – transparente → sólido no scroll
 *  2. Menu hambúrguer (mobile)
 *  3. Smooth scroll para âncoras internas
 *  4. AOS – Animate On Scroll
 *  5. Validação do formulário de contato
 *  6. Ano automático no rodapé
 */

/* ── Aguarda o DOM estar pronto ──────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────────────
     1. HEADER – comportamento no scroll
     ───────────────────────────────────────────────────────── */
  const header = document.getElementById('header');

  const updateHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // estado inicial


  /* ─────────────────────────────────────────────────────────
     2. MENU HAMBÚRGUER (mobile)
     ───────────────────────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const navMobile  = document.getElementById('navMobile');
  const mobileLinks = navMobile.querySelectorAll('.nav-mobile__link');

  const toggleMenu = (forceClose = false) => {
    const isOpen = hamburger.classList.contains('active') || forceClose;

    if (isOpen) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      navMobile.classList.remove('open');
      navMobile.setAttribute('aria-hidden', 'true');
    } else {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      navMobile.classList.add('open');
      navMobile.setAttribute('aria-hidden', 'false');
    }
  };

  hamburger.addEventListener('click', () => toggleMenu());

  // Fecha o menu ao clicar num link mobile
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  // Fecha o menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      toggleMenu(true);
    }
  });


  /* ─────────────────────────────────────────────────────────
     2b. NAV DESKTOP → DRAWER: colapso exato por espaço real
     Substitui o antigo breakpoint fixo (900px) por medição
     real do espaço entre o fim do .nav e o brand centralizado.
     Quando não há espaço suficiente, aplica .nav--compact em
     .header (esconde .nav, mostra hamburguer + drawer mobile).
     ───────────────────────────────────────────────────────── */
  const headerInner = document.querySelector('.header__inner');
  const brand        = document.querySelector('.header__brand');
  const navList      = document.querySelector('.nav__list');
  const NAV_SAFE_GAP = 24; // px de folga mínima entre nav e a logo central

  if (headerInner && brand && navList) {
    // Mede a largura natural do .nav via clone fora da tela — não
    // depende do .nav estar visível (ele pode já estar display:none
    // pelo fallback mobile ao carregar a página numa tela estreita).
    const measureNavWidth = () => {
      const clone = navList.cloneNode(true);
      clone.style.position   = 'absolute';
      clone.style.visibility = 'hidden';
      clone.style.display    = 'flex';
      clone.style.width      = 'auto';
      clone.style.whiteSpace = 'nowrap';
      document.body.appendChild(clone);
      const w = clone.scrollWidth;
      document.body.removeChild(clone);
      return w;
    };

    let navWidth = measureNavWidth();

    const checkNavFit = () => {
      const innerRect = headerInner.getBoundingClientRect();
      const brandRect = brand.getBoundingClientRect();
      const availableRight = innerRect.right - brandRect.right - NAV_SAFE_GAP;
      header.classList.toggle('nav--compact', navWidth > availableRight);
    };

    window.addEventListener('load', () => {
      navWidth = measureNavWidth(); // remedir após fontes carregarem
      checkNavFit();
    });

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(checkNavFit).observe(headerInner);
    } else {
      window.addEventListener('resize', checkNavFit);
    }

    checkNavFit();
  }


  /* ─────────────────────────────────────────────────────────
     3. SMOOTH SCROLL para âncoras internas
     ───────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerH = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ─────────────────────────────────────────────────────────
     4. AOS – Animate On Scroll
     ───────────────────────────────────────────────────────── */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,          // ms
      easing:   'ease-out-cubic',
      once:     true,         // anima apenas na primeira vez
      offset:   80,           // px antes da viewport
    });
  }


  /* ─────────────────────────────────────────────────────────
     5. FORMULÁRIO DE CONTATO – validação
     ───────────────────────────────────────────────────────── */
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {

    /**
     * Valida um campo individual.
     * Retorna true se válido, false caso contrário.
     */
    const validateField = (field) => {
      const group   = field.closest('.form-group');
      let   isValid = true;

      // Reset de estado
      field.classList.remove('valid', 'invalid');
      group.classList.remove('show-error');

      if (field.type === 'email') {
        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRx.test(field.value.trim());
      } else if (field.tagName === 'SELECT') {
        isValid = field.value !== '';
      } else {
        isValid = field.value.trim().length >= 2;
      }

      if (isValid) {
        field.classList.add('valid');
      } else {
        field.classList.add('invalid');
        group.classList.add('show-error');
      }

      return isValid;
    };

    // Validação em tempo real (ao sair do campo)
    const fields = form.querySelectorAll('input, select, textarea');

    fields.forEach(field => {
      field.addEventListener('blur',  () => validateField(field));
      field.addEventListener('input', () => {
        // Remove estado inválido enquanto digita
        if (field.classList.contains('invalid')) {
          field.classList.remove('invalid');
          field.closest('.form-group').classList.remove('show-error');
        }
      });
    });

    // Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Valida todos os campos
      let allValid = true;
      fields.forEach(field => {
        if (!validateField(field)) allValid = false;
      });

      if (!allValid) return;

      /* ---- Simula envio (substitua por fetch/API real) ---- */
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando…';

      setTimeout(() => {
        // Exibe mensagem de sucesso
        formSuccess.classList.add('visible');
        form.reset();

        // Reset de estilos dos campos
        fields.forEach(field => {
          field.classList.remove('valid', 'invalid');
          field.closest('.form-group').classList.remove('show-error');
        });

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar mensagem';

        // Oculta mensagem de sucesso após 6s
        setTimeout(() => {
          formSuccess.classList.remove('visible');
        }, 6000);
      }, 1200);
    });
  }


  /* ─────────────────────────────────────────────────────────
     6. ANO NO RODAPÉ
     ───────────────────────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});

/* ═══════════════════════════════════════════════════════════════
   PARALLAX DA HERO – requestAnimationFrame puro
   ═══════════════════════════════════════════════════════════════
   Velocidades (px de deslocamento por px de scroll):
     bg-shapes  0.35  → mais ao fundo, move mais
     logo-deco  0.18  → plano médio
     content    0.07  → mais na frente, quase estático

   Desativado automaticamente em:
     • prefers-reduced-motion: reduce
     • viewport ≤ 768 px (mobile)

   Não altera HTML. Usa apenas translateY().
   Reseta o transform quando a hero sai do viewport.
═══════════════════════════════════════════════════════════════ */
(function initHeroParallax() {

  /* Respeita preferência de movimento reduzido */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroEl = document.getElementById('hero');
  if (!heroEl) return;

  const bgShapes = heroEl.querySelector('.hero__bg-shapes');
  const logoDeco = heroEl.querySelector('.hero__logo-deco');
  const content  = heroEl.querySelector('.hero__content');

  /* [elemento, fator de velocidade, precisa manter -50% de centralização vertical] */
  const layers = [
    [bgShapes, 0.35, false],
    [logoDeco, 0.18, true],
    [content,  0.07, false],
  ].filter(function(pair) { return pair[0] !== null; });

  if (!layers.length) return;

  var rafId      = null;
  var lastScroll = -1;

  function applyParallax() {
    rafId = null;
    var scrollY = window.scrollY || window.pageYOffset;

    /* Sem mudança → não faz nada */
    if (scrollY === lastScroll) return;
    lastScroll = scrollY;

    /* Mobile (≤ 768px) ou hero fora do viewport → reseta */
    if (window.innerWidth <= 768 || scrollY > heroEl.offsetHeight) {
      layers.forEach(function(pair) { pair[0].style.transform = pair[2] ? 'translateY(-50%)' : ''; });
      return;
    }

    layers.forEach(function(pair) {
      var offset = -(scrollY * pair[1]);
      /* [FIX salto da logo] .hero__logo-deco é centralizado via
         CSS com transform:translateY(-50%). Sobrescrever com só
         'translateY(Npx)' aqui apagava essa centralização assim
         que o parallax rodava (mesmo com scroll=0) — a logo pulava
         para baixo. Agora o -50% é preservado, combinado ao offset. */
      pair[0].style.transform = pair[2]
        ? 'translateY(calc(-50% + ' + offset + 'px))'
        : 'translateY(' + offset + 'px)';
    });
  }

  function onScroll() {
    if (!rafId) rafId = requestAnimationFrame(applyParallax);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function() { lastScroll = -1; onScroll(); }, { passive: true });

  /* Disparo inicial */
  onScroll();

}());

/* ─────────────────────────────────────────────────────────
   4. LIMPEZA DE ANIMAÇÕES DE ENTRADA (hero)
   Depois que a animação de entrada termina, removemos a
   propriedade `animation` do elemento (em vez de deixar o
   fill-mode:both segurando o estado final indefinidamente).
   Isso evita um bug de composição visto em alguns motores de
   renderização, onde uma animação "presa" no estado final pode
   impedir o conteúdo filho (ex.: a imagem da logo) de pintar
   corretamente, além de liberar a camada de GPU (--will-change)
   que não é mais necessária depois da entrada.
   Usamos setTimeout (não animationend): o evento pode disparar
   antes do listener ser registrado (corrida), deixando a limpeza
   sem efeito justamente quando mais precisa dela. Um tempo fixo,
   maior que a maior animação (delay .3s + duração 1s = 1.3s),
   garante a limpeza sempre. */
var heroEntranceEls = document.querySelectorAll(
  '.hero__logo-deco, .hero__content, .hero__eyebrow, .hero__title, .hero__description, .hero__actions'
);
setTimeout(function () {
  heroEntranceEls.forEach(function (el) {
    el.style.animation = 'none';
    el.style.willChange = 'auto';
  });
}, 1500);
