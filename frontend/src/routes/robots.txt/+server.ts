import { SITE_URL } from '$lib/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
  const body = `
User-agent: *
Allow: /

Disallow: /search
Disallow: /search/

Sitemap: ${SITE_URL}/sitemap.xml
`.trim();

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
};
