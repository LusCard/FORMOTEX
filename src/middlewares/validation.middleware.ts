import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("El email debe ser válido.")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("La contraseña es obligatoria."),
  handleValidationErrors,
];

export const validateRegister = [
  body("first_name").trim().notEmpty().withMessage("Nombre es obligatorio."),
  body("last_name").trim().notEmpty().withMessage("Apellido es obligatorio."),
  body("email")
    .isEmail()
    .withMessage("El email debe ser válido.")
    .custom((value) => {
      return true;
    })
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),
  body("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage('El rol debe ser "admin" o "user".'),
  handleValidationErrors,
];
