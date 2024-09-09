import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const productData = req.body;
      const product = new Product(productData);
      await product.save();
      console.log(product);
      return res.status(200).json({ status: "Product created!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Product.findOneAndDelete({ _id: req.body._id });
      return res.status(200).json({ status: "Product deleted!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  if (req.method === "GET") {
    try {
      let products = await Product.find();

      return res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
