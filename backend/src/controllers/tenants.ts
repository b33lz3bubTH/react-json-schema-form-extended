import { Router, Request, Response } from "express";
import { BaseController } from "./base";

export class TenantsController extends BaseController {

  protected router: Router = Router();

  private tenants = [
    {
      "_id": "f3a1c5e7-8d6b-4e9f-bb89-1a2d3e4f5678",
      "name": "Urban Shoe Hub",
      "description": "Premium and budget-friendly footwear collections, featuring the latest trends and comfort-focused designs."
    },
    {
      "_id": "d8b2c7a9-3f4e-4825-91c6-7e1a0f9b8d24",
      "name": "Elite Liquor Store",
      "description": "A curated selection of fine wines, craft beers, and premium spirits for every occasion."
    },
    {
      "_id": "a1d5e6f9-7c8b-41a2-b4d3-5f6e7a8b9c10",
      "name": "Casual Kicks",
      "description": "Your go-to store for everyday sneakers and comfortable casual footwear at great prices."
    },
    {
      "_id": "b3f7e9d1-2a6c-4d5e-9f8b-1a2c3d4e5f67",
      "name": "Luxury Timepieces",
      "description": "Exclusive first-copy watches inspired by renowned brands, offering luxury aesthetics at a fraction of the price."
    },
    {
      "_id": "c4d2a9e1-8b3f-5d6e-7f9a-0b1c2d3e4f58",
      "name": "The Streetwear Vault",
      "description": "Handpicked streetwear essentials, featuring the latest urban fashion trends."
    }
  ]
  constructor() {
    super()
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get("/tenants", this.fetchTenants);
    this.router.get("/tenants/search", this.searchTenants);
    this.router.get("/tenants/:id", this.fetchTenant);
  }

  fetchTenants = async (req: Request, res: Response) => {
    try {
      const take = parseInt(req.query.take as string) || 10;
      const skip = parseInt(req.query.skip as string) || 0;

      const tenants = this.tenants.slice(skip, skip + take);
      res.json(tenants ?? []);
    } catch (error) {
      console.error(`Error: `, error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  fetchTenant = async (req: Request, res: Response) => {
    try {
      const id = req?.params.id;
      const tenant = this.tenants.find(tenant => tenant._id === id);
      res.json(tenant ?? {});
    } catch (error) {
      console.error(`Error: `, error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  searchTenants = async (req: Request, res: Response) => {
    try {
      const take = parseInt(req.query.take as string) || 10;
      const skip = parseInt(req.query.skip as string) || 0;
      const q = req.query.q as string;

      const filteredTenants = this.tenants.filter(tenant => tenant.name.toLowerCase().includes(q.toLowerCase()));
      const tenants = filteredTenants.slice(skip, skip + take);

      res.json(tenants ?? []);
    } catch (error) {
      console.error(`Error: `, error);
      res.status(500).json({ error: "Internal server error" });
    }
  }


  public getRouter(): Router {
    return this.router;
  }

}
