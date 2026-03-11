# Magic Prithvi Studio

## Current State
Single-page website with Hero, Services, About, Location, Contact, and Footer sections. Dark gold theme.

## Requested Changes (Diff)

### Add
- Public **Gallery** section on the main site showing uploaded photos and videos
- **Admin panel** (login-protected) where the studio owner can upload, view, and delete photos/videos
- Blob storage for media files (images and videos)
- Authorization so only the admin can access the upload panel

### Modify
- Add Gallery nav link and section to the existing single-page site

### Remove
N/A

## Implementation Plan
- Add `blob-storage` component for storing uploaded media
- Add `authorization` component for admin login
- Backend: store media metadata (title, type, blob reference)
- Frontend:
  - Gallery section on public page: grid of photos, embedded videos
  - Admin route `/admin`: login wall, upload form (drag & drop), manage (delete) uploaded media
  - Media previews in gallery with lightbox for photos and video player for videos
