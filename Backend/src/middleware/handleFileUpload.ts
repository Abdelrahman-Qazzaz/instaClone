import env from "dotenv";
import admin from "firebase-admin";
import fs from "fs";
import mime from "mime";

import Middleware from "src/types/Middleware.ts";
import { httpResponses } from "src/utils/HTTPResponses.ts";
import multer from "multer";
export const upload = multer({ dest: "uploads/" });
import { fileTypeFromFile } from "file-type";
import { FirebaseFile } from "src/types/express.js";

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

      const [error, firebaseFiles] = await uploadFilesToFirebase([
        uploadedFile,
      ]);
      if (error) return httpResponses.InternalServerError(res);

      req.firebaseFiles = firebaseFiles;

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
    const uploadedFiles: Express.Multer.File[] =
      req.files as Express.Multer.File[];

    const [error, firebaseFiles] = await uploadFilesToFirebase(uploadedFiles);
    if (error) {
      console.log(error);
      return httpResponses.InternalServerError(res);
    }

    req.firebaseFiles = firebaseFiles;

    next();
    // });
  } catch (err) {
    console.error("Error uploading image:", err);
    return res.status(500).send({ message: "Error uploading image" });
  }
};

type UploadFilesToFirebase = (
  files: Express.Multer.File[]
) => Promise<[Error, null] | [null, FirebaseFile[]]>;

const uploadFilesToFirebase: UploadFilesToFirebase = async (files) => {
  const firebaseFiles: FirebaseFile[] = [];

  for (const file of files) {
    const { filename, path } = file;

    try {
      const result = await fileTypeFromFile(path);
      if (!result) return [new Error("Invalid file type."), null];

      const [file] = await bucket.upload(path, {
        destination: filename,
        metadata: {
          contentType: result.mime,
        },
      });

      const signedUrl = await file.getSignedUrl({
        action: "read",
        expires: "01-01-2025",
      });
      const url = signedUrl[0];

      const type: FirebaseFile["type"] | undefined = result.mime.startsWith(
        "image"
      )
        ? "image"
        : result.mime.startsWith("video")
        ? "video"
        : undefined;
      if (!type) return [new Error("Invalid file type."), null];

      const firebaseFile: FirebaseFile = { url, type };
      firebaseFiles.push(firebaseFile);
    } catch (error) {
      console.error("Error uploading file:", error);
      return [new Error("Invalid file type."), null];
    }
  }
  return [null, firebaseFiles];
};
