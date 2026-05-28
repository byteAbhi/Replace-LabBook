import { JwtPayload } from "./auth";

declare global{
  namespace Express {
    interface Request {
      users?: JwtPayload;
    } 
  }

}