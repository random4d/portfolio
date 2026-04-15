import { Work } from '@/types/microcms';

/**
 * Extract YouTube video ID from HTML content
 * Supports: youtube.com/watch?v=, youtu.be/, youtube.com/embed/
 */
export const extractYouTubeId = (html: string | undefined | null): string | null => {
    if (!html) return null;
    const match = html.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
};

/**
 * Get YouTube thumbnail URL from video ID
 * Uses hqdefault (480x360) which is always available
 */
export const getYouTubeThumbnail = (videoId: string): string => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

/**
 * Resolve thumbnail URL for a work.
 * Priority: uploaded thumbnail → YouTube thumbnail from content → null
 */
export const resolveThumbnailUrl = (work: Work): string | null => {
    if (work.thumbnail?.url) {
        return `${work.thumbnail.url}?w=600&fm=webp&q=80`;
    }
    const youtubeId = extractYouTubeId(work.content);
    if (youtubeId) {
        return getYouTubeThumbnail(youtubeId);
    }
    return null;
};
