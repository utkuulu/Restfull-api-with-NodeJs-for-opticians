const express = require("express");
const eyeGlassLensController = require("../controllers/eyeGlassLensController");
const eyeGlassLensRouter = express.Router();

eyeGlassLensRouter
  .route("/")
  .post(eyeGlassLensController.newGlassesLens)
  .get(eyeGlassLensController.allLensGet);

eyeGlassLensRouter
  .route("/:id")
  .get(eyeGlassLensController.getSingleLens)
  .delete(eyeGlassLensController.deleteEyeGlassesLens);

module.exports = eyeGlassLensRouter;
