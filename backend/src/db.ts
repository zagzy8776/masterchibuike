import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS blessings (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      relation TEXT DEFAULT 'Friend',
      message TEXT NOT NULL,
      likes INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS gallery_photos (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      relation TEXT DEFAULT 'Guest',
      photo_url TEXT NOT NULL,
      cloudinary_public_id TEXT,
      caption TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS blessing_likes (
      id SERIAL PRIMARY KEY,
      blessing_id INTEGER REFERENCES blessings(id) ON DELETE CASCADE,
      fingerprint TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(blessing_id, fingerprint)
    )
  `;

  console.log("✅ Database tables initialized");
}
