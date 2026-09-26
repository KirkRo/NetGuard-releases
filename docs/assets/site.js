// Кнопки «Купить»: оплата через Paddle, если магазин настроен (shop.js), иначе заказ в Telegram.
// Ссылка ?buy=12m (её открывает программа) сразу открывает оплату этого срока.
(function () {
  "use strict";

  var shop = window.NETGUARD_SHOP || {};
  var ru = (document.documentElement.lang || "en").indexOf("ru") === 0;

  var TERMS = {
    "3m": { ru: "на 3 месяца", en: "for 3 months" },
    "6m": { ru: "на 6 месяцев", en: "for 6 months" },
    "12m": { ru: "на 12 месяцев", en: "for 12 months" },
    "forever": { ru: "навсегда", en: "forever" }
  };

  function priceOf(term) {
    return shop.prices && typeof shop.prices[term] === "string" ? shop.prices[term] : "";
  }

  function paddleReady() {
    return typeof shop.token === "string" && shop.token.length > 0;
  }

  function telegramUrl(term, price) {
    var name = TERMS[term] ? TERMS[term][ru ? "ru" : "en"] : "";
    var text = ru
      ? "Здравствуйте! Хочу купить ключ NetGuard Marine " + name + " за " + price + "."
      : "Hello! I would like to buy a NetGuard Marine key " + name + " for " + price + ".";
    return "https://t.me/" + (shop.telegram || "kirk_ro") + "?text=" + encodeURIComponent(text);
  }

  var paddleLoading = null;
  function loadPaddle() {
    if (paddleLoading) return paddleLoading;
    paddleLoading = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
      s.async = true;
      s.onload = function () {
        try {
          if (shop.environment === "sandbox") window.Paddle.Environment.set("sandbox");
          window.Paddle.Initialize({ token: shop.token });
          resolve(window.Paddle);
        } catch (e) { reject(e); }
      };
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return paddleLoading;
  }

  function openCheckout(term) {
    var priceId = priceOf(term);
    if (!paddleReady() || !priceId) return false;
    loadPaddle().then(function (Paddle) {
      Paddle.Checkout.open({
        items: [{ priceId: priceId, quantity: 1 }],
        settings: {
          displayMode: "overlay",
          locale: ru ? "ru" : "en",
          successUrl: new URL(ru ? "../thanks.html?lang=ru" : "thanks.html", location.href).href
        }
      });
    });
    return true;
  }

  var buttons = document.querySelectorAll("[data-buy]");
  Array.prototype.forEach.call(buttons, function (button) {
    var term = button.getAttribute("data-buy");
    var price = button.getAttribute("data-price") || "";
    if (paddleReady() && priceOf(term)) {
      button.setAttribute("href", "#buy-" + term);
    } else {
      button.setAttribute("href", telegramUrl(term, price));
      button.setAttribute("target", "_blank");
      button.setAttribute("rel", "noopener");
      var label = button.querySelector("[data-label]");
      if (label) label.textContent = ru ? "Заказать в Telegram" : "Order on Telegram";
    }
    button.addEventListener("click", function (e) {
      if (openCheckout(term)) e.preventDefault();
    });
  });

  var note = document.querySelector("[data-shop-note]");
  if (note && !paddleReady()) note.hidden = false;

  // ?buy=12m из программы: оплата этого срока, или хотя бы карточка срока на виду.
  var wanted = new URLSearchParams(location.search).get("buy");
  if (wanted && TERMS[wanted]) {
    var card = document.getElementById("plan-" + wanted);
    if (card) {
      card.classList.add("picked");
      card.scrollIntoView({ block: "center" });
    }
    openCheckout(wanted);
  }
})();
