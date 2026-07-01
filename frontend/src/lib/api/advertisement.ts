import { API_URL } from './client';

export interface AdImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface Advertisement {
  id: number;
  title: string;
  slug: string;
  isActive: boolean;
  adType: 'native' | 'google_adsense';
  // Native
  adLink?: string;
  openInNewTab?: boolean;
  imageMode?: 'single' | 'responsive';
  singleImage?: AdImage;
  desktopImage?: AdImage;
  mobileImage?: AdImage;
  // AdSense
  googleAdSlot?: string;
  googleAdFormat?: 'auto' | 'rectangle' | 'banner' | 'vertical' | 'horizontal';
  googleAdClient?: string;
  // Analytics
  impressions?: number;
  clicks?: number;
}

export async function getAdBySlug(slug: string): Promise<Advertisement | null> {
  try {
    const res = await fetch(`${API_URL}/advertisements/slug/${slug}`);
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data ?? null) as Advertisement | null;
  } catch {
    return null;
  }
}

export function trackImpression(slug: string): void {
  fetch(`${API_URL}/advertisements/slug/${slug}/impression`, { method: 'POST' }).catch(() => {});
}

export function trackClick(slug: string): void {
  fetch(`${API_URL}/advertisements/slug/${slug}/click`, { method: 'POST' }).catch(() => {});
}
