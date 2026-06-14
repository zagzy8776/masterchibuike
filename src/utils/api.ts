// ── API base URL ───────────────────────────────────────────────────
// In production, set VITE_API_URL in Vercel environment variables
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ── Cloudinary configuration ───────────────────────────────────────
// Set these in Vercel environment variables for production:
//   VITE_CLOUDINARY_CLOUD_NAME  — from Cloudinary Dashboard > Account
//   VITE_CLOUDINARY_UPLOAD_PRESET — Cloudinary Settings > Upload > Upload presets (Unsigned)
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

export type Blessing = {
  id: number;
  name: string;
  relation: string;
  message: string;
  likes: number;
  created_at: string;
};

export type GalleryPhoto = {
  id: number;
  name: string;
  relation: string;
  photo_url: string;
  caption: string | null;
  created_at: string;
};

// ── Generic fetch wrapper ──────────────────────────────────────────
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

// ── Blessings ──────────────────────────────────────────────────────

export async function fetchBlessings(): Promise<Blessing[]> {
  return apiFetch<Blessing[]>(`${API_BASE}/api/blessings`);
}

export async function postBlessing(data: { name: string; relation: string; message: string }): Promise<Blessing> {
  return apiFetch<Blessing>(`${API_BASE}/api/blessings`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function toggleLike(id: number, fingerprint: string): Promise<{ liked: boolean; likes: number }> {
  return apiFetch<{ liked: boolean; likes: number }>(`${API_BASE}/api/blessings/${id}/like`, {
    method: "PATCH",
    body: JSON.stringify({ fingerprint }),
  });
}

// ── Gallery ─────────────────────────────────────────────────────────

export async function fetchGallery(): Promise<GalleryPhoto[]> {
  return apiFetch<GalleryPhoto[]>(`${API_BASE}/api/gallery`);
}

export async function postGalleryPhoto(data: {
  name: string;
  relation: string;
  photo_url: string;
  cloudinary_public_id?: string;
  caption?: string;
}): Promise<GalleryPhoto> {
  return apiFetch<GalleryPhoto>(`${API_BASE}/api/gallery`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Cloudinary upload ──────────────────────────────────────────────

export async function uploadToCloudinary(file: File): Promise<{ secure_url: string; public_id: string }> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary is not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your environment variables."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "master-chibuike");

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error?.message || "Cloudinary upload failed");
  }

  const data = await res.json();
  return { secure_url: data.secure_url, public_id: data.public_id };
}

// ── Browser fingerprint (for like deduplication) ───────────────────

export function getFingerprint(): string {
  const key = "chibuike_fp";
  let fp = localStorage.getItem(key);
  if (!fp) {
    fp = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(key, fp);
  }
  return fp;
}