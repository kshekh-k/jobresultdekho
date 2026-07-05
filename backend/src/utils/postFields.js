'use strict';

const { blocksToText } = require('./richText');

const TYPE_LABELS = {
  'api::job.job': 'Job Update',
  'api::result.result': 'Result Update',
  'api::admit-card.admit-card': 'Admit Card Update',
  'api::answer-key.answer-key': 'Answer Key Update',
  'api::admission.admission': 'Admission Update',
  'api::syllabus.syllabus': 'Syllabus Update',
  'api::blog.blog': 'Blog Update',
};

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Builds the ordered field list shared by both the Telegram and WhatsApp
// message formatters — each platform renders these with its own escaping.
function buildPostFields(uid, entry, departmentName) {
  const description = blocksToText(entry.short_description || entry.description).trim();

  return {
    typeLabel: TYPE_LABELS[uid] || 'Post Update',
    title: entry.title,
    totalPost: entry.total_posts || null,
    lastDate: formatDate(entry.last_date),
    department: departmentName || null,
    description: description || null,
  };
}

module.exports = { buildPostFields };
