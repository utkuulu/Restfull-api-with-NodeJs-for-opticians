const CustomError = require("../error/CustomError");
const Item = require("../models/Item");
const { uniqueKeyGenerator } = require("../utils/keyGenerator");
const FormData = require("form-data");
const path = require("path");
const fs = require("fs");

const createGlassesService = async ({
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
  createdAt,
  updatedAt,
}) => {
  try {
    const uniqueFileName = `${uniqueKeyGenerator()}-${Date.now()}.png`;

    const basePath = path.join(__dirname, "..", "public", "uploads");

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }

    const uploadPath = path.join(basePath, uniqueFileName);

    const form = new FormData();
    form.append("image", image.data);

    const createdGlasses = new Item({
      brand,
      type,
      color,
      stockCount,
      price,
      frameMaterial,
      lensType,
      gender,
      size,
      image: uniqueFileName,
      createdAt,
      updatedAt,
    });

    await createdGlasses.save();
    await image.mv(uploadPath);

    return { success: true, data: { createdGlasses } };
  } catch (err) {
    throw new CustomError({
      status: 500,
      message: err,
    });
  }
};

const getAllGlassesService = async () => {
  const glasses = await Item.find();
  return { success: true, data: glasses };
};

const getSingleGlassesService = async (itemId) => {
  const glasses = await Item.findById(itemId);
  return { success: true, data: glasses };
};

const updateGlassesService = async ({ itemId, updatedFields, image }) => {
  try {
    const updateData = {
      ...updatedFields,
      updatedAt: new Date(),
    };

    if (image !== undefined && image !== null) {
      const uniqueFileName = `${uniqueKeyGenerator()}-${Date.now()}.png`;
      const basePath = path.join(__dirname, "..", "public", "uploads");

      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      const uploadPath = path.join(basePath, uniqueFileName);

      await image.mv(uploadPath);

      // Eski resmi sil
      const existingGlass = await Item.findById(itemId);
      if (existingGlass && existingGlass.image) {
        const existingImagePath = path.join(basePath, existingGlass.image);
        if (fs.existsSync(existingImagePath)) {
          await fs.unlink(existingImagePath, (err) => {
            if (err) {
              console.error("Eski resim silinemedi:", err);
            }
          });
        }
      }

      updateData.image = uniqueFileName;
    }

    const updateGlass = await Item.findByIdAndUpdate(
      { _id: itemId },
      { $set: updateData },
      { new: true }
    );

    return { success: true, data: updateGlass };
  } catch (err) {
    throw new CustomError({
      status: 500,
      message: err,
    });
  }
};

const deleteGlassesService = async (id) => {
  try {
    // Öğeyi bul
    const existingGlass = await Item.findById(id);

    // Görseli sil
    if (existingGlass && existingGlass.image) {
      const basePath = path.join(__dirname, "..", "public", "uploads");
      const imagePath = path.join(basePath, existingGlass.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Öğeyi veritabanından kaldır
    const deleteGlass = await Item.findByIdAndRemove(id);

    return { success: true, data: deleteGlass };
  } catch (err) {
    throw new CustomError({
      status: 500,
      message: err,
    });
  }
};

module.exports = {
  createGlassesService,
  getAllGlassesService,
  getSingleGlassesService,
  updateGlassesService,
  deleteGlassesService,
};
