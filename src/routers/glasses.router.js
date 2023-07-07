const express = require("express");
const glassesController = require("../controllers/GlasessesController");
const glassesRouter = express.Router();

glassesRouter
  .route("/")
  .post(glassesController.addNewGlass)
  .get(glassesController.getAllGlasses);
glassesRouter
  .route("/:id")
  .get(glassesController.getSingleGlasses)
  .put(glassesController.updateSingleGlasses)
  .delete(glassesController.deleteSingleGlasses);

module.exports = glassesRouter;
