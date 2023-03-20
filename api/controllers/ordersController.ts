import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { OrderModel as Order } from "../models/order";

// @desc Get all orders
// @route GET /api/orders
// @access PRIVATE
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access PRIVATE
export const get = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error('Order not found');
  }
});

// @desc Create order
// @route POST /api/orders
// @access PRIVATE
export const add = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.create(req.body);

  if (order) {
    res.status(201).json(order);
  } else {
    res.status(400);
    throw new Error('Order could not be created');
  }
});

// @desc Update order
// @route PUT /api/orders/:id
// @access PRIVATE
export const update = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    res.status(400);
    throw new Error('Order not found');
  }
  
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (updated) {
    res.status(200).json(updated);
  } else {
    res.status(400);
    throw new Error('Order could not be updated');
  }  
});

// @desc Remove order
// @route DELETE /api/orders/:id
// @access PRIVATE
export const remove = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    res.status(400);
    throw new Error('Order not found');
  }

  const removed = await Order.findByIdAndRemove(req.params.id);
  if (removed) {
    res.status(200).json(removed);
  } else {
    res.status(400);
    throw new Error('User could not be removed');
  }  
});
