'use strict';

const { buildPostFields, buildPostPath } = require('./postFields');

const SITE_URL = process.env.TELEGRAM_SITE_URL || 'https://jobresultdekho.com';

function escapeHtml(str = '') {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatTelegramPost(uid, entry, departmentName) {
  const fields = buildPostFields(uid, entry, departmentName);
  const path = buildPostPath(uid, entry.slug);
  const url = path ? `${SITE_URL}/${path}` : SITE_URL;

  let text = `🔔 <b>${escapeHtml(fields.typeLabel)}</b>\n\n`;
  text += `<b>Title:</b> ${escapeHtml(fields.title)}\n`;
  if (fields.totalPost) text += `<b>Total Post:</b> ${escapeHtml(String(fields.totalPost))}\n`;
  if (fields.lastDate) text += `<b>Last Date:</b> ${escapeHtml(fields.lastDate)}\n`;
  if (fields.department) text += `<b>Department:</b> ${escapeHtml(fields.department)}\n`;
  if (fields.description) text += `\n${escapeHtml(fields.description)}\n`;
  text += `\n<b>Post URL:</b> ${url}`;

  return text;
}

module.exports = { formatTelegramPost };
