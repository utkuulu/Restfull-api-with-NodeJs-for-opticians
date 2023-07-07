const expressAsyncHandler = require("express-async-handler");

const {
  createEyeglassLens,
  getAllEyeglassLens,
  getSingleLensService,
  delGlassesLensService,
} = require("../services/EyeGlassLensService");

class EyeGlassLensController {
  static newGlassesLens = expressAsyncHandler(async (req, res) => {
    const { name, index, QRcode, count } = req.body;
    const response = await createEyeglassLens({ name, index, QRcode, count });
    res.json(response);
  });

  static allLensGet = expressAsyncHandler(async (req, res) => {
    const response = await getAllEyeglassLens();
    res.json(response);
  });

  static getSingleLens = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const response = await getSingleLensService(id);
    res.json(response);
  });

  static deleteEyeGlassesLens = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const response = await delGlassesLensService(id);
    res.json(response);
  });
}

module.exports = EyeGlassLensController;
