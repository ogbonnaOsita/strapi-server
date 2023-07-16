module.exports = {
  routes: [
    {
      method: "POST",
      path: "/paystack",
      handler: "paystack.makePayment",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
