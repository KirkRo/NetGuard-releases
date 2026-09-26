// Магазин на сайте: Paddle (Merchant of Record) принимает карту, Apple Pay, Google Pay и PayPal.
//
// token  - client-side token из Paddle > Developer tools > Authentication (начинается с
//          "live_"; он и задуман публичным, секретного ключа API здесь нет и быть не должно);
// prices - Price ID каждого срока из Paddle > Catalog (начинается с "pri_").
//
// Пусто - кнопки «Купить» открывают заказ в Telegram, как в программе.
// Цены на страницах сверяет самотест с Licence.Plans: меняется цена - меняются и страницы.
window.NETGUARD_SHOP = {
  environment: "production",
  token: "",
  prices: {
    "3m": "",
    "6m": "",
    "12m": "",
    "forever": ""
  },
  telegram: "kirk_ro"
};
