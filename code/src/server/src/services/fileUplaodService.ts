import multer from "multer";
import path from "path";
import fs from "fs/promises";

// Define the upload directory in the root folder
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

// Ensure the upload directory exists
fs.mkdir(UPLOADS_DIR, { recursive: true }).catch(console.error);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype === "message/rfc822" ||
      file.originalname.toLowerCase().endsWith(".eml")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only .eml files are allowed."));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});
