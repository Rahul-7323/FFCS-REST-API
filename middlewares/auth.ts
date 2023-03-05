import dotenv from "dotenv";
dotenv.config();

import jwt, {JwtPayload} from "jsonwebtoken";

const auth =
  (role = "") =>
  async (req: any, res: any, next: any) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        const error = new Error("Authentication failed");
        res.status(400);
        return next(error);
      }

      interface JwtPayload {
        id: string;
        role: string;
      }

      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;

      if (role && role !== decodedToken.role) {
        const error = new Error("Authentication failed");
        res.status(400);
        return next(error);
      }

      req.user = decodedToken;
      next();
    } catch (err) {
      const error = new Error("Authentication failed");
      res.status(400);
      return next(error);
    }
  };

export default auth;
