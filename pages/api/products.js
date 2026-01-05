import { connectDB } from "../../lib/mongodb";
import Product from "../../models/Product";
import { z } from "zod";
import cloudinary from "../../lib/cloudinary";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb"
    }
  }
};

const productValidationSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be a positive number"),
  stock: z.number().int().nonnegative("Stock must be zero or more"),
  imageUrl: z.string().optional(),
  imagePublicId: z.string().optional()
});

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === "GET") {
      const allProducts = await Product.find();
      return res.status(200).json(allProducts);
    }

    if (req.method === "POST") {
      let imageUrl = "";
      let imagePublicId = "";

      if (req.body.image) {
        const uploadRes = await cloudinary.uploader.upload(req.body.image, {
          folder: "products"
        });

        imageUrl = uploadRes.secure_url;
        imagePublicId = uploadRes.public_id;
      }

      const newProductData = {
        name: req.body.name,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        imageUrl,
        imagePublicId
      };

      if (
        Number.isNaN(newProductData.price) ||
        Number.isNaN(newProductData.stock)
      ) {
        return res.status(400).json({
          errors: ["Price and stock must be valid numbers"]
        });
      }

      const validationResult =
        productValidationSchema.safeParse(newProductData);

      if (!validationResult.success) {
        return res.status(400).json({
          errors: validationResult.error.errors.map(e => e.message)
        });
      }

      const createdProduct = await Product.create(validationResult.data);
      return res.status(201).json(createdProduct);
    }

    if (req.method === "DELETE") {
      const { id: productId } = req.query;

      if (!productId) {
        return res.status(400).json({
          message: "Product ID is required"
        });
      }

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      await Product.findByIdAndDelete(productId);

      return res.status(200).json({
        message: "Product deleted successfully"
      });
    }

    if (req.method === "PUT") {
      const { id: productId } = req.query;

      if (!productId) {
        return res.status(400).json({
          message: "Product ID is required"
        });
      }

      const existingProduct = await Product.findById(productId);

      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      let imageUrl = existingProduct.imageUrl;
      let imagePublicId = existingProduct.imagePublicId;

      if (req.body.image?.startsWith("data:image")) {
        if (imagePublicId) {
          await cloudinary.uploader.destroy(imagePublicId);
        }

        const uploadRes = await cloudinary.uploader.upload(req.body.image, {
          folder: "products"
        });

        imageUrl = uploadRes.secure_url;
        imagePublicId = uploadRes.public_id;
      }

      await Product.findByIdAndUpdate(productId, {
        name: req.body.name,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        imageUrl,
        imagePublicId
      });

      return res.status(200).json({
        message: "Product updated successfully"
      });
    }

    return res.status(405).json({ message: "Method not allowed" });

  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({
      message: error.message || "Internal server error"
    });
  }
}
