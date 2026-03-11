import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface StudioInfo {
    contact: string;
    about: string;
    tagline: string;
    name: string;
    location: string;
    services: Array<string>;
}
export interface Booking {
    id: bigint;
    service: string;
    name: string;
    email: string;
    message: string;
}
export interface MediaItem {
    id: bigint;
    title: string;
    blob: ExternalBlob;
    description: string;
    mediaType: MediaType;
}
export interface UserProfile {
    name: string;
}
export enum MediaType {
    video = "video",
    photo = "photo"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMediaItem(title: string, description: string, mediaType: MediaType, blob: ExternalBlob): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteMediaItem(mediaId: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getStudioInfo(): Promise<StudioInfo | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listBookings(): Promise<Array<Booking>>;
    listMediaItems(): Promise<Array<MediaItem>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBooking(name: string, email: string, service: string, message: string): Promise<void>;
    updateStudioInfo(info: StudioInfo): Promise<void>;
}
