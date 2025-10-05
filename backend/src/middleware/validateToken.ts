import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}
interface DecodedToken {
  email: string;
  userId: string;
  iat?: number;
  exp?: number;
}

export const validateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];

    const token = typeof authHeader === "string" && authHeader && authHeader.startsWith("Bearer") && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No Token found" });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        res.status(400);
        return;
      }
      const { email, userId } = decoded as DecodedToken;
      req.user = {
        userId,
        email
      }
      next();
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" });
    return;
  }
};