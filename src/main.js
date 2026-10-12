(function () {
  "use strict";

  var C = window.PLATINUM;
  if (!C) return;

  var ICONS = "assets/icons.svg#";

  function waLink(message) {
    return "https://wa.me/" + C.whatsappPrimary + "?text=" + encodeURIComponent(message || C.whatsappMessage);
  }

  function formatBRL(value) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  }

  function icon(name) {
    return '<svg class="icon" aria-hidden="true"><use href="' + ICONS + name + '"/></svg>';
  }

  function esc(text) {
    var d = document.createElement("div");
    d.textContent = text;
    return d.innerHTML;
  }

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, C);
  }

  function addressLine() {
    var a = C.address;
    return a.street + ", " + a.city + "/" + a.state + ", CEP " + a.zip;
  }

  // Valores derivados usados em data-bind
  var derived = {
    addressLine: addressLine(),
    "promotion.priceInt": String(Math.floor(C.promotion.price)),
  };

  // Textos
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    var key = el.getAttribute("data-bind");
    var value = key in derived ? derived[key] : get(key);
    if (value != null) el.textContent = value;
  });

  // Listas
  function render(name, items, template) {
    var el = document.querySelector('[data-render="' + name + '"]');
    if (el) el.innerHTML = items.map(template).join("");
  }

  render("problems", C.problems, function (p) {
    return '<li class="card">' + icon(p.icon) + "<span>" + esc(p.title) + "</span></li>";
  });
  render("services", C.services, function (s) {
    return '<li class="card">' + icon(s.icon) + "<h3>" + esc(s.title) + "</h3><p>" + esc(s.description) + "</p></li>";
  });
  render("differentiators", C.differentiators, function (d) {
    return '<li class="card">' + icon(d.icon) + "<span>" + esc(d.title) + "</span></li>";
  });
  render("benefits", C.promotion.benefits, function (b) {
    return "<li>" + esc(b) + "</li>";
  });

  // Links de contato
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    var msg = a.getAttribute("data-wa") === "promotion" ? C.promotion.whatsappMessage : C.whatsappMessage;
    a.href = waLink(msg);
  });
  var tel1 = document.querySelector('[data-tel="primary"]');
  if (tel1) tel1.href = "tel:+" + C.whatsappPrimary;
  var tel2 = document.querySelector('[data-tel="secondary"]');
  if (tel2) tel2.href = "tel:+" + C.phoneSecondary;
  var mail = document.querySelector("[data-mail]");
  if (mail) mail.href = "mailto:" + C.email;
  var ig = document.querySelector("[data-instagram]");
  if (ig) ig.href = "https://instagram.com/" + C.instagram;
  var fb = document.querySelector("[data-facebook]");
  if (fb) fb.href = C.facebook;
  var map = document.querySelector("[data-map]");
  if (map) map.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(C.address.street + ", " + C.address.city + ", " + C.address.state + ", " + C.address.zip);

  // Ano do rodapé
  var year = document.getElementById("ano");
  if (year) year.textContent = new Date().getFullYear();

  // Preço formatado, usado como rótulo acessível
  var price = document.querySelector(".promo-price");
  if (price) price.setAttribute("aria-label", formatBRL(C.promotion.price));

  // Menu móvel
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      menu.classList.toggle("is-open", open);
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Vídeo do topo: botão "Assistir" sobre o vídeo; depois do primeiro play, aparecem os controles do navegador
  var heroVideo = document.querySelector(".hero-video video");
  var heroPlay = document.querySelector(".hero-play");
  if (heroVideo && heroPlay) {
    var frame = heroVideo.parentNode;
    heroPlay.addEventListener("click", function () {
      heroVideo.setAttribute("controls", "");
      var p = heroVideo.play();
      if (p && p.catch) p.catch(function () {});
    });
    heroVideo.addEventListener("play", function () { frame.classList.add("is-playing"); });
    heroVideo.addEventListener("ended", function () {
      frame.classList.remove("is-playing");
      heroVideo.removeAttribute("controls");
      heroVideo.currentTime = 0;
    });
  }
})();
