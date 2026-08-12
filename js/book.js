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
  var btnBookmark = document.getElementById('bookBookmarkBtn');
  var closeBtn    = document.getElementById('bookCloseBtn');
  var indexBtn    = document.getElementById('bookIndexBtn');
  var indexPanel  = document.getElementById('bookIndexPanel');
  var indexClose  = document.getElementById('bookIndexClose');
  var indexSearch = document.getElementById('bookIndexSearch');
  var indexList   = document.getElementById('bookIndexList');
  var fullscreenBtn  = document.getElementById('bookFullscreenBtn');
  var fullscreenIcon = document.getElementById('bookFullscreenIcon');
  var fullscreenHint = document.getElementById('bookFullscreenHint');
  var bookScene      = document.getElementById('bookScene');

  if (!book || !docs.length) return;

  var hasGsap     = typeof window.gsap !== 'undefined';
  var hasPageFlip = typeof window.St !== 'undefined' && window.St.PageFlip;
  var hasPdfJs    = typeof window.pdfjsLib !== 'undefined';

  if (hasPdfJs) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js';
  }

  var isOpen = false;
  var firstOpenDone = false; /* [FIX] 1ª abertura fica um pouco mais lenta, dando tempo de montar as páginas */
  var pageFlip = null;
  var flipSound = null;

  /* ── Marcador de página (persiste entre sessões) ──────────
     Sem marcador: o livro sempre reabre do início. Com marcador:
     reabre direto na página salva.                              */
  var BOOKMARK_KEY = 'dagvBookBookmark';

  function getBookmark() {
    try {
      var raw = window.localStorage.getItem(BOOKMARK_KEY);
      if (raw === null) return -1;
      var n = parseInt(raw, 10);
      return isNaN(n) ? -1 : n;
    } catch (err) { return -1; }
  }

  function setBookmark(i) {
    try { window.localStorage.setItem(BOOKMARK_KEY, String(i)); } catch (err) { /* silencioso */ }
  }

  function clearBookmark() {
    try { window.localStorage.removeItem(BOOKMARK_KEY); } catch (err) { /* silencioso */ }
  }

  function getCurrentPageIndex() {
    if (pageFlip) return pageFlip.getCurrentPageIndex();
    return simpleIndex;
  }

  function updateBookmarkBtnUI() {
    if (!btnBookmark) return;
    var marked = getBookmark() === getCurrentPageIndex();
    btnBookmark.setAttribute('aria-pressed', marked ? 'true' : 'false');
  }

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
  function buildDividerPage(doc) {
    var el = document.createElement('div');
    el.className = 'book-page book-page--divider';
    el.innerHTML =
      '<span class="book-page__divider-rule" aria-hidden="true"></span>' +
      '<h2 class="book-page__divider-title">' + doc.title + '</h2>' +
      (doc.subtitle ? '<p class="book-page__divider-subtitle">' + doc.subtitle + '</p>' : '') +
      '<span class="book-page__divider-rule" aria-hidden="true"></span>';
    return el;
  }

  function buildTextPage(doc) {
    var el = document.createElement('div');
    el.className = 'book-page';
    /* [FIX mobile] textos longos (páginas do capítulo CAGV/Operação MED/
       Federalização) cortavam no mobile — marca pra CSS reduzir a fonte
       só nessas páginas e só em telas pequenas. */
    var descClass = 'book-page__desc' + (doc.description && doc.description.length > 300 ? ' book-page__desc--long' : '');
    el.innerHTML =
      '<span class="book-page__year">' + doc.year + '</span>' +
      '<h3 class="book-page__title">' + doc.title + '</h3>' +
      '<p class="' + descClass + '">' + doc.description + '</p>';
    return el;
  }

  function buildImagePage(doc) {
    var el = document.createElement('div');
    el.className = 'book-page';
    var fullSrc = doc.imageFull || doc.image;
    el.innerHTML =
      '<div class="book-page__media">' +
        '<button type="button" class="book-page__zoom-btn" aria-label="Ver página em tela cheia">' +
          '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">' +
            '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/>' +
          '</svg>' +
        '</button>' +
        '<img src="' + doc.image + '" alt="' + doc.title + '" loading="lazy" />' +
        '<div class="book-page__media-caption">' +
          '<span class="book-page__year">' + doc.year + '</span>' +
          '<h3 class="book-page__title">' + doc.title + '</h3>' +
          (doc.caption ? '<span class="book-page__caption">' + doc.caption + '</span>' : '') +
        '</div>' +
      '</div>';
    var media = el.querySelector('.book-page__media');
    var stopIfZoomTarget = function (e) {
      if (e.target.closest('.book-page__zoom-btn') || e.target.tagName === 'IMG') {
        e.stopPropagation();
      }
    };
    // Só precisa impedir o StPageFlip de "ver" o início do arraste/toque;
    // o 'click' em si tem que seguir livre pra abrir o zoom.
    ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'touchstart', 'touchend']
      .forEach(function (evt) {
        media.addEventListener(evt, stopIfZoomTarget, true);
      });
    media.addEventListener('click', function (e) {
      if (e.target.closest('.book-page__zoom-btn') || e.target.tagName === 'IMG') {
        e.stopPropagation();
        openLightbox(fullSrc, doc.title, doc.image);
      }
    });
    return el;
  }

  /* ── Lightbox: página em tela cheia, resolução original ────
     Zoom progressivo (roda do mouse / pinça / botões) com
     arraste pra navegar pela imagem ampliada. */
  var lightbox, lightboxImg, lightboxViewport;
  var lbScale = 1, lbPanX = 0, lbPanY = 0;
  var lbFitW = 0, lbFitH = 0, lbNatW = 0, lbNatH = 0;
  var LB_MIN = 1, LB_MAX = 0; // LB_MAX é calculado por imagem (até a resolução nativa)

  function buildLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'book-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML =
      '<div class="book-lightbox__toolbar">' +
        '<button type="button" class="book-lightbox__btn" data-lb="out" aria-label="Diminuir zoom">&minus;</button>' +
        '<button type="button" class="book-lightbox__btn" data-lb="reset" aria-label="Redefinir zoom">1:1</button>' +
        '<button type="button" class="book-lightbox__btn" data-lb="in" aria-label="Aumentar zoom">&plus;</button>' +
        '<button type="button" class="book-lightbox__btn book-lightbox__close" data-lb="close" aria-label="Fechar">&times;</button>' +
      '</div>' +
      '<div class="book-lightbox__viewport">' +
        '<img class="book-lightbox__img" alt="" draggable="false" />' +
      '</div>' +
      '<span class="book-lightbox__hint">Roda do mouse ou pinça pra ampliar &middot; arraste pra navegar</span>';
    document.body.appendChild(lightbox);

    lightboxImg = lightbox.querySelector('.book-lightbox__img');
    lightboxViewport = lightbox.querySelector('.book-lightbox__viewport');

    lightbox.addEventListener('click', function (e) {
      var action = e.target.closest('[data-lb]');
      if (action) { handleLbAction(action.getAttribute('data-lb')); return; }
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '+' || e.key === '=') setLbScale(lbScale * 1.5, null, null);
      if (e.key === '-') setLbScale(lbScale / 1.5, null, null);
    });

    // Zoom com roda do mouse, centrado no cursor
    lightboxViewport.addEventListener('wheel', function (e) {
      e.preventDefault();
      var rect = lightboxViewport.getBoundingClientRect();
      var cx = e.clientX - rect.left - rect.width / 2;
      var cy = e.clientY - rect.top - rect.height / 2;
      var factor = e.deltaY < 0 ? 1.18 : 1 / 1.18;
      setLbScale(lbScale * factor, cx, cy);
    }, { passive: false });

    // Duplo clique / duplo toque: alterna 1x <-> resolução nativa
    lightboxImg.addEventListener('dblclick', function (e) {
      var rect = lightboxViewport.getBoundingClientRect();
      var cx = e.clientX - rect.left - rect.width / 2;
      var cy = e.clientY - rect.top - rect.height / 2;
      setLbScale(lbScale > 1 ? 1 : LB_MAX, cx, cy);
    });

    /* Arrastar (mouse e um dedo) pra navegar quando ampliado */
    var dragging = false, startX = 0, startY = 0, startPanX = 0, startPanY = 0;
    lightboxViewport.addEventListener('pointerdown', function (e) {
      if (lbScale <= 1) return;
      dragging = true;
      startX = e.clientX; startY = e.clientY;
      startPanX = lbPanX; startPanY = lbPanY;
      lightboxViewport.setPointerCapture(e.pointerId);
      lightboxImg.classList.add('is-dragging');
    });
    lightboxViewport.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      lbPanX = startPanX + (e.clientX - startX);
      lbPanY = startPanY + (e.clientY - startY);
      clampLbPan();
      applyLbTransform();
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (evt) {
      lightboxViewport.addEventListener(evt, function () {
        dragging = false;
        lightboxImg.classList.remove('is-dragging');
      });
    });

    /* Pinça (dois dedos) pra zoom progressivo no celular */
    var pinchStartDist = 0, pinchStartScale = 1, isPinching = false;
    lightboxViewport.addEventListener('touchstart', function (e) {
      if (e.touches.length === 2) {
        e.preventDefault();
        isPinching = true;
        pinchStartDist = touchDist(e.touches);
        pinchStartScale = lbScale;
      }
    }, { passive: false });
    lightboxViewport.addEventListener('touchmove', function (e) {
      if (e.touches.length === 2) {
        e.preventDefault();
        var d = touchDist(e.touches);
        var factor = d / (pinchStartDist || d);
        setLbScale(pinchStartScale * factor, null, null);
      }
    }, { passive: false });
    ['touchend', 'touchcancel'].forEach(function (evt) {
      lightboxViewport.addEventListener(evt, function (e) {
        if (e.touches.length < 2) isPinching = false;
      });
    });

    /* [FIX flicker mobile] o navegador dispara 'resize' repetidamente
       durante o próprio gesto de pinça (barra de endereço escondendo/
       reaparecendo). Isso recalculava o fit no meio do gesto e brigava
       com o setLbScale da pinça, causando a imagem "piscar" ao dar
       zoom out. Agora ignora resize enquanto o dedo ainda está na tela
       e faz debounce pro resto dos casos (rotação de tela etc). */
    var resizeT;
    window.addEventListener('resize', function () {
      if (isPinching) return;
      clearTimeout(resizeT);
      resizeT = setTimeout(function () {
        if (lightbox.classList.contains('is-open')) recomputeLbFit(true);
      }, 150);
    });
  }

  function touchDist(touches) {
    var dx = touches[0].clientX - touches[1].clientX;
    var dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function handleLbAction(action) {
    if (action === 'close') return closeLightbox();
    if (action === 'in') return setLbScale(lbScale * 1.4, null, null);
    if (action === 'out') return setLbScale(lbScale / 1.4, null, null);
    if (action === 'reset') return setLbScale(1, null, null);
  }

  /* Calcula o tamanho "encaixado na tela" (lbScale=1) a partir da
     resolução NATIVA da imagem, e até onde dá pra ampliar (LB_MAX
     = resolução real do arquivo, sem passar disso pra não borrar). */
  function recomputeLbFit(keepScale) {
    var vw = lightboxViewport.clientWidth - 32;
    var vh = lightboxViewport.clientHeight - 32;
    var fit = Math.min(vw / lbNatW, vh / lbNatH, 1);
    lbFitW = lbNatW * fit;
    lbFitH = lbNatH * fit;
    /* [FIX mobile] o cálculo original usava só pixels CSS, mas em telas
       retina/HiDPI (devicePixelRatio 2-3, a maioria dos celulares) isso
       limitava o zoom bem antes do necessário. Multiplica pelo DPR pra
       aproveitar a resolução real da tela, com um mínimo garantido de
       2.5x mesmo em imagens menores. */
    var dpr = window.devicePixelRatio || 1;
    LB_MAX = Math.max((lbNatW / lbFitW) * dpr, 2.5);
    if (!keepScale) lbScale = 1;
    lbScale = Math.max(LB_MIN, Math.min(LB_MAX, lbScale));
    clampLbPan();
    applyLbTransform();
  }

  function setLbScale(next, originX, originY) {
    var prev = lbScale;
    lbScale = Math.max(LB_MIN, Math.min(LB_MAX, next));
    /* [FIX flicker mobile] antes havia um reset abrupto de lbPanX/lbPanY
       pra 0 assim que a escala chegava exatamente em 1 — se a imagem
       estava arrastada pro canto, ela "pulava" pro centro de repente,
       causando a piscada ao reduzir o zoom com a pinça. clampLbPan()
       já reduz o pan suavemente conforme a escala diminui, então não
       precisa desse reset manual. */
    if (originX !== null && originY !== null && prev !== lbScale) {
      // mantém o ponto sob o cursor/dedos fixo enquanto aplica o zoom
      var ratio = lbScale / prev;
      lbPanX = originX - (originX - lbPanX) * ratio;
      lbPanY = originY - (originY - lbPanY) * ratio;
    }
    clampLbPan();
    applyLbTransform();
  }

  function clampLbPan() {
    if (!lightboxViewport) return;
    var vw = lightboxViewport.clientWidth, vh = lightboxViewport.clientHeight;
    var w = lbFitW * lbScale, h = lbFitH * lbScale;
    var maxX = Math.max(0, (w - vw) / 2);
    var maxY = Math.max(0, (h - vh) / 2);
    lbPanX = Math.max(-maxX, Math.min(maxX, lbPanX));
    lbPanY = Math.max(-maxY, Math.min(maxY, lbPanY));
  }

  function applyLbTransform() {
    // Tamanho real do elemento é redefinido a cada zoom (não é CSS
    // transform:scale) — assim o navegador sempre re-renderiza a
    // partir do arquivo original em vez de esticar uma versão já
    // reduzida, o que é o que causava a perda de nitidez.
    lightboxImg.style.width = (lbFitW * lbScale) + 'px';
    lightboxImg.style.height = (lbFitH * lbScale) + 'px';
    lightboxImg.style.transform =
      'translate(-50%, -50%) translate(' + lbPanX + 'px,' + lbPanY + 'px)';
    lightboxImg.classList.toggle('is-zoomed', lbScale > 1);
  }

  function openLightbox(src, title, fallbackSrc) {
    if (!lightbox) buildLightbox();
    lbScale = 1; lbPanX = 0; lbPanY = 0;
    lightboxImg.alt = title || '';
    lightboxImg.onload = function () {
      lbNatW = lightboxImg.naturalWidth;
      lbNatH = lightboxImg.naturalHeight;
      recomputeLbFit(false);
    };
    /* [FIX zoom] muitas páginas (ex.: Epíplon) não têm uma versão "full"
       em alta resolução — o arquivo dava 404, o onload nunca disparava
       e o zoom ficava travado com as dimensões da imagem anterior (ou
       zeradas). Se a versão full falhar, cai pra imagem normal. */
    lightboxImg.onerror = function () {
      if (fallbackSrc && lightboxImg.src.indexOf(fallbackSrc) === -1) {
        lightboxImg.onerror = null;
        lightboxImg.src = fallbackSrc;
      }
    };
    lightboxImg.src = src;
    lightboxImg.classList.remove('is-zoomed');
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('book-fullscreen-lock');
    document.body.classList.add('book-fullscreen-lock');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('book-fullscreen-lock');
    document.body.classList.remove('book-fullscreen-lock');
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
    if (doc.type === 'divider') return buildDividerPage(doc);
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
    updateBookmarkBtnUI();
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

  /* ── Inicializa (ou reinicializa) a experiência de páginas ──
     Recriar do zero a cada chamada garante que o StPageFlip meça
     o tamanho certo do zero — trocar de tela cheia via resize
     "falso" fazia ele entrar errado em modo de página dupla. */
  function initPagesExperience(targetIndex) {
    var pageEls = buildAllPages();

    var pageFlipOk = false;
    if (hasPageFlip) {
      try {
        pageFlip = new window.St.PageFlip(pagesMount, {
          width: 300,
          height: 420,
          size: 'stretch',
          minWidth: 220,
          maxWidth: 700,
          minHeight: 300,
          maxHeight: 940,
          maxShadowOpacity: 0.55,
          showCover: false,
          usePortrait: true,
          mobileScrollSupport: false,
          useMouseEvents: true
        });
        pageFlip.loadFromHTML(pageEls);
        pageFlip.on('flip', function (e) {
          updateCounterUI(e.data, pageFlip.getPageCount());
          playFlipSound();
        });
        var want = (typeof targetIndex === 'number') ? targetIndex : getBookmark();
        if (want >= 0 && want < pageFlip.getPageCount()) pageFlip.flip(want);
        updateCounterUI(pageFlip.getCurrentPageIndex(), pageFlip.getPageCount());
        pageFlipOk = true;
      } catch (e) {
        try { pageFlip.destroy(); } catch (e2) {}
        pageFlip = null;
        pagesMount.removeAttribute('style');
      }
    }
    if (!pageFlipOk) {
      // Fallback sem lib de flip: alterna páginas inteiras manualmente.
      simplePages = Array.prototype.slice.call(pageEls);
      var bmSimple = (typeof targetIndex === 'number') ? targetIndex : getBookmark();
      simpleIndex = (bmSimple >= 0 && bmSimple < simplePages.length) ? bmSimple : 0;
      renderSimple();
    }
  }

  /* ── Tela cheia (CSS puro — cobre a janela, cresce o livro) ── */
  var isFullscreen = false;

  function positionFullscreenBtn() {
    if (!isFullscreen) {
      fullscreenBtn.style.right = '';
      return;
    }
    var gap = 10;
    var w = indexBtn.getBoundingClientRect().width;
    fullscreenBtn.style.right =
      'calc(max(var(--space-md), env(safe-area-inset-right)) + ' + (w + gap) + 'px)';
  }

  function setFullscreen(next) {
    if (next === isFullscreen) return;
    isFullscreen = next;

    bookScene.classList.toggle('is-fullscreen', isFullscreen);
    positionFullscreenBtn();

    document.body.classList.toggle('book-fullscreen-lock', isFullscreen);
    document.documentElement.classList.toggle('book-fullscreen-lock', isFullscreen);
    fullscreenBtn.setAttribute('aria-pressed', isFullscreen ? 'true' : 'false');
    fullscreenBtn.setAttribute('aria-label', isFullscreen ? 'Sair da tela cheia' : 'Tela cheia');

    if (fullscreenHint) {
      if (isFullscreen) {
        // Reinicia a animação do aviso a cada entrada em tela cheia.
        fullscreenHint.classList.remove('is-visible');
        void fullscreenHint.offsetWidth; // força reflow
        fullscreenHint.classList.add('is-visible');
      } else {
        fullscreenHint.classList.remove('is-visible');
      }
    }
    if (fullscreenIcon) {
      fullscreenIcon.className = isFullscreen
        ? 'fa-solid fa-compress'
        : 'fa-solid fa-expand';
    }
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setFullscreen(!isFullscreen);
    });
    window.addEventListener('resize', function () {
      if (isFullscreen) positionFullscreenBtn();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isFullscreen) setFullscreen(false);
  });

  function goToDocIndex(i) {
    if (pageFlip) {
      pageFlip.flip(i);
    } else {
      goToSimple(i);
    }
  }

  /* ── Abrir / Fechar livro ─────────────────────────────────── */
  var pagesInitialized = false;

  function afterCoverOpen(targetIndex) {
    /* [FIX] initPagesExperience já roda antes, disparado no início de
       openBook() — aqui só revela o que já está pronto. */
    if (pagesInitialized && typeof targetIndex === 'number') {
      goToDocIndex(targetIndex);
    }
    book.classList.add('is-pages-visible');
  }

  function openBook(targetIndex) {
    if (isOpen) {
      // Livro já aberto: só navega, sem re-tocar a animação da capa.
      if (typeof targetIndex === 'number') goToDocIndex(targetIndex);
      return;
    }
    isOpen = true;
    book.setAttribute('aria-expanded', 'true');
    controls.classList.add('is-visible');
    controls.setAttribute('aria-hidden', 'false');
    closeBtn.classList.add('is-visible');
    if (btnBookmark) btnBookmark.classList.add('is-visible');

    /* [FIX] antes as ~189 páginas só começavam a ser montadas (e o
       StPageFlip inicializado) DEPOIS da capa terminar de abrir — dava
       aquele atraso visível até as páginas aparecerem. Como o
       .book__pages já fica com opacity:0 até a classe is-pages-visible
       entrar, é seguro montar tudo em paralelo, escondido, enquanto a
       capa ainda está girando. Quando a animação termina, só falta
       revelar (instantâneo). */
    if (!pagesInitialized) {
      initPagesExperience(targetIndex);
      pagesInitialized = true;
    }

    var onCoverOpen = function () { afterCoverOpen(targetIndex); };

    if (hasGsap && cover) {
      book.classList.add('gsap-driving');
      /* [FIX] com a transição CSS desligada (gsap-driving), a classe
         is-open logo abaixo já deixa o navegador aplicar o rotateY
         final instantaneamente — daí o GSAP lia esse valor já pronto
         como ponto de partida e não tinha nada pra animar (capa só
         "sumia" direto pro estado aberto). Fixamos o estado inicial
         explicitamente ANTES da classe entrar, garantindo que o GSAP
         sempre anime de 0 até -165, não importa o que o CSS já tenha
         aplicado. */
      window.gsap.set(cover, { rotationY: 0, transformPerspective: 1800 });
      /* [FIX] na 1ª abertura da sessão, a animação da capa fica mais
         lenta de propósito — dá mais tempo pras ~189 páginas + StPageFlip
         (que já começaram a montar em paralelo, acima) terminarem antes
         da revelação, sem atraso perceptível depois da capa abrir. Nas
         próximas aberturas (páginas já montadas) volta ao tempo normal. */
      var rotDur = firstOpenDone ? 1.1 : 1.9;
      var tl = window.gsap.timeline({
        onComplete: function () {
          book.classList.remove('gsap-driving');
          firstOpenDone = true;
        }
      });
      tl.to(book, { scale: 1.04, duration: .35, ease: 'power2.out' })
        .to(cover, {
          rotationY: -165,
          transformPerspective: 1800,
          duration: rotDur,
          ease: 'power3.inOut',
          onComplete: onCoverOpen
        }, '-=.1')
        .to(book, { scale: 1, duration: .3, ease: 'power2.out' }, '-=.3');
      book.classList.add('is-open');
    } else {
      // Fallback: CSS puro assume a rotação (classe .is-open já cobre isso).
      book.classList.add('is-open');
      setTimeout(onCoverOpen, firstOpenDone ? 950 : 1700);
      firstOpenDone = true;
    }
  }

  function closeBook() {
    if (!isOpen) return;
    isOpen = false;
    if (isFullscreen) setFullscreen(false);
    book.setAttribute('aria-expanded', 'false');
    controls.classList.remove('is-visible');
    controls.setAttribute('aria-hidden', 'true');
    closeBtn.classList.remove('is-visible');
    if (btnBookmark) btnBookmark.classList.remove('is-visible');

    if (hasGsap && cover) {
      window.gsap.to(cover, {
        rotationY: 0,
        transformPerspective: 1800,
        duration: .9,
        ease: 'power3.inOut'
      });
    }
    book.classList.remove('is-open');
    book.classList.remove('gsap-driving');
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

  if (btnBookmark) {
    btnBookmark.addEventListener('click', function (e) {
      e.stopPropagation();
      var current = getCurrentPageIndex();
      if (getBookmark() === current) clearBookmark();
      else setBookmark(current);
      updateBookmarkBtnUI();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!isOpen) return;
    if (e.key === 'ArrowRight') { if (pageFlip) pageFlip.flipNext(); else goToSimple(simpleIndex + 1); }
    if (e.key === 'ArrowLeft')  { if (pageFlip) pageFlip.flipPrev(); else goToSimple(simpleIndex - 1); }
    if (e.key === 'Escape') closeBook();
  });

  /* ── Painel Índice (agrupado por Tema > Capítulo) ─────────── */
  function docMatches(doc, term) {
    if (!term) return true;
    var haystack = [doc.title, doc.year, doc.theme, doc.chapter]
      .filter(Boolean).join(' ').toLowerCase();
    return haystack.indexOf(term) !== -1;
  }

  function renderIndexList(filter) {
    var term = (filter || '').trim().toLowerCase();
    indexList.innerHTML = '';

    // Agrupa: theme -> chapter (ou '' para páginas soltas) -> [{doc, i}]
    var themes = [];
    var themeMap = {};

    docs.forEach(function (doc, i) {
      if (doc.type === 'divider') return; // dividers não viram item de índice
      if (!docMatches(doc, term)) return;

      var themeKey = doc.theme || 'Documentos';
      if (!themeMap[themeKey]) {
        themeMap[themeKey] = { name: themeKey, chapters: [], chapterMap: {} };
        themes.push(themeMap[themeKey]);
      }
      var t = themeMap[themeKey];

      var chapterKey = doc.chapter || '';
      if (!t.chapterMap[chapterKey]) {
        t.chapterMap[chapterKey] = { name: chapterKey, items: [] };
        t.chapters.push(t.chapterMap[chapterKey]);
      }
      t.chapterMap[chapterKey].items.push({ doc: doc, i: i });
    });

    function makeItemBtn(doc, i) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'book-index-panel__item';
      btn.innerHTML = '<span>' + doc.year + '</span>' + doc.title;
      btn.addEventListener('click', function () {
        closeIndexPanel();
        openBook(i);
      });
      li.appendChild(btn);
      return li;
    }

    themes.forEach(function (t) {
      var themeDetails = document.createElement('details');
      themeDetails.className = 'book-index-panel__theme';
      themeDetails.open = !!term; // abre tudo automaticamente durante busca

      var themeSummary = document.createElement('summary');
      themeSummary.className = 'book-index-panel__theme-summary';
      themeSummary.textContent = t.name;
      themeDetails.appendChild(themeSummary);

      t.chapters.forEach(function (c) {
        if (c.name) {
          // Grupo com capítulo nomeado (ex.: cada edição do Epíplon)
          var chapterDetails = document.createElement('details');
          chapterDetails.className = 'book-index-panel__chapter';
          chapterDetails.open = !!term;

          var chapterSummary = document.createElement('summary');
          chapterSummary.className = 'book-index-panel__chapter-summary';
          chapterSummary.textContent = c.name;
          chapterDetails.appendChild(chapterSummary);

          var chapterList = document.createElement('ul');
          chapterList.className = 'book-index-panel__list book-index-panel__list--nested';
          c.items.forEach(function (entry) {
            chapterList.appendChild(makeItemBtn(entry.doc, entry.i));
          });
          chapterDetails.appendChild(chapterList);
          themeDetails.appendChild(chapterDetails);
        } else {
          // Páginas soltas do tema, sem capítulo
          var plainList = document.createElement('ul');
          plainList.className = 'book-index-panel__list';
          c.items.forEach(function (entry) {
            plainList.appendChild(makeItemBtn(entry.doc, entry.i));
          });
          themeDetails.appendChild(plainList);
        }
      });

      indexList.appendChild(themeDetails);
    });
  }

  function openIndexPanel() {
    indexPanel.classList.add('is-open');
    indexPanel.setAttribute('aria-hidden', 'false');
    indexBtn.setAttribute('aria-expanded', 'true');
    renderIndexList('');
    try { indexSearch.focus({ preventScroll: true }); } catch (err) { indexSearch.focus(); }
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
