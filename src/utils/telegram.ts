export const TELEGRAM_API_BASE = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function createTelegramTopic(name: string) {
  const response = await fetch(`${TELEGRAM_API_BASE}/createForumTopic`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_GROUP_CHAT_ID,
      name: name,
    }),
  });
  const data = await response.json();
  if (!data.ok) {
    throw new Error(`Failed to create topic: ${data.description}`);
  }
  return data.result.message_thread_id;
}

export async function sendTelegramMessage(threadId: number, text: string) {
  const response = await fetch(`${TELEGRAM_API_BASE}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_GROUP_CHAT_ID,
      message_thread_id: threadId,
      text: text,
    }),
  });
  const data = await response.json();
  if (!data.ok) {
    throw new Error(`Failed to send message: ${data.description}`);
  }
  return data.result;
}
