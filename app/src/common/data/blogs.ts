import { Media } from "./constants/media";

export interface IBlog {
  _id: string;
  createdBy: string;
  updatedBy: string;
  deletedAt: any;
  deletedBy: any;
  title: string;
  subTitle: string;
  postBody: string;
  medias: Media[];
  data: BlogBodyData;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BlogBodyData {
  postBodyDescription: string;
  tags: any[];
}
