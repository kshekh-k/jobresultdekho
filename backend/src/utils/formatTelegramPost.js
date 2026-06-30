'use strict';

const SITE_URL = process.env.TELEGRAM_SITE_URL || 'https://jobresultdekho.com';

const LABELS = {
  'api::job.job': 'Job',
  'api::result.result': 'Result',
  'api::admit-card.admit-card': 'Admit Card',
  'api::answer-key.answer-key': 'Answer Key',
  'api::admission.admission': 'Admission',
  'api::syllabus.syllabus': 'Syllabus',
  'api::blog.blog': 'Blog Post',
};

function escapeHtml(str = '') {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// First publish vs republish-after-edit, inferred from timestamp proximity
// (publish doesn't tell us this directly — entry only carries publishedAt/createdAt).
function isFirstPublish(entry) {
  if (!entry.publishedAt || !entry.createdAt) return true;
  const diffMs = Math.abs(new Date(entry.publishedAt) - new Date(entry.createdAt));
  return diffMs < 10_000;
}

function formatTelegramPost(uid, entry) {
  const label = LABELS[uid] || 'Post';
  const heading = isFirstPublish(entry) ? `New ${label} Posted` : `${label} Updated`;
  const emoji = isFirstPublish(entry) ? '🆕' : '🔄';
  const description = entry.short_description || entry.description;
  const url = entry.slug ? `${SITE_URL}/${entry.slug}` : SITE_URL;

  let text = `${emoji} <b>${heading}</b>\n\n<b>${escapeHtml(entry.title)}</b>`;
  if (description) text += `\n${escapeHtml(description)}`;
  text += `\n\n🔗 ${url}`;

  return text;
}

module.exports = { formatTelegramPost };
