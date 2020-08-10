/**
 * FlowerBasketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login: (req, res) => {},

  placeOrder: (req, res) => {},

  viewCombos: (req, res) => {
    FlowerBasket.find({}).exec(function (err, result) {
      if (err) {
        res.send(500, { error: "Error in Database" });
      }
      if (result == "") {
        res.send("No data present");
      }
      console.log(result);
      res.view("pages/viewcombos", { combos: result });
    });
  },
  viewComboDetails: (req, res) => {
    let id = req.param("id");
    FlowerBasket.find({ id: id }).exec(function (err, result) {
      if (err) {
        res.send(500, { error: "Error in Database" });
      }
      if (result == "") {
        res.send("No data present");
      }
      console.log(result);
      res.view("pages/viewcombodetails", { combo: result });
    });
  },

  userOrderHistory: (req, res) => {},
};
