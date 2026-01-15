const Product = require('../models/products.model');
const ProductVariant = require('../models/productVariants.model');
const { commonResponse } = require('../utils/utils');

async function createProduct(req, res) {
    try {
        const { name, description, price, variants } = req.body;
        const product = await Product.create({
            name,
            description,
            price,
            tenantId: req.user.tenantId
        });
        if (variants && variants.length > 0) {
            const productVariants = variants.map(variant => ({
                sku: variant.sku,
                productId: product._id,
                tenantId: req.user.tenantId,
                quantity: variant.quantity,
                price: variant.price,
                size: variant?.size,
                color: variant?.color
            }));
            await ProductVariant.insertMany(productVariants);
        }
        commonResponse(res, true, product, 201);
    } catch (err) {
        commonResponse(res, false, err.message);
    }
}

async function getProducts(req, res) {
    try {
       const products = await Product.aggregate([
              { $match: { tenantId: req.user.tenantId } },
              {
                  $lookup: {
                      from: 'productvariants', 
                      localField: '_id',
                      foreignField: 'productId',
                      as: 'variants'
                  }
              }
          ]);
        commonResponse(res, true, products);
    } catch (err) {
        commonResponse(res, false, err.message);
    }
}

module.exports = { createProduct, getProducts };
