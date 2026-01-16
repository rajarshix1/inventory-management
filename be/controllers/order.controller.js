const mongoose = require('mongoose');
const PurchaseOrder = require('../models/purchaseOrder.model');
const SalesOrder = require('../models/salesOrder.model');
const ProductVariant = require('../models/productVariants.model');
const { commonResponse } = require('../utils/utils');

async function createSalesOrder(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { tenantId } = req.user;
        const { customerName, customerEmail, productId, variantId, quantity } = req.body;

        const variant = await ProductVariant.findOneAndUpdate(
            { _id: variantId, tenantId, quantity: { $gte: quantity } },
            { $inc: { quantity: -quantity } },
            { session, new: true }
        );

        if (!variant) {
            throw new Error("Product variant not found or insufficient stock");
        }

        const date = new Date();
        const totalPrice = variant.price * quantity;

        const [order] = await SalesOrder.create([{
            tenantId, customerName, customerEmail, date, productId, variantId, quantity, totalPrice,
            orderStatus: 'Confirmed'
        }], { session });

        await session.commitTransaction();
        commonResponse(res, true, 'Success', order, 201);
    } catch (err) {
        await session.abortTransaction();
        commonResponse(res, false, 'Failure', err.message);
    } finally {
        session.endSession();
    }
}

async function createPurchaseOrder(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { tenantId } = req.user;
        console.log(req.user)
        const { supplierId, productId, variantId, quantity } = req.body;

        const variant = await ProductVariant.findById(variantId);

        if (!variant) {
            throw new Error("Variant not found");
        }

        const date = new Date();
        const totalPrice = variant.price * quantity;
        // variant.quantity += quantity;
        // await variant.save({ session });
        const [order] = await PurchaseOrder.create([{
            tenantId, supplierId, date, productId, variantId, quantity, totalPrice,
            orderStatus: 'Draft'
        }], { session });

        await session.commitTransaction();
        commonResponse(res, true, 'Success', order, 201);
    } catch (err) {
        await session.abortTransaction();
        commonResponse(res, false, 'Failure', err.message);
    } finally {
        session.endSession();
    }
}

async function updatePurchaseOrderStatus(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { id } = req.params;
        const { status } = req.body;
        const orderstatuses = ['Draft', 'Sent', 'Confirmed', 'Received'];
            if(!status){
                throw new Error("Status is required");
            }
            if (!orderstatuses.includes(status)) {
                throw new Error("Invalid status");
            }
            const order = await PurchaseOrder.findById(id).session(session);
            if (!order) {
                throw new Error("Order not found");
            }
            if(order && order.orderStatus === 'Received'){
                throw new Error("Order already received");
            }
            if(order && orderstatuses.indexOf(status) !== orderstatuses.indexOf(order.orderStatus) + 1){
                throw new Error(`Invalid status transition from ${order.orderStatus} to ${status}`);
            }

            if (status === 'Received' && order.orderStatus !== 'Received') {
                await ProductVariant.findByIdAndUpdate(
                    order.variantId,
                    { $inc: { quantity: order.quantity } },
                    { session }
                );
            }
            order.orderStatus = status;
            await order.save({ session });

        await session.commitTransaction();
        commonResponse(res, true, 'Success', "Data updated successfully");
    } catch (err) {
        await session.abortTransaction();
        commonResponse(res, false, 'Failure', err.message);
    } finally {
        session.endSession();
    }
}

module.exports = {
    createSalesOrder,
    createPurchaseOrder,
    updatePurchaseOrderStatus
};
