import { Router, Request, Response } from "express";
import { BaseController } from "./base";

export class BrandsController extends BaseController {

  protected router: Router = Router();

  private data =
    [
      {
        "_id": "1a2b3c4d-5678-9e0f-1234-56789abcdef0",
        "name": "Nike",
        "description": "Global leader in athletic footwear, apparel, and accessories."
      },
      {
        "_id": "2b3c4d5e-6789-0f12-3456-789abcdef012",
        "name": "Adidas",
        "description": "Innovative sportswear brand with high-performance footwear and apparel."
      },
      {
        "_id": "3c4d5e6f-7890-12a3-4567-89abcdef0123",
        "name": "Puma",
        "description": "Sport and lifestyle brand known for stylish and durable footwear."
      },
      {
        "_id": "4d5e6f7a-8901-23b4-5678-9abcdef01234",
        "name": "Gucci",
        "description": "Luxury fashion house known for high-end clothing, accessories, and footwear."
      },
      {
        "_id": "5e6f7a8b-9012-34c5-6789-abcdef012345",
        "name": "Louis Vuitton",
        "description": "Renowned brand offering premium leather goods, fashion, and accessories."
      },
      {
        "_id": "6f7a8b9c-0123-45d6-7890-bcdef0123456",
        "name": "Rolex",
        "description": "Luxury watchmaker crafting high-quality, precision timepieces."
      },
      {
        "_id": "7a8b9c0d-1234-56e7-8901-cdef01234567",
        "name": "Apple",
        "description": "Technology giant producing premium smartphones, tablets, and accessories."
      },
      {
        "_id": "8b9c0d1e-2345-67f8-9012-def012345678",
        "name": "Samsung",
        "description": "Leading electronics brand known for innovation in smartphones and appliances."
      },
      {
        "_id": "9c0d1e2f-3456-78a9-0123-ef0123456789",
        "name": "Sony",
        "description": "Global brand in entertainment, gaming, and consumer electronics."
      },
      {
        "_id": "0d1e2f3a-4567-89b0-1234-f01234567890",
        "name": "Dell",
        "description": "Industry leader in laptops, desktops, and enterprise solutions."
      },
      {
        "_id": "1e2f3a4b-5678-90c1-2345-0123456789ab",
        "name": "HP",
        "description": "Trusted brand for high-performance laptops, printers, and accessories."
      },
      {
        "_id": "2f3a4b5c-6789-01d2-3456-123456789abc",
        "name": "Coca-Cola",
        "description": "Iconic beverage company with a wide range of soft drinks and refreshments."
      },
      {
        "_id": "3a4b5c6d-7890-12e3-4567-23456789abcd",
        "name": "Pepsi",
        "description": "Global brand known for soft drinks and snack food products."
      },
      {
        "_id": "4b5c6d7e-8901-23f4-5678-3456789abcde",
        "name": "Tesla",
        "description": "Innovative electric vehicle and clean energy company."
      },
      {
        "_id": "5c6d7e8f-9012-34a5-6789-456789abcdef",
        "name": "BMW",
        "description": "Luxury automobile manufacturer known for high-performance cars."
      },
      {
        "_id": "6d7e8f9a-0123-45b6-7890-56789abcdef0",
        "name": "Mercedes-Benz",
        "description": "Premium automotive brand with a legacy of innovation and luxury."
      },
      {
        "_id": "7e8f9a0b-1234-56c7-8901-6789abcdef01",
        "name": "Zara",
        "description": "Fast-fashion brand offering trendy and affordable clothing."
      },
      {
        "_id": "8f9a0b1c-2345-67d8-9012-789abcdef012",
        "name": "H&M",
        "description": "Global retailer with stylish, affordable clothing for all."
      },
      {
        "_id": "9a0b1c2d-3456-78e9-0123-89abcdef0123",
        "name": "Levi’s",
        "description": "Iconic denim brand offering high-quality jeans and apparel."
      },
      {
        "_id": "0b1c2d3e-4567-89f0-1234-9abcdef01234",
        "name": "Reebok",
        "description": "Sports and lifestyle brand known for athletic shoes and apparel."
      }
    ]
  constructor() {
    super()
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get("/brands", this.fetchList);
    this.router.get("/brands/search", this.search);
    this.router.get("/brands/:id", this.fetch);
  }

  fetchList = async (req: Request, res: Response) => {
    try {
      const take = parseInt(req.query.take as string) || 10;
      const skip = parseInt(req.query.skip as string) || 0;

      const records = this.data.slice(skip, skip + take);
      res.json(records ?? []);
    } catch (error) {
      console.error(`Error: `, error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  fetch = async (req: Request, res: Response) => {
    try {
      const id = req?.params.id;
      const records = this.data.find(d => d._id === id);
      res.json(records ?? {});
    } catch (error) {
      console.error(`Error: `, error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  search = async (req: Request, res: Response) => {
    try {
      const take = parseInt(req.query.take as string) || 10;
      const skip = parseInt(req.query.skip as string) || 0;
      const q = req.query.q as string || "";

      const filteredRecords = this.data.filter(d => d.name.toLowerCase().includes(q.toLowerCase()));
      const records = filteredRecords.slice(skip, skip + take);

      res.json(records ?? []);
    } catch (error) {
      console.error(`Error: `, error);
      res.status(500).json({ error: "Internal server error" });
    }
  }


  public getRouter(): Router {
    return this.router;
  }

}

//http://localhost:9999/brands/search?take=10&skip=0&q=nik
