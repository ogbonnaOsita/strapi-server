var paystack = require("paystack")(
  "sk_test_ead0e323bfcc7fea095022a55068811f176d759e"
);
const expect = require("chai").expect;
const https = require("https");

("use strict");

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const params = JSON.stringify({
      email: "customer@email.com",
      amount: "20000",
    });
    try {
      // Initialize transaction
      const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
          Authorization:
            "Bearer sk_test_ead0e323bfcc7fea095022a55068811f176d759e",
          "Content-Type": "application/json",
        },
      };

      const req = https
        .request(options, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            console.log(JSON.parse(data));
          });
        })
        .on("error", (error) => {
          console.error(error);
        });

      req.write(params);
      req.end();
      // return item;
    } catch (err) {
      ctx.response.status = 500;
      return err;
    }
  },
}));
