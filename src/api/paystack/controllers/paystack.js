const paystack = require("paystack")(
  "sk_test_ead0e323bfcc7fea095022a55068811f176d759e"
);
const expect = require("chai").expect;

("use strict");

/**
 * A set of functions called "actions" for `paystack`
 */

module.exports = {
  async makePayment(ctx) {
    const item = {
      email: "theslyguy@icloud.com",
      amount: 500000,
      onClose: () => {
        alert("So sorry you are leaving");
      },
    };
    try {
      // Initialize transaction
      const paymentRequest = await paystack.transaction
        .initialize({
          email: "theslyguy@icloud.com",
          amount: 500000,
          callback_url: "http://localhost:5173/verify",
        })
        .then((body) => {
          expect(body).to.have.property("data");
          expect(body.data).to.have.property("authorization_url");
          expect(body.data).to.have.property("access_code");
          expect(body.data).to.have.property("reference");
          reference = body.data.reference;

          return body.data;
        })
        .catch((error) => {
          console.log(error);
        });
      return { paystackSession: paymentRequest };
      // return item;
    } catch (err) {
      ctx.response.status = 500;
      return err;
    }
  },
};
