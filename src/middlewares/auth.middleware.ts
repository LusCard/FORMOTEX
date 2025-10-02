import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../interfaces/express.interface";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Acceso negado. No se proporcionó token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      user_id: number;
      email: string;
      role: "admin" | "user";
    };

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

export const authorizeRole = (requiredRole: "admin" | "user") => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Error de autenticacion. Usuario no adjunto" });
    }

    const userRole = req.user.role;

    if (requiredRole === "admin" && userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "Acceso prohibido. Requiere rol de Admin" });
    }

    next();
  };
};
