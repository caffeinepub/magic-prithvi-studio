import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type Booking,
  ExternalBlob,
  type MediaItem,
  type MediaType,
} from "../backend";
import { useActor } from "./useActor";

export function useListMediaItems() {
  const { actor, isFetching } = useActor();
  return useQuery<MediaItem[]>({
    queryKey: ["mediaItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMediaItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListBookings() {
  const { actor, isFetching } = useActor();
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMediaItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
      mediaType,
      bytes,
      onProgress,
    }: {
      title: string;
      description: string;
      mediaType: MediaType;
      bytes: Uint8Array<ArrayBuffer>;
      onProgress?: (pct: number) => void;
    }) => {
      if (!actor) throw new Error("Not connected");
      let blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) blob = blob.withUploadProgress(onProgress);
      await actor.addMediaItem(title, description, mediaType, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mediaItems"] });
    },
  });
}

export function useDeleteMediaItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (mediaId: bigint) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteMediaItem(mediaId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mediaItems"] });
    },
  });
}
