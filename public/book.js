/* ============================================================
   DAGV – Livro Histórico Interativo
   book.js | Stage 2:
   - GSAP controla a abertura cinematográfica (zoom + rotação
     da capa com easing).
   - StPageFlip é inicializado somente após a capa abrir por
     completo, assumindo a virada física real das páginas
     (arraste, canto, sombra dinâmica, curvatura).
   - Cada página é gerada a partir de window.DAGV_BOOK_DOCS e
     aceita texto, imagem ou PDF (renderizado com PDF.js) sem
     exigir mudança nesta estrutura.
   - Se GSAP / StPageFlip / PDF.js não carregarem (ex.: bloqueio
     de rede), o livro cai para um modo simplificado (CSS puro)
     em vez de quebrar.
   ============================================================ */

(function () {
  var docs = window.DAGV_BOOK_DOCS || [];

  var book        = document.getElementById('book');
  var cover       = book ? book.querySelector('.book__cover--front') : null;
  var pagesMount  = document.getElementById('bookPages');
  var controls    = document.getElementById('bookControls');
  var counter     = document.getElementById('bookCounter');
  var btnPrev     = document.getElementById('bookPrev');
  var btnNext     = document.getElementById('bookNext');
  var closeBtn    = document.getElementById('bookCloseBtn');
  var indexBtn    = document.getElementById('bookIndexBtn');
  var indexPanel  = document.getElementById('bookIndexPanel');
  var indexClose  = document.getElementById('bookIndexClose');
  var indexSearch = document.getElementById('bookIndexSearch');
  var indexList   = document.getElementById('bookIndexList');

  if (!book || !docs.length) return;

  var hasGsap     = typeof window.gsap !== 'undefined';
  var hasPageFlip = typeof window.St !== 'undefined' && window.St.PageFlip;
  var hasPdfJs    = typeof window.pdfjsLib !== 'undefined';

  if (hasPdfJs) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js';
  }

  var isOpen = false;
  var pageFlip = null;
  var flipSound = null;

  /* ── Som de virar página (opcional) ───────────────────────
     Coloque um arquivo em assets/audio/page-flip.mp3 para
     ativar o som. Sem o arquivo, apenas não toca nada — não
     gera erro no console.                                     */
  function playFlipSound() {
    try {
      if (!flipSound) {
        flipSound = new Audio('assets/audio/page-flip.mp3');
        flipSound.volume = .5;
      }
      flipSound.currentTime = 0;
      var p = flipSound.play();
      if (p && p.catch) p.catch(function () {});
    } catch (err) { /* silencioso */ }
  }

  /* ── Construção do conteúdo de cada página ───────────────── */
  function buildTextPage(doc) {
    var el = document.createElement('div');
    el.className = 'book-page';
    el.innerHTML =
      '<span class="book-page__year">' + doc.year + '</span>' +
      '<h3 class="book-page__title">' + doc.title + '</h3>' +
      '<p class="book-page__desc">' + doc.description + '</p>';
    return el;
  }

  function buildImagePage(doc) {
    var el = document.createElement('div');
    el.className = 'book-page';
    el.innerHTML =
      '<div class="book-page__media">' +
        '<img src="' + doc.image + '" alt="' + doc.title + '" loading="lazy" />' +
        '<div class="book-page__media-caption">' +
          '<span class="book-page__year">' + doc.year + '</span>' +
          '<h3 class="book-page__title">' + doc.title + '</h3>' +
        '</div>' +
      '</div>';
    return el;
  }

  function buildPdfPage(doc) {
    var el = document.createElement('div');
    el.className = 'book-page';

    var canvas = document.createElement('canvas');
    var media = document.createElement('div');
    media.className = 'book-page__media';
    media.appendChild(canvas);

    var caption = document.createElement('div');
    caption.className = 'book-page__media-caption';
    caption.innerHTML =
      '<span class="book-page__year">' + doc.year + '</span>' +
      '<h3 class="book-page__title">' + doc.title + '</h3>' +
      '<a class="book-page__pdf-link" href="' + doc.pdf + '" target="_blank" rel="noopener">' +
        '<i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Abrir PDF completo' +
      '</a>';
    media.appendChild(caption);
    el.appendChild(media);

    if (hasPdfJs) {
      window.pdfjsLib.getDocument(doc.pdf).promise
        .then(function (pdf) { return pdf.getPage(1); })
        .then(function (page) {
          var viewport = page.getViewport({ scale: 1.4 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          return page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport }).promise;
        })
        .catch(function () {
          // Falha ao renderizar (arquivo ausente/CORS): mantém só o link acima.
        });
    }

    return el;
  }

  function buildPage(doc) {
    if (doc.type === 'image' && doc.image) return buildImagePage(doc);
    if (doc.type === 'pdf' && doc.pdf) return buildPdfPage(doc);
    return buildTextPage(doc);
  }

  function buildAllPages() {
    pagesMount.innerHTML = '';
    docs.forEach(function (doc) {
      pagesMount.appendChild(buildPage(doc));
    });
    return pagesMount.querySelectorAll('.book-page');
  }

  /* ── Contador / navegação ─────────────────────────────────── */
  function updateCounterUI(currentIndex, total) {
    counter.textContent = (currentIndex + 1) + ' / ' + total;
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex >= total - 1;
  }

  /* Modo simplificado: sem StPageFlip, mostra uma página por vez com prev/next manual */
  var simplePages = [];
  var simpleIndex = 0;

  function renderSimple() {
    simplePages.forEach(function (el, i) {
      el.style.display = i === simpleIndex ? 'block' : 'none';
    });
    updateCounterUI(simpleIndex, simplePages.length);
  }

  function goToSimple(i) {
    simpleIndex = Math.max(0, Math.min(simplePages.length - 1, i));
    renderSimple();
  }

  /* ── Inicializa a experiência de páginas (uma vez) ────────── */
  function initPagesExperience() {
    var pageEls = buildAllPages();

    if (hasPageFlip) {
      pageFlip = new window.St.PageFlip(pagesMount, {
        width: 300,
        height: 420,
        size: 'stretch',
        minWidth: 200,
        maxWidth: 480,
        minHeight: 280,
        maxHeight: 640,
        maxShadowOpacity: 0.55,
        showCover: false,
        mobileScrollSupport: false,
        useMouseEvents: true
      });
      pageFlip.loadFromHTML(pageEls);
      pageFlip.on('flip', function (e) {
        updateCounterUI(e.data, pageFlip.getPageCount());
        playFlipSound();
      });
      updateCounterUI(0, pageFlip.getPageCount());
    } else {
      // Fallback sem lib de flip: alterna páginas inteiras manualmente.
      simplePages = Array.prototype.slice.call(pageEls);
      simpleIndex = 0;
      renderSimple();
    }
  }

  function goToDocIndex(i) {
    if (pageFlip) {
      pageFlip.flip(i);
    } else {
      goToSimple(i);
    }
  }

  /* ── Abrir / Fechar livro ─────────────────────────────────── */
  var pagesInitialized = false;

  function afterCoverOpen() {
    if (!pagesInitialized) {
      initPagesExperience();
      pagesInitialized = true;
    }
    book.classList.add('is-pages-visible');
  }

  function openBook() {
    if (isOpen) return;
    isOpen = true;
    book.setAttribute('aria-expanded', 'true');
    controls.classList.add('is-visible');
    controls.setAttribute('aria-hidden', 'false');
    closeBtn.classList.add('is-visible');

    if (hasGsap && cover) {
      var tl = window.gsap.timeline();
      tl.to(book, { scale: 1.04, duration: .35, ease: 'power2.out' })
        .to(cover, {
          rotationY: -165,
          transformPerspective: 1800,
          duration: 1.1,
          ease: 'power3.inOut',
          onComplete: afterCoverOpen
        }, '-=.1')
        .to(book, { scale: 1, duration: .3, ease: 'power2.out' }, '-=.3');
      book.classList.add('is-open');
    } else {
      // Fallback: CSS puro assume a rotação (classe .is-open já cobre isso).
      book.classList.add('is-open');
      setTimeout(afterCoverOpen, 950);
    }
  }

  function closeBook() {
    if (!isOpen) return;
    isOpen = false;
    book.setAttribute('aria-expanded', 'false');
    controls.classList.remove('is-visible');
    controls.setAttribute('aria-hidden', 'true');
    closeBtn.classList.remove('is-visible');
    book.classList.remove('is-pages-visible');

    if (hasGsap && cover) {
      window.gsap.to(cover, { rotationY: 0, transformPerspective: 1800, duration: .9, ease: 'power3.inOut' });
    }
    book.classList.remove('is-open');
  }

  /* Clique na capa abre; clique fora (fechar/Esc) fecha.
     Depois de aberto, cliques dentro do livro não fecham mais
     (StPageFlip precisa dos próprios eventos de clique/arraste). */
  book.addEventListener('click', function () {
    if (!isOpen) openBook();
  });
  book.addEventListener('keydown', function (e) {
    if (!isOpen && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      openBook();
    }
  });

  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeBook();
  });

  btnPrev.addEventListener('click', function (e) {
    e.stopPropagation();
    if (pageFlip) pageFlip.flipPrev();
    else goToSimple(simpleIndex - 1);
  });
  btnNext.addEventListener('click', function (e) {
    e.stopPropagation();
    if (pageFlip) pageFlip.flipNext();
    else goToSimple(simpleIndex + 1);
  });

  document.addEventListener('keydown', function (e) {
    if (!isOpen) return;
    if (e.key === 'ArrowRight') { if (pageFlip) pageFlip.flipNext(); else goToSimple(simpleIndex + 1); }
    if (e.key === 'ArrowLeft')  { if (pageFlip) pageFlip.flipPrev(); else goToSimple(simpleIndex - 1); }
    if (e.key === 'Escape') closeBook();
  });

  /* ── Painel Índice ────────────────────────────────────────── */
  function renderIndexList(filter) {
    var term = (filter || '').trim().toLowerCase();
    indexList.innerHTML = '';
    docs.forEach(function (doc, i) {
      if (term && doc.title.toLowerCase().indexOf(term) === -1 &&
          doc.year.toLowerCase().indexOf(term) === -1) {
        return;
      }
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'book-index-panel__item';
      btn.innerHTML = '<span>' + doc.year + '</span>' + doc.title;
      btn.addEventListener('click', function () {
        closeIndexPanel();
        openBook();
        // Aguarda a capa abrir (e as páginas inicializarem) antes de navegar.
        setTimeout(function () { goToDocIndex(i); }, hasGsap ? 1250 : 1000);
      });
      li.appendChild(btn);
      indexList.appendChild(li);
    });
  }

  function openIndexPanel() {
    indexPanel.classList.add('is-open');
    indexPanel.setAttribute('aria-hidden', 'false');
    indexBtn.setAttribute('aria-expanded', 'true');
    renderIndexList('');
    indexSearch.focus();
  }

  function closeIndexPanel() {
    indexPanel.classList.remove('is-open');
    indexPanel.setAttribute('aria-hidden', 'true');
    indexBtn.setAttribute('aria-expanded', 'false');
  }

  indexBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    indexPanel.classList.contains('is-open') ? closeIndexPanel() : openIndexPanel();
  });
  indexClose.addEventListener('click', function (e) {
    e.stopPropagation();
    closeIndexPanel();
  });
  indexSearch.addEventListener('input', function () {
    renderIndexList(indexSearch.value);
  });
}());
