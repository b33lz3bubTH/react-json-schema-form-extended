
import { NextFunction, Request, RequestHandler, Response } from "express";
import AWS, { S3 } from "aws-sdk";
import { randomUUID } from "crypto";
import fs from "fs";
import os from "os";
import path from "path";
import { config } from "../config"


export class MediaUploaderFactory {
  static createUploader(config: {
    local_media_path: string;
    upload_strategy: string;
    aws_bucket: any;
  }): MediaUploaderStrategy {
    if (config.upload_strategy === "local") {
      return new LocalMediaUploader(config.local_media_path);
    } else {
      return new S3MediaUploader(config.aws_bucket);
    }
  }
}

interface S3MediaUploaderProps {
  bucket: string;
  basePath: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

export interface MediaUploaderStrategy {
  uploadMedia(file: Express.Multer.File): Promise<UploadResponse>;
}

interface UploadResponse {
  originalname: string;
  size: number;
  mimetype: string;
  url?: string; // Optional URL for remote storage
  filePath?: string;
  fileName: string;
}

export class LocalMediaUploader implements MediaUploaderStrategy {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = path.join(os.homedir(), basePath);
    this.ensureDirectoryExists(this.basePath);
  }

  private ensureDirectoryExists(directoryPath: string) {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
  }

  async uploadMedia(file: Express.Multer.File): Promise<UploadResponse> {
    const uniqueFileName = `${randomUUID()}_${file.originalname}`;
    const filePath = path.join(this.basePath, uniqueFileName);

    await fs.promises.writeFile(filePath, file.buffer);
    const url = `http://localhost:${config.PORT}/media/${uniqueFileName}`;

    return {
      fileName: uniqueFileName,
      filePath: filePath,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url,
    };
  }
}

export class S3MediaUploader implements MediaUploaderStrategy {
  private s3: S3;
  private bucket: string;
  private basePath: string;
  private acl: string;

  constructor(props: S3MediaUploaderProps) {
    this.s3 = new AWS.S3({
      accessKeyId: props.accessKeyId,
      secretAccessKey: props.secretAccessKey,
      region: props.region,
    });
    this.bucket = props.bucket;
    this.basePath = props.basePath;
    this.acl = "public-read";
  }

  async uploadMedia(file: Express.Multer.File): Promise<UploadResponse> {
    const uniqueFileName = `${randomUUID()}_${file.originalname}`;
    const params: S3.PutObjectRequest = {
      Bucket: this.bucket,
      Key: `${this.basePath}/${uniqueFileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      Metadata: {
        originalFileName: file.originalname,
      },
      ACL: this.acl,
    };

    try {
      const data = await this.s3.upload(params).promise();
      return {
        ...data,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        url: data.Location, // Providing the URL for remote storage
        fileName: uniqueFileName,
      };
    } catch (error) {
      throw error;
    }
  }
}



export interface UploadAdapter {
  checkSize(file: Express.Multer.File): boolean;
}

export class ImageUploadAdapter implements UploadAdapter {
  checkSize(file: Express.Multer.File): boolean {
    const maxSize = 5 * 1024 * 1024; // 5MB for images
    return file.size <= maxSize;
  }
}

export class VideoUploadAdapter implements UploadAdapter {
  private maxSize: number;
  constructor(dynamicFileSize?: number) {
    if (dynamicFileSize && typeof dynamicFileSize === "number") {
      this.maxSize = dynamicFileSize;
      return;
    }
    this.maxSize = 250 * 1024 * 1024; // 250MB for videos
  }
  checkSize(file: Express.Multer.File): boolean {
    return file.size <= this.maxSize;
  }
}

export class DocumentUploadAdapter implements UploadAdapter {
  checkSize(file: Express.Multer.File): boolean {
    const maxSize = 32 * 1024 * 1024; // 32MB for documents and other files
    return file.size <= maxSize;
  }
}

interface CustomRequest extends Request {
  [key: string]: any;
}

export class ValidationMiddleware {
  public uploadAdapters: { [key: string]: UploadAdapter } = {
    image: new ImageUploadAdapter(),
    video: new VideoUploadAdapter(),
    application: new DocumentUploadAdapter(),
    // Add more adapters as needed
  };


  validateOnDemand(
    field: string,
    customAdapter: Record<string, UploadAdapter>,
  ): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        let files: Express.Multer.File | Express.Multer.File[] = (req as any)?.[field];

        if (!files) {
          res.status(400).json({ error: "No files uploaded" });
          return; // Ensure it stops execution
        }

        if (!Array.isArray(files)) {
          files = [files]; // Ensure files is an array
        }

        for (const file of files) {
          const mimeType = file.mimetype.toLowerCase().split("/")[0];
          if (!mimeType || !customAdapter[mimeType]) {
            res.status(400).json({ error: "Invalid file type" });
            return;
          }
        }

        return next(); // Ensure Express moves to the next middleware
      } catch (error) {
        next(error);
      }
    };
  }


  validateFile(field: string) {
    return this.validateOnDemand(field, this.uploadAdapters);
  }
}

