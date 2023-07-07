const CustomError = require("../error/CustomError");
const { findByIdAndRemove } = require("../models/Item");
const Lens = require("../models/Lens");

const createEyeglassLens = async ({ name, index, QRcode, count }) => {
  const proviousEyeglassLens = await Lens.findOne({ name });

  if (proviousEyeglassLens) {
    throw new CustomError({
      status: 400,
      message: "There is a Lens with that name",
    });
  }

  const newLens = new Lens({
    name,
    index,
    QRcode,
    count,
  });

  await newLens.save();

  return { success: true, data: newLens };
};

const getAllEyeglassLens = async () => {
  const allLenses = await Lens.find();
  return { success: true, data: allLenses };
};

const getSingleLensService = async (id) => {
  const getSingleLensById = await Lens.findById(id);
  return { success: true, data: getSingleLensById };
};

const delGlassesLensService = async (id) => {
  const deleteGlassesLens = await Lens.findByIdAndRemove(id);
  return { success: true, data: deleteGlassesLens };
};
module.exports = {
  createEyeglassLens,
  getAllEyeglassLens,
  getSingleLensService,
  delGlassesLensService,
};
