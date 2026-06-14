import { Router, Request, Response } from "express";
import { sql } from "../db.js";

const router = Router();
const ADMIN_SECRET = process.env.ADMIN_SECRET || "admin123"; // Change this!

// GET all gallery photos
router.get("/", async (_req: Request, res: Response) => {
  try {
    const rows = await sql`
      SELECT id, name, relation, photo_url, caption, created_at
      FROM gallery_photos
      ORDER BY created_at DESC
    `;
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

// POST a new gallery photo (after Cloudinary upload)
router.post("/", async (req: Request, res: Response) => {
  const { name, relation, photo_url, cloudinary_public_id, caption } = req.body;
  if (!name?.trim() || !photo_url?.trim()) {
    res.status(400).json({ error: "Name and photo_url are required" });
    return;
  }
  try {
    const [row] = await sql`
      INSERT INTO gallery_photos (name, relation, photo_url, cloudinary_public_id, caption)
      VALUES (
        ${name.trim()},
        ${(relation || "Guest").trim()},
        ${photo_url.trim()},
        ${cloudinary_public_id || null},
        ${caption?.trim() || null}
      )
      RETURNING id, name, relation, photo_url, caption, created_at
    `;
    res.status(201).json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save photo" });
  }
});

// DELETE a photo (protected by admin secret token)
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = req.headers["x-admin-token"];

  if (token !== ADMIN_SECRET) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  try {
    await sql`DELETE FROM gallery_photos WHERE id = ${Number(id)}`;
    res.json({ success: true, message: "Photo deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete photo" });
  }
});

export default router;