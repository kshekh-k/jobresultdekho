'use strict';

const { buildPostFields, buildPostPath } = require('./postFields');

const SITE_URL = process.env.SITE_URL || process.env.TELEGRAM_SITE_URL || 'https://jobresultdekho.com';

function stripHtml(str = '') {
  return String(str).replace(/<[^>]*>/g, '');
}

function formatWhatsappPost(uid, entry, departmentName) {
  const fields = buildPostFields(uid, entry, departmentName);
  const path = buildPostPath(uid, entry.slug);
  const url = path ? `${SITE_URL}/${path}` : SITE_URL;

  let text = `*${fields.typeLabel}*\n\n`;
  text += `*Title:* ${fields.title}\n`;
  if (fields.totalPost) text += `*Total Post:* ${fields.totalPost}\n`;
  if (fields.lastDate) text += `*Last Date:* ${fields.lastDate}\n`;
  if (fields.department) text += `*Department:* ${fields.department}\n`;
  if (fields.description) text += `\n${stripHtml(fields.description)}\n`;
  text += `\n*Post URL:*\n${url}`;

  return text;
}

module.exports = { formatWhatsappPost };
