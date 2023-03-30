import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthorizedRequest } from "../middleware/auth";
import { UserModel as User } from "../models/user";
import { generateToken } from "../utils/auth";

// @desc Get all users
// @route GET /api/users
// @access PRIVATE
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
});

// @desc Get user by id
// @route GET /api/users/:id
// @access PRIVATE
export const get = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-password');
  res.status(200).json(user);
});

// @desc Get logged in user
// @route GET /api/users/current
// @access PRIVATE
export const current = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById((req as AuthorizedRequest).token.id).select('-password');
  if (user) {
    res.status(200).json({
      id: user.id,
      first: user.first,
      last: user.last,
      isActive: user.isActive
    });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

// @desc Log in user
// @route POST /api/users/login
// @access PUBLIC
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password required');
  }
  
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      first: user.first,
      last: user.last,
      email: user.email,
      isActive: user.isActive,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc Create user
// @route POST /api/users
// @access PRIVATE
export const add = asyncHandler(async (req: Request, res: Response) => {
  const { email, first, last, password } = req.body;
  if (!email || !first || !last || !password) {
    res.status(400);
    throw new Error('All fields required');
  }
  
  let user = await User.findOne({ email }).select('-password');
  if (user) {
    res.status(400);
    throw new Error('User already exists');
  }

  user = await User.create({ email, first, last, password }); // Password is encrypted as part of the User model middleware

  if (user) {
    res.status(201).json({
      id: user.id,
      first: user.first,
      last: user.last,
      isActive: user.isActive,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }  
});

// @desc Update user
// @route PUT /api/users/:id
// @access PRIVATE
export const update = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);  
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
  
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (updated) {
    res.status(200).json({
      id: updated.id,
      first: updated.first,
      last: updated.last,
      isActive: updated.isActive
    });
  } else {
    res.status(400);
    throw new Error('User could not be updated');
  }  
});

// @desc Remove user
// @route DELETE /api/users/:id
// @access PRIVATE
export const remove = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);  
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  const removed = await User.findByIdAndRemove(req.params.id);
  if (removed) {
    res.status(200).json({
      id: removed.id,
      first: removed.first,
      last: removed.last,
      isActive: removed.isActive
    });
  } else {
    res.status(400);
    throw new Error('User could not be removed');
  }  
});