import { Router } from "express";

const router = Router();

import { upload } from "../services/fileUplaodService";

router.post(
  "/upload",
  upload.single("emailFile"),
  async (req: any, res: any) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      console.log("File uploaded:", fileUrl);
      return res
        .status(200)
        .json({ message: "File uploaded successfully.", fileUrl });
    } catch (error) {
      console.error("❌ Upload Error:", error);
      return res.status(500).json({ error: "File upload failed." });
    }
  }
);

export default router;
