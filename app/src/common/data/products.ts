import { Media } from "./constants/media";

export interface IProduct {
  _id: string;
  createdBy: string;
  updatedBy: string;
  deletedAt: any;
  deletedBy: any;
  name: string;
  postDescription: string;
  askingPrice: string;
  propertyType: string;
  medias: Media[];
  area: string;
  pincode: string;
  available: boolean;
  constructionStatus: string;
  facilities: string[];
  tags: any[];
  floorPlans: FloorPlan[];
  sitePlan: Media[];
  mapLink: string;
  carpetArea: string;
  brochure: Media[];
  seller: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FloorPlan {
  available: boolean;
  floorMedias: Media[];
  approxPrice: string;
  sqft: string;
  name: string;
  description?: string;
}
