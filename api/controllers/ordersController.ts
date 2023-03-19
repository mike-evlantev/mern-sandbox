import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { OrderModel as Order } from "../models/order";

// @desc Get all orders
// @route GET /api/orders
// @access PUBLIC
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access PUBLIC
export const get = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  res.status(200).json(order);
});

// @desc Create order
// @route POST /api/orders
// @access PRIVATE
export const add = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.create(req.body);  
  res.status(201).json(order);
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
  res.status(200).json(updated);
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
  res.status(200).json(removed);
});
