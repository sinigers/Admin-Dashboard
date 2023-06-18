import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";


export const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
  
    //   get Stat-info for each product, for more speed: agregat func or SQL joints
      const productsWithStats = await Promise.all(
        products.map(async (product) => {
          const stat = await ProductStat.find({
            productId: product._id,
          });
          return {
            ...product._doc,
            stat,
          };
        })
      );
  
      res.status(200).json(productsWithStats);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };