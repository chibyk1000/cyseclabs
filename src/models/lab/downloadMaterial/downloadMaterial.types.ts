import { Document, Model } from "mongoose";

export interface IDownloadMaterial {
  name: string;
  description: string;
  file: string;
  storageDetails: string;
  uploadedOn: Date;
}

export interface IDownloadMaterialDocument
  extends IDownloadMaterial,
    Document {}

export interface IDownloadMaterialModel
  extends Model<IDownloadMaterialDocument> {}
