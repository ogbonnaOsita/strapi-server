const paystack = require("paystack")(
  "sk_test_ead0e323bfcc7fea095022a55068811f176d759e"
);
const expect = require("chai").expect;
("use strict");

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async create(ctx) {
    try {
      const item = {
        email: "theslyguy@icloud.com",
        amount: 500000,
      };
      // Initialize transaction
      const paystackSession = paystack.transaction
        .initialize(item)
        .then(function (body) {
          expect(body).to.have.property("data");
          expect(body.data).to.have.property("authorization_url");
          expect(body.data).to.have.property("access_code");
          expect(body.data).to.have.property("reference");
          reference = body.data.reference;

          // strapi.service("api::order.order").create({
          //   data: {
          //     products: item,
          //     paystackId: reference,
          //   },
          // });
        })
        .catch(function (error) {
          console.log(error);
        });

      return paystackSession;
    } catch (err) {
      ctx.response.status = 500;
      return err;
    }
  },
}));
