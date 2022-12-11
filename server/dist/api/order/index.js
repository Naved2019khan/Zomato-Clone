"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _allModels = require("../../database/allModels");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();

/**
 * Route     /
 * Des       Get all orders by user id
 * Params    none
 * Access    Private
 * Method    GET
 */
Router.get("/", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    const getOrders = await _allModels.OrderModel.findOne({
      user: user._id
    });
    if (!getOrders) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    return res.status(200).json({
      orders: getOrders
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route     /new
 * Des       Add new order
 * Params    none
 * Access    Private
 * Method    PUT
 */
Router.put("/new", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    const {
      orderDetails
    } = req.body;

    // Task: Validate orderDetails

    const addNewOrder = await _allModels.OrderModel.findOneAndUpdate({
      user: user._id
    }, {
      $push: {
        orderDetails: orderDetails
      }
    }, {
      new: true
    });
    return res.json({
      order: addNewOrder
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;