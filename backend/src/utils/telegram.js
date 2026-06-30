'use strict';

const TELEGRAM_API = 'https://api.telegram.org';

async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHANNEL_ID;

  if (!token || !chatId) {
    strapi.log.warn(
      'Telegram bot not configured — set TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL_ID to enable auto-posting'
    );
    return;
  }

  const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
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

module.exports = { sendTelegramMessage };
