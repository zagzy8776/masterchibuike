import { Router, Request, Response } from "express";
import { sql } from "../db.js";

const router = Router();

// GET all blessings (newest first)
router.get("/", async (_req: Request, res: Response) => {
  try {
    const rows = await sql`
      SELECT id, name, relation, message, likes, created_at
      FROM blessings
      ORDER BY created_at DESC
    `;
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blessings" });
  }
});

// POST a new blessing
router.post("/", async (req: Request, res: Response) => {
  const { name, relation, message } = req.body;
  if (!name?.trim() || !message?.trim()) {
    res.status(400).json({ error: "Name and message are required" });
    return;
  }
  try {
    const [row] = await sql`
      INSERT INTO blessings (name, relation, message)
      VALUES (${name.trim()}, ${(relation || "Friend").trim()}, ${message.trim()})
      RETURNING id, name, relation, message, likes, created_at
    `;
    res.status(201).json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save blessing" });
  }
});

// PATCH like/unlike a blessing (fingerprint prevents duplicate likes)
router.patch("/:id/like", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fingerprint } = req.body;
  if (!fingerprint) {
    res.status(400).json({ error: "Fingerprint required" });
    return;
  }
  try {
    const existing = await sql`
      SELECT id FROM blessing_likes
      WHERE blessing_id = ${Number(id)} AND fingerprint = ${fingerprint}
    `;
    if (existing.length > 0) {
      // Unlike
      await sql`DELETE FROM blessing_likes WHERE blessing_id = ${Number(id)} AND fingerprint = ${fingerprint}`;
      await sql`UPDATE blessings SET likes = GREATEST(likes - 1, 0) WHERE id = ${Number(id)}`;
      const [row] = await sql`SELECT likes FROM blessings WHERE id = ${Number(id)}`;
      res.json({ liked: false, likes: row.likes });
    } else {
      // Like
      await sql`INSERT INTO blessing_likes (blessing_id, fingerprint) VALUES (${Number(id)}, ${fingerprint})`;
      await sql`UPDATE blessings SET likes = likes + 1 WHERE id = ${Number(id)}`;
      const [row] = await sql`SELECT likes FROM blessings WHERE id = ${Number(id)}`;
      res.json({ liked: true, likes: row.likes });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to toggle like" });
  }
});

export default router;
