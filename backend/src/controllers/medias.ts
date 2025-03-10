import express, { Request, Response, Router } from "express";
import multer from "multer";
import { config } from "../config";

import { ValidationMiddleware, MediaUploaderFactory, MediaUploaderStrategy } from "../service/fileUpload";
import path from "path";
import os from "os";
import fs from "fs";
import { BaseController } from "./base";


export class MediaController extends BaseController {

  private mediaUploader: MediaUploaderStrategy;
  protected router: Router = express.Router();
  private multerMiddleware = multer();
  private validationMiddleware = new ValidationMiddleware()

  constructor() {
    super()
    this.mediaUploader = MediaUploaderFactory.createUploader(config);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.post(
      "/media/upload",
      this.multerMiddleware.single("file"), // Assuming the input field name in the form is 'media'
      this.validationMiddleware.validateFile("file"),
      this.uploadMedia,
    );
    this.router.get("/media/:filename", this.fetchMedia);
  }



  private uploadMedia = async (req: Request, res: Response) => {
    try {
      const file: Express.Multer.File = req.file as Express.Multer.File;
      if (!file) {
        res.status(400).json({ error: "No file uploaded" });
      }
      const uploadedData = await this.mediaUploader.uploadMedia(file);

      const _filePath = uploadedData.filePath;
      delete uploadedData.filePath;
      res.json(uploadedData);
    } catch (error) {
      console.error(`Error uploading media: `, error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  private fetchMedia = async (req: Request, res: Response) => {
    const filename = req.params.filename;

    // Determine the folder based on the query parameters
    let mediaFolder = "";

    const filePath = path.join(
      os.homedir(),
      config.local_media_path,
      mediaFolder, // Use the determined media folder
      filename,
    );

    // Check if the file exists and send it
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ error: "File not found" });
    }
  };


  public getRouter(): Router {
    return this.router;
  }
}

