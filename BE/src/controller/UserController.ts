import { Request, Response } from "express";
import User from "../model/UserModel";
import bcrypt from "bcrypt";
//signup
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    res.status(403).send({ error });
  }
};

//login
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, role } = req.body;
    const checkUser = await User.findOne({ username });
    //validate data with joi
    const passwordMatch = await bcrypt.compare(
      password,
      checkUser?.password || ""
    );
    if (passwordMatch && checkUser?.role === role) {
      // need to remove hashpassword
      res.json({ checkUser });
    } else {
      throw new Error(`User ${username} is not found`);
    }
  } catch (error) {
    res.status(403).send({ error });
  }
};
// Implement other CRUD operations like read, update, and delete as needed
