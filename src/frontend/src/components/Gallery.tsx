import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MediaType } from "../backend";
import { useListMediaItems } from "../hooks/useQueries";

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];

export default function Gallery() {
  const { data: items, isLoading } = useListMediaItems();
  const [lightbox, setLightbox] = useState<{
    url: string;
    title: string;
    type: MediaType;
  } | null>(null);

  const mediaItems = items ?? [];

  return (
    <section
      id="gallery"
      data-ocid="gallery.section"
      className="section-pad bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-gold-dim text-xs uppercase tracking-[0.3em] mb-3 font-body">
            Behind the Glass
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Studio <span className="gold-gradient">Gallery</span>
          </h2>
        </motion.div>

        {isLoading && (
          <div
            data-ocid="gallery.loading_state"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="aspect-square rounded-sm bg-card" />
            ))}
          </div>
        )}

        {!isLoading && mediaItems.length === 0 && (
          <div
            data-ocid="gallery.empty_state"
            className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-sm"
          >
            <ImageIcon className="w-12 h-12 text-gold/30 mb-4" />
            <p className="font-display text-xl text-muted-foreground">
              No media uploaded yet
            </p>
            <p className="text-sm text-muted-foreground/60 mt-2 font-body">
              Studio moments will appear here
            </p>
          </div>
        )}

        {!isLoading && mediaItems.length > 0 && (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {mediaItems.map((item, idx) => {
              const url = item.blob.getDirectURL();
              const ocid = `gallery.item.${idx + 1}`;
              return (
                <motion.div
                  key={String(item.id)}
                  data-ocid={ocid}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 4) * 0.08, duration: 0.5 }}
                  className="relative group cursor-pointer break-inside-avoid mb-4 rounded-sm overflow-hidden border border-border"
                  onClick={() =>
                    setLightbox({
                      url,
                      title: item.title,
                      type: item.mediaType,
                    })
                  }
                >
                  {item.mediaType === MediaType.photo ? (
                    <img
                      src={url}
                      alt={item.title}
                      className="w-full object-cover block group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="relative aspect-video bg-card flex items-center justify-center">
                      <video
                        src={url}
                        className="w-full h-full object-cover"
                        muted
                      >
                        <track kind="captions" />
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-12 h-12 rounded-full bg-gold/80 flex items-center justify-center">
                          <Play className="w-5 h-5 text-background ml-0.5" />
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <p className="font-display text-sm font-semibold text-gold mb-1">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground font-body line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
                onClick={() => setLightbox(null)}
                data-ocid="gallery.close_button"
              >
                <X className="w-6 h-6" />
              </button>
              {lightbox.type === MediaType.photo ? (
                <img
                  src={lightbox.url}
                  alt={lightbox.title}
                  className="w-full max-h-[85vh] object-contain rounded-sm"
                />
              ) : (
                <video
                  src={lightbox.url}
                  controls
                  autoPlay
                  className="w-full max-h-[85vh] rounded-sm"
                >
                  <track kind="captions" />
                </video>
              )}
              <p className="text-center text-gold font-display mt-3 text-sm">
                {lightbox.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
