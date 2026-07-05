'use strict';

function headers() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.WHAPI_TOKEN}`,
  };
}

function isConfigured() {
  const { WHAPI_API_URL, WHAPI_TOKEN, WHATSAPP_CHANNEL_JID } = process.env;
  if (!WHAPI_API_URL || !WHAPI_TOKEN || !WHATSAPP_CHANNEL_JID) {
    strapi.log.warn(
      'WhatsApp bot not configured — set WHAPI_API_URL, WHAPI_TOKEN and WHATSAPP_CHANNEL_JID to enable auto-posting'
    );
    return false;
  }
  return true;
}

async function parseResult(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error?.message || data?.message || `Whapi request failed (${res.status})`);
  }
  return data;
}

async function sendWhatsappMessage(text) {
  if (!isConfigured()) return;

  const res = await fetch(`${process.env.WHAPI_API_URL}/messages/text`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ to: process.env.WHATSAPP_CHANNEL_JID, body: text }),
  });

  return parseResult(res);
}

async function sendWhatsappImage(imageUrl, caption) {
  if (!isConfigured()) return;

  const res = await fetch(`${process.env.WHAPI_API_URL}/messages/image`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ to: process.env.WHATSAPP_CHANNEL_JID, media: imageUrl, caption }),
  });

  return parseResult(res);
}

module.exports = { sendWhatsappMessage, sendWhatsappImage };
