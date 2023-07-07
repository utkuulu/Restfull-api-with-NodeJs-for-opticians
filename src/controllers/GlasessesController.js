const expressAsyncHandler = require("express-async-handler");
const {
  createGlassesService,
  getAllGlassesService,
  getSingleGlassesService,
  updateGlassesService,
  deleteGlassesService,
} = require("../services/GlassesServices");

class GlassesController {
  static addNewGlass = expressAsyncHandler(async (req, res) => {
    const {
      brand,
      type,
      color,
      stockCount,
      price,
      frameMaterial,
      lensType,
      gender,
      size,
    } = req.body;

    const image = req.files.image;

    const response = await createGlassesService({
      brand,
      type,
      color,
      stockCount,
      price,
      frameMaterial,
      lensType,
      gender,
      size,
      image,
    });
    res.json(response);
  });

  static getAllGlasses = expressAsyncHandler(async (req, res) => {
    const response = await getAllGlassesService();
    res.json(response);
  });

  static getSingleGlasses = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const response = await getSingleGlassesService(id);
    res.json(response);
  });

  static updateSingleGlasses = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    const image = req.files.image;
    const response = await updateGlassesService({
      itemId: id,
      updatedFields,
      image,
    });
    res.json(response);
  });

  static deleteSingleGlasses = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const response = await deleteGlassesService(id);
    res.json(response);
  });
}

module.exports = GlassesController;
