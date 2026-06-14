import { motion, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "../hooks/useInView";
import { Upload, X, Camera, Loader2, CheckCircle2 } from "lucide-react";
import {
  fetchGallery,
  postGalleryPhoto,
  uploadToCloudinary,
  type GalleryPhoto,
} from "../../utils/api";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FamilyGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const [form, setForm] = useState({ name: "", relation: "", caption: "" });
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchGallery();
      setPhotos(data);
    } catch {
      // show offline fallback silently
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File must be under 10 MB");
      return;
    }
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setShowForm(true);
    setUploadError("");
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !form.name.trim()) {
      setUploadError("Please add your name");
      return;
    }
    setUploading(true);
    setUploadError("");
    try {
      const { secure_url, public_id } = await uploadToCloudinary(selectedFile);
      const saved = await postGalleryPhoto({
        name: form.name.trim(),
        relation: form.relation.trim() || "Guest",
        photo_url: secure_url,
        cloudinary_public_id: public_id,
        caption: form.caption.trim() || undefined,
      });
      setPhotos((prev) => [saved, ...prev]);
      setUploadSuccess(true);
      setPreview(null);
      setSelectedFile(null);
      setForm({ name: "", relation: "", caption: "" });
      setShowForm(false);
      setTimeout(() => setUploadSuccess(false), 4000);
    } catch {
      setUploadError("Upload failed. Check your Cloudinary config and try again.");
    } finally {
      setUploading(false);
    }
  };

  const cancelUpload = () => {
    setPreview(null);
    setSelectedFile(null);
    setShowForm(false);
    setUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a0e] via-[#0e0b18] to-[#0d0a0e]" />

      {/* Subtle purple glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7c3f8e]/8 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c9a84c]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a84c]/40" />
          <span style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", letterSpacing: "0.3em", fontSize: "0.7rem" }}>
            FAMILY & FRIENDS GALLERY
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a84c]/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-14"
          style={{ fontFamily: "'Lora', serif", color: "#a08060", fontStyle: "italic", fontSize: "0.95rem" }}
        >
          Share a moment — add your photo to Chibuike's celebration wall
        </motion.p>

        {/* Upload zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <label
                  htmlFor="photo-upload"
                  className="group relative flex flex-col items-center justify-center gap-4 p-12 border border-dashed border-[rgba(201,168,76,0.25)] cursor-pointer transition-all duration-300 hover:border-[rgba(201,168,76,0.6)] hover:bg-[rgba(201,168,76,0.03)]"
                >
                  <div className="w-14 h-14 rounded-full border border-[#c9a84c]/30 flex items-center justify-center group-hover:border-[#c9a84c]/60 transition-colors duration-300">
                    <Camera size={22} color="#c9a84c" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <p style={{ fontFamily: "'Playfair Display', serif", color: "#f5ede0", fontSize: "1rem", fontWeight: 600 }}>
                      Add Your Photo
                    </p>
                    <p style={{ fontFamily: "'Lora', serif", color: "#a08060", fontSize: "0.8rem", fontStyle: "italic", marginTop: "0.25rem" }}>
                      JPG, PNG or WebP · Max 10 MB
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-6 py-2 border border-[#c9a84c]/40 group-hover:border-[#c9a84c] transition-colors duration-300">
                    <Upload size={14} color="#c9a84c" />
                    <span style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.6rem", letterSpacing: "0.25em" }}>
                      CHOOSE PHOTO
                    </span>
                  </div>
                  <input
                    id="photo-upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>

                {uploadSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-3 px-5 py-3 border border-[#c9a84c]/30 bg-[rgba(201,168,76,0.05)]"
                  >
                    <CheckCircle2 size={16} color="#c9a84c" />
                    <p style={{ fontFamily: "'Lora', serif", color: "#c9a84c", fontSize: "0.85rem", fontStyle: "italic" }}>
                      Your photo has been added. Thank you for celebrating with Chibuike!
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border border-[rgba(201,168,76,0.2)] p-8"
                style={{ background: "rgba(26,17,24,0.9)" }}
              >
                <div className="flex gap-6">
                  {/* Preview */}
                  {preview && (
                    <div className="relative flex-shrink-0 w-28 h-28">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={cancelUpload}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-[#0d0a0e] border border-[#c9a84c]/40 flex items-center justify-center hover:border-[#c9a84c] transition-colors"
                      >
                        <X size={12} color="#c9a84c" />
                      </button>
                    </div>
                  )}

                  {/* Fields */}
                  <form onSubmit={handleUpload} className="flex-1 flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your name *"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="bg-transparent border border-[rgba(201,168,76,0.2)] px-4 py-2.5 outline-none focus:border-[#c9a84c]/60 transition-colors placeholder:text-[#a08060]/40"
                        style={{ fontFamily: "'Lora', serif", color: "#f5ede0", fontSize: "0.88rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Relation (e.g. Uncle)"
                        value={form.relation}
                        onChange={(e) => setForm({ ...form, relation: e.target.value })}
                        className="bg-transparent border border-[rgba(201,168,76,0.2)] px-4 py-2.5 outline-none focus:border-[#c9a84c]/60 transition-colors placeholder:text-[#a08060]/40"
                        style={{ fontFamily: "'Lora', serif", color: "#f5ede0", fontSize: "0.88rem" }}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Caption (optional)"
                      value={form.caption}
                      onChange={(e) => setForm({ ...form, caption: e.target.value })}
                      className="bg-transparent border border-[rgba(201,168,76,0.2)] px-4 py-2.5 outline-none focus:border-[#c9a84c]/60 transition-colors placeholder:text-[#a08060]/40"
                      style={{ fontFamily: "'Lora', serif", color: "#f5ede0", fontSize: "0.88rem" }}
                    />
                    {uploadError && (
                      <p style={{ fontFamily: "'Lora', serif", color: "#d4183d", fontSize: "0.8rem", fontStyle: "italic" }}>
                        {uploadError}
                      </p>
                    )}
                    <div className="flex gap-3 mt-1">
                      <button
                        type="submit"
                        disabled={uploading}
                        className="flex items-center gap-2 px-6 py-2.5 border border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.6rem", letterSpacing: "0.25em" }}
                      >
                        {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                        {uploading ? "UPLOADING..." : "UPLOAD PHOTO"}
                      </button>
                      <button
                        type="button"
                        onClick={cancelUpload}
                        className="px-5 py-2.5 border border-[rgba(201,168,76,0.15)] hover:border-[rgba(201,168,76,0.35)] transition-colors"
                        style={{ fontFamily: "'Cinzel', serif", color: "#a08060", fontSize: "0.6rem", letterSpacing: "0.2em" }}
                      >
                        CANCEL
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Photo grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={28} color="#c9a84c" className="animate-spin" style={{ opacity: 0.5 }} />
          </div>
        ) : photos.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-center"
            style={{ fontFamily: "'Lora', serif", color: "#a08060", fontStyle: "italic", fontSize: "0.9rem" }}
          >
            Be the first to add your photo to Chibuike's gallery!
          </motion.p>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="break-inside-avoid group relative cursor-pointer"
                onClick={() => setLightboxPhoto(photo)}
              >
                <div className="relative overflow-hidden border border-[rgba(201,168,76,0.1)] group-hover:border-[rgba(201,168,76,0.4)] transition-all duration-300">
                  <ImageWithFallback
                    src={photo.photo_url}
                    alt={`${photo.name} — ${photo.relation}`}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a0e]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p style={{ fontFamily: "'Playfair Display', serif", color: "#f5ede0", fontSize: "0.85rem", fontWeight: 600 }}>
                      {photo.name}
                    </p>
                    <p style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.55rem", letterSpacing: "0.2em" }}>
                      {photo.relation}
                    </p>
                    {photo.caption && (
                      <p style={{ fontFamily: "'Lora', serif", color: "#c8bfb0", fontSize: "0.75rem", fontStyle: "italic", marginTop: "0.2rem" }}>
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(13,10,14,0.95)", backdropFilter: "blur(16px)" }}
            onClick={() => setLightboxPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute -top-10 right-0 flex items-center gap-2 transition-opacity hover:opacity-70"
                style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.6rem", letterSpacing: "0.2em" }}
              >
                <X size={14} /> CLOSE
              </button>
              <div className="border border-[rgba(201,168,76,0.3)] overflow-hidden">
                <ImageWithFallback
                  src={lightboxPhoto.photo_url}
                  alt={lightboxPhoto.name}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>
              <div className="mt-4 flex items-start gap-3">
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", color: "#f5ede0", fontWeight: 600, fontSize: "1rem" }}>
                    {lightboxPhoto.name}
                  </p>
                  <p style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.6rem", letterSpacing: "0.2em", opacity: 0.7 }}>
                    {lightboxPhoto.relation}
                  </p>
                  {lightboxPhoto.caption && (
                    <p style={{ fontFamily: "'Lora', serif", color: "#a08060", fontStyle: "italic", fontSize: "0.9rem", marginTop: "0.4rem" }}>
                      "{lightboxPhoto.caption}"
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
