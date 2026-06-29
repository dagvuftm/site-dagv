/**
 * DAGV – Side Menu Tab
 * sidemenu.js  |  Adição ao navbar existente (não modifica script.js)
 *
 * Comportamento:
 *  - O painel principal abre/fecha ao clicar na aba (.sidemenu-tab)
 *  - Os dropdowns internos (Coordenação, Informações) abrem/fecham
 *    ao clicar em seus respectivos botões
 *  - Clicar fora fecha tudo
 *  - Links que apontam para âncoras (#) fecham o painel e fazem
 *    smooth-scroll sem conflito com o script.js existente
 *  - [AJUSTE] Estado ativo: apenas o item da página atual fica dourado
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Referências ────────────────────────────────────────── */
    var wrap       = document.getElementById('sidemenuWrap');
    var tab        = document.getElementById('sidemenuTab');
    var dropBtns   = document.querySelectorAll('.sidemenu-list__btn[data-dropdown]');

    if (!wrap || !tab) return; // segurança: sai se o HTML não estiver presente

    /* ── Estado ativo: apenas páginas internas ──────────────────
       A página inicial (index.html / raiz) não destaca nenhum item.
       Páginas internas destacam apenas o link correspondente.
       Nunca mais de um item ativo ao mesmo tempo.
    ─────────────────────────────────────────────────────────── */
    (function markActiveLink() {
      var path     = window.location.pathname;
      var filename = path.split('/').pop();

      // Raiz vazia, '/' ou 'index.html' → home, sem destaque
      if (!filename || filename === '' || filename === 'index.html') return;

      // Mapa: nome do arquivo → href do link no sidemenu
      var pageMap = {
        'sobre.html':       'sobre.html',
        'coordenacao.html': 'coordenacao.html',
        'historico2.html':  'historico2.html',
        'ligas.html':       'ligas.html',
        'cursinho.html':    'cursinho.html',
        'pet.html':         'pet.html',
      };

      var targetHref = pageMap[filename] || null;
      if (!targetHref) return; // página desconhecida → sem destaque

      wrap.querySelectorAll('.sidemenu-list__link').forEach(function (link) {
        link.classList.remove('sidemenu-list__link--active');
        var href = (link.getAttribute('href') || '').replace(/^.*\//, '');
        if (href === targetHref) {
          link.classList.add('sidemenu-list__link--active');
        }
      });
    }());

    /* ── Abre / fecha o painel principal ─────────────────────── */
    tab.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = wrap.classList.toggle('open');
      tab.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* ── Dropdowns internos ──────────────────────────────────── */
    dropBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var item = btn.closest('.sidemenu-list__item');
        if (!item) return;

        // Fecha outros dropdowns abertos (accordion)
        dropBtns.forEach(function (other) {
          var otherItem = other.closest('.sidemenu-list__item');
          if (otherItem && otherItem !== item) {
            otherItem.classList.remove('open');
            other.setAttribute('aria-expanded', 'false');
          }
        });

        var nowOpen = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
      });
    });

    /* ── Fecha tudo ao clicar fora ───────────────────────────── */
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) {
        wrap.classList.remove('open');
        tab.setAttribute('aria-expanded', 'false');
        // Fecha dropdowns internos também
        dropBtns.forEach(function (btn) {
          btn.closest('.sidemenu-list__item').classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        });
      }
    });

    /* ── Fecha painel ao clicar num link âncora ──────────────── */
    var anchorLinks = wrap.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        wrap.classList.remove('open');
        tab.setAttribute('aria-expanded', 'false');
      });
    });

  });

}());
