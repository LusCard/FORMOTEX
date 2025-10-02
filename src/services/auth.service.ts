import { User } from "../models/user.model";

import bcrypt from "bcryptjs";
import JSW from "jsonwebtoken";
import { LoginBody, RegisterBody } from "../interfaces/express.interface";

const JWT_SECRET = process.env.JWT_SECRET || "THOR";

const generateToken = (user: User) => {
  return JSW.sign({ user_id: user.user_id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const registerUser = async (data: RegisterBody) => {
  const existingUser = await User.findOne({ where: { email: data.email } });
  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const newUser = await User.create({
    ...data,
    password: hashedPassword,
    role: data.role || "user",
    is_active: true,
  });
  return {
    user_id: newUser.user_id,
    email: newUser.email,
    role: newUser.role,
  };
};

export const loginUser = async (data: LoginBody) => {
  const user = await User.findOne({ where: { email: data.email } });
  if (!user) {
    throw new Error("Credenciales invalidas");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales invalidas");
  }

  const token = generateToken(user);

  return {
    user: {
      user_id: user.user_id,
      role: user.role,
    },
    token,
  };
};
