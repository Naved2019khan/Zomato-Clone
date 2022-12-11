"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _allModels = require("../../database/allModels");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();

/**
 * Route     /list/:_id
 * Des       Get menu based on menu id
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/list/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const menus = await _allModels.MenuModel.findById(_id);
    if (!menus) {
      return res.status(404).json({
        error: "No menu present for this restaurant"
      });
    }
    return res.json({
      menus
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

/**
 * Route     /image
 * Des       Get all list of menu images with id
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/image/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const menuImages = await _allModels.ImageModel.findById(_id);
    if (!menuImages) {
      return res.status(404).json({
        message: "No menu images found."
      });
    }
    return res.json({
      menuImages
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;