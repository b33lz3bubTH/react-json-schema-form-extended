
import express, { Router } from "express";
abstract class BaseController {
  protected router: Router = express.Router();
  protected abstract initializeRoutes(): void;
  abstract getRouter(): Router;
}
export { BaseController };
