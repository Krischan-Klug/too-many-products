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
}
