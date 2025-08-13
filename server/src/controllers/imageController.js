import cloudinary from "../config/cloudinary.js";
import ImageCollection from "../models/ImageModel.js";

// Upload multiple images
export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

     // Size check (max 500 KB per file)
    for (const file of req.files) {
      if (file.size > 500 * 1024) {
        return res.status(400).json({
          success: false,
          message: `File "${file.originalname}" exceeds 500 KB limit`,
        });
      }
    }

    const uploadedImages = await Promise.all(
      req.files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "PK_image_gallery" },
              (error, result) => {
                if (error) reject(error);
                else
                  resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                  });
              }
            );
            stream.end(file.buffer);
          })
      )
    );

    const savedDoc = await ImageCollection.create({
      title: req.body.title || "Untitled",
      images: uploadedImages,
    });

    res.status(201).json({ success: true, data: savedDoc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a single image by image _id
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the document containing this image
    const doc = await ImageCollection.findOne({ "images._id": id });
    if (!doc) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    // Extract the public_id of the image to delete
    const image = doc.images.id(id);
    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found in document" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Remove from MongoDB
    await ImageCollection.updateOne(
      { "images._id": id },
      { $pull: { images: { _id: id } } }
    );

    res.json({ success: true, message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all uploaded images
export const getImages = async (req, res) => {
  try {
    const images = await ImageCollection.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

