import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  CloudUpload,
  Film,
  ImageIcon,
  Loader2,
  LogIn,
  LogOut,
  Music2,
  ShieldAlert,
  Trash2,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { MediaType } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddMediaItem,
  useDeleteMediaItem,
  useIsCallerAdmin,
  useListMediaItems,
} from "../hooks/useQueries";

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];

export default function Admin() {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const isLoggedIn = !!identity;

  const { data: isAdmin, isLoading: checkingAdmin } = useIsCallerAdmin();
  const { data: mediaItems, isLoading: loadingMedia } = useListMediaItems();
  const addMedia = useAddMediaItem();
  const deleteMedia = useDeleteMediaItem();

  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile],
  );

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      toast.error("Please provide a title and select a file.");
      return;
    }
    const mediaType = file.type.startsWith("video/")
      ? MediaType.video
      : MediaType.photo;
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer) as Uint8Array<ArrayBuffer>;
    setUploadProgress(0);
    try {
      await addMedia.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        mediaType,
        bytes,
        onProgress: (pct) => setUploadProgress(Math.round(pct)),
      });
      toast.success("Media uploaded successfully!");
      setFile(null);
      setTitle("");
      setDescription("");
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      toast.error("Upload failed. Please try again.");
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMedia.mutateAsync(id);
      toast.success("Media removed.");
    } catch {
      toast.error("Could not delete media.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border px-6 md:px-12 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Music2 className="w-5 h-5 text-gold" />
          <span className="font-display text-base font-bold">
            <span className="gold-gradient">Magic Prithvi</span>
            <span className="text-foreground/60 text-xs ml-1 font-body">
              Studio
            </span>
          </span>
        </a>
        {isLoggedIn && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clear}
            className="text-muted-foreground hover:text-foreground font-body text-xs"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" /> Sign Out
          </Button>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        {/* Not logged in */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <div className="w-16 h-16 rounded-sm bg-gold/10 flex items-center justify-center mb-6">
              <LogIn className="w-7 h-7 text-gold" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-3">
              Admin <span className="gold-gradient">Access</span>
            </h1>
            <p className="text-muted-foreground text-sm font-body mb-8 max-w-sm">
              Sign in to manage the studio gallery, upload photos and videos.
            </p>
            {isInitializing ? (
              <Button disabled className="bg-gold text-background">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Initializing…
              </Button>
            ) : (
              <Button
                data-ocid="admin.login_button"
                onClick={login}
                disabled={isLoggingIn}
                className="bg-gold text-background hover:opacity-90 font-body font-semibold px-8"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing
                    in…
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" /> Sign In
                  </>
                )}
              </Button>
            )}
          </motion.div>
        )}

        {/* Logged in: check admin */}
        {isLoggedIn && checkingAdmin && (
          <div
            data-ocid="admin.loading_state"
            className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
          >
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
            <p className="text-muted-foreground text-sm font-body">
              Verifying access…
            </p>
          </div>
        )}

        {/* Not admin */}
        {isLoggedIn && !checkingAdmin && !isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            data-ocid="admin.error_state"
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <ShieldAlert className="w-12 h-12 text-destructive mb-4" />
            <h2 className="font-display text-2xl font-bold mb-2">
              Access Denied
            </h2>
            <p className="text-muted-foreground text-sm font-body">
              You do not have admin privileges.
            </p>
          </motion.div>
        )}

        {/* Admin dashboard */}
        {isLoggedIn && !checkingAdmin && isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div>
              <h1 className="font-display text-3xl font-bold mb-1">
                Studio <span className="gold-gradient">Gallery Manager</span>
              </h1>
              <p className="text-muted-foreground text-sm font-body">
                Upload and manage photos and videos.
              </p>
            </div>

            {/* Upload section */}
            <section className="p-6 bg-card border border-border rounded-sm space-y-5">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Upload Media
              </h2>

              {/* Dropzone - label wrapping hidden input for a11y */}
              <label
                data-ocid="admin.dropzone"
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-sm p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  dragOver
                    ? "border-gold bg-gold/5"
                    : file
                      ? "border-gold/60 bg-gold/5"
                      : "border-border hover:border-gold/40"
                }`}
              >
                <CloudUpload
                  className={`w-10 h-10 mb-3 ${file ? "text-gold" : "text-muted-foreground"}`}
                />
                {file ? (
                  <div className="text-center">
                    <p className="font-body text-sm text-foreground font-medium">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {file.type.startsWith("video/") ? (
                      <span className="inline-flex items-center gap-1 mt-2 text-xs text-gold font-body">
                        <Film className="w-3 h-3" /> Video detected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 mt-2 text-xs text-gold font-body">
                        <ImageIcon className="w-3 h-3" /> Photo detected
                      </span>
                    )}
                  </div>
                ) : (
                  <>
                    <p className="font-body text-sm text-muted-foreground text-center">
                      Drag & drop a photo or video here,
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      or click to browse
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  data-ocid="admin.upload_button"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFile(e.target.files[0]);
                  }}
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="media-title"
                    className="text-xs uppercase tracking-wider text-muted-foreground font-body"
                  >
                    Title *
                  </Label>
                  <Input
                    id="media-title"
                    data-ocid="admin.input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Recording Session — July 2025"
                    className="bg-background border-border focus:border-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="media-desc"
                    className="text-xs uppercase tracking-wider text-muted-foreground font-body"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="media-desc"
                    data-ocid="admin.textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description (optional)"
                    rows={2}
                    className="bg-background border-border focus:border-gold resize-none"
                  />
                </div>
              </div>

              {addMedia.isPending && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground font-body">
                    <span>Uploading…</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-1.5" />
                </div>
              )}

              {addMedia.isSuccess && (
                <div
                  data-ocid="admin.success_state"
                  className="text-xs text-green-400 font-body"
                >
                  ✓ Upload complete!
                </div>
              )}

              {addMedia.isError && (
                <div
                  data-ocid="admin.error_state"
                  className="text-xs text-destructive font-body"
                >
                  Upload failed. Please try again.
                </div>
              )}

              <Button
                data-ocid="admin.submit_button"
                onClick={handleUpload}
                disabled={addMedia.isPending || !file || !title.trim()}
                className="bg-gold text-background hover:opacity-90 font-body font-semibold"
              >
                {addMedia.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading…
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" /> Upload Media
                  </>
                )}
              </Button>
            </section>

            {/* Media list */}
            <section>
              <h2 className="font-display text-xl font-semibold mb-6">
                All Media
              </h2>

              {loadingMedia && (
                <div
                  data-ocid="admin.loading_state"
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                >
                  {SKELETON_KEYS.map((k) => (
                    <Skeleton
                      key={k}
                      className="aspect-square rounded-sm bg-card"
                    />
                  ))}
                </div>
              )}

              {!loadingMedia && (!mediaItems || mediaItems.length === 0) && (
                <div className="py-16 text-center border border-dashed border-border rounded-sm">
                  <p className="text-muted-foreground text-sm font-body">
                    No media uploaded yet.
                  </p>
                </div>
              )}

              {!loadingMedia && mediaItems && mediaItems.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mediaItems.map((item, idx) => {
                    const url = item.blob.getDirectURL();
                    return (
                      <div
                        key={String(item.id)}
                        className="group relative rounded-sm overflow-hidden border border-border bg-card"
                      >
                        {item.mediaType === MediaType.photo ? (
                          <img
                            src={url}
                            alt={item.title}
                            className="w-full aspect-square object-cover"
                          />
                        ) : (
                          <div className="aspect-square bg-muted flex items-center justify-center">
                            <Film className="w-8 h-8 text-gold" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                          <p className="text-xs text-foreground font-body text-center line-clamp-2">
                            {item.title}
                          </p>
                          <Button
                            size="sm"
                            variant="destructive"
                            data-ocid={`admin.delete_button.${idx + 1}`}
                            onClick={() => handleDelete(item.id)}
                            disabled={deleteMedia.isPending}
                            className="text-xs h-7 px-3"
                          >
                            {deleteMedia.isPending ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <>
                                <Trash2 className="w-3 h-3 mr-1" /> Delete
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </motion.div>
        )}
      </main>
    </div>
  );
}
