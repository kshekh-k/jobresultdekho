'use strict';

const TELEGRAM_API = 'https://api.telegram.org';

function isConfigured() {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHANNEL_ID) {
    strapi.log.warn(
      'Telegram bot not configured — set TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL_ID to enable auto-posting'
    );
    return false;
  }
  return true;
}

async function sendTelegramMessage(text) {
  if (!isConfigured()) return;

  const res = await fetch(`${TELEGRAM_API}/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHANNEL_ID,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: false,
    }),
  });

  const data = await res.json();
  if (!data.ok) {
    strapi.log.error(`Telegram send failed: ${data.description}`);
  }
}

async function sendTelegramPhoto(photoUrl, caption) {
  if (!isConfigured()) return;

  const res = await fetch(`${TELEGRAM_API}/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHANNEL_ID,
      photo: photoUrl,
      caption,
      parse_mode: 'HTML',
    }),
  });

  const data = await res.json();
  if (!data.ok) {
    throw new Error(data.description || 'Telegram photo send failed');
  }
}

module.exports = { sendTelegramMessage, sendTelegramPhoto };
