import { Request, Response } from "express";
import { LoginBody, RegisterBody } from "../interfaces/express.interface";
import { loginUser, registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const data = req.body as RegisterBody;
    const newUser = await registerUser(data);

    res.status(201).json({
      message: "Usuario creado",
      user: newUser,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido al registrar usuario";
    if (errorMessage.includes("El email ya está registrado")) {
      return res.status(400).json({ message: errorMessage });
    }
    console.error("Error en register controller:", errorMessage);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const data = req.body as LoginBody;
    const result = await loginUser(data);

    // 200 OK
    res.status(200).json({
      message: "Login exitoso",
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido al iniciar sesion";
    if (errorMessage.includes("Credenciales invalidas")) {
      return res
        .status(401)
        .json({ message: "Email o contraseña incorrectos" });
    }
    console.error("Error en login controller:", errorMessage);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
