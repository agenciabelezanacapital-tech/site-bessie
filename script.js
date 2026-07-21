/* =========================================================
   BESSIE BEAUTY CLUB - SETÚBAL
   Scripts da landing page
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Ano atual no rodapé ---------- */
  var anoEl = document.getElementById('ano-atual');
  if (anoEl) {
    anoEl.textContent = new Date().getFullYear();
  }

  /* ---------- Header com sombra ao rolar ---------- */
  var header = document.getElementById('header');
  function atualizarHeader() {
    if (window.scrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  atualizarHeader();
  window.addEventListener('scroll', atualizarHeader);

  /* ---------- Menu hambúrguer no mobile ---------- */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');

  hamburger.addEventListener('click', function () {
    var aberto = nav.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', aberto);
    hamburger.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  });

  // Fecha o menu ao clicar em um link (mobile)
  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll suave para âncoras ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var destinoId = this.getAttribute('href');
      if (destinoId.length > 1) {
        var destino = document.querySelector(destinoId);
        if (destino) {
          e.preventDefault();
          destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Animação de entrada (fade-in) ao rolar ---------- */
  var elementosFade = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          observer.unobserve(entrada.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    elementosFade.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback para navegadores sem suporte a IntersectionObserver
    elementosFade.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Rastreamento de cliques no WhatsApp ---------- */
  var botoesWhatsApp = document.querySelectorAll('.whatsapp-cta');
  botoesWhatsApp.forEach(function (botao) {
    botao.addEventListener('click', function () {
      trackWhatsAppClick(botao);
    });
  });

  /**
   * Dispara o evento de conversão ao clicar em um botão de WhatsApp.
   * O clique NÃO é bloqueado: o link continua abrindo normalmente em nova aba.
   * Chamamos gtag_report_conversion() sem "url" (função definida no <head>)
   * justamente para não redirecionar a aba atual — os links já abrem o
   * WhatsApp em uma nova aba via target="_blank".
   */
  function trackWhatsAppClick(botao) {
    var origem = botao.closest('section');
    var idOrigem = origem ? (origem.id || origem.className) : 'desconhecida';

    if (typeof gtag_report_conversion === 'function') {
      gtag_report_conversion();
    }

    console.log('Clique no WhatsApp registrado. Origem:', idOrigem);
  }

});
