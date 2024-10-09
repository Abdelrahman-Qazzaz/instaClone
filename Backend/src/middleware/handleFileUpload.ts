import env from "dotenv";
import admin from "firebase-admin";
import fs from "fs";
import mime from "mime";

import Middleware from "src/types/Middleware.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import multer from "multer";
export const upload = multer({ dest: "uploads/" });

env.config();
const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.SERVICEACCOUNT!, "utf8")
);

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGEBUCKET,
});

const bucket = admin.storage().bucket();

export const uploadFile: Middleware = async (req, res, next) => {
  if (!req.file) return next();

  try {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        console.error("Error handling file upload:", err);
        return res.status(500).send({ message: "Error uploading file" });
      }

      const uploadedFile: Express.Multer.File = req.file as Express.Multer.File;

      const [error, firebaseUrls] = await uploadFilesToFirebase([uploadedFile]);
      if (error) return httpResponses.InternalServerError(res);

      req.firebaseUrls = firebaseUrls;
      next();
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    return res.status(500).send({ message: "Error uploading image" });
  }
};

export const uploadFiles: Middleware = async (req, res, next) => {
  if (!req.files) return next();

  try {
    upload.array("files")(req, res, async (err) => {
      if (err) {
        console.error("Error handling file(s) upload:", err);
        return res.status(500).send({ message: "Error uploading files" });
      }

      const uploadedFiles: Express.Multer.File[] =
        req.files as Express.Multer.File[];

      const [error, firebaseUrls] = await uploadFilesToFirebase(uploadedFiles);
      if (error) return httpResponses.InternalServerError(res);

      req.firebaseUrls = firebaseUrls;
      next();
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    return res.status(500).send({ message: "Error uploading image" });
  }
};

type UploadFilesToFirebase = (
  files: Express.Multer.File[]
) => Promise<[Error, null] | [null, string[]]>;

const uploadFilesToFirebase: UploadFilesToFirebase = async (files) => {
  const urls: string[] = [];

  for (const file of files) {
    const { filename, path } = file;

    try {
      const contentType = mime.getType(path);
      if (!contentType) return [new Error("Invalid file type."), null];
      const [file] = await bucket.upload(path, {
        destination: filename,
        metadata: {
          contentType: contentType,
        },
      });

      const url = await file.getSignedUrl({
        action: "read",
        expires: "01-01-2025",
      });

      urls.push(url[0]);
    } catch (error) {
      console.error("Error uploading file:", error);
      return [new Error("Invalid file type."), null];
    }
  }
  return [null, urls];
};
