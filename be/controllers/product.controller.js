const Product = require('../models/products.model');
const ProductVariant = require('../models/productVariants.model');
const PurchaseOrder = require('../models/purchaseOrder.model');
const SalesOrder = require('../models/salesOrder.model');
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
        commonResponse(res, true, 'Success', product, 201);
    } catch (err) {
        commonResponse(res, false, 'Failure', null);
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
        commonResponse(res, true, 'Success', products);
    } catch (err) {
        commonResponse(res, false, 'Failure', null);
    }
}

async function getDashboard(req, res) {
    try {
        const productCount = await Product.countDocuments({ tenantId: req.user.tenantId });
        const variantCount = await ProductVariant.countDocuments({ tenantId: req.user.tenantId });
        const purchaseOrderCount = await PurchaseOrder.countDocuments({ tenantId: req.user.tenantId });
        const salesOrderCount = await SalesOrder.countDocuments({ tenantId: req.user.tenantId });

        const products = await Product.find({ tenantId: req.user.tenantId })
            .select('name description');
        const variants = await ProductVariant.find({ tenantId: req.user.tenantId })
            .select('sku quantity price size color');
        const purchaseOrders = await PurchaseOrder.find({ tenantId: req.user.tenantId })
            .select('date quantity totalPrice').populate('supplierId', 'name');
        const salesOrders = await SalesOrder.find({ tenantId: req.user.tenantId })
            .select('date quantity totalPrice');
        commonResponse(res, true, 'Success', {
            counts: {
                products: productCount,
                variants: variantCount,
                purchaseOrders: purchaseOrderCount,
                salesOrders: salesOrderCount,
                purchaseOrders,
                salesOrders
            },
            products,
            variants
        });
    } catch (err) {
        commonResponse(res, false, 'Failure', null);
    }
}

module.exports = { createProduct, getProducts, getDashboard };
