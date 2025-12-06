import { SITE_URL } from '$lib/utils';
import type { RequestHandler } from './$types';

const baseUrl = SITE_URL;

export const GET: RequestHandler = async () => {
  const pages = [
    '/',
    '/latest-job',
    '/admit-card',
    '/result',
    '/answer-key',
    '/syllabus',
    '/contact'
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>${page === '/' ? '1.0' : '0.9'}</priority>
  </url>
`
  )
  .join('')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
