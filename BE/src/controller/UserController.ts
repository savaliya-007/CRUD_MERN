import { Request, Response } from "express";
import User from "../model/UserModel";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, role, email, password } = req.body;
    
    //validate data with joi
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      role,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(403).send({ error});
  }
};

// Implement other CRUD operations like read, update, and delete as needed
