import { getChatSessionByTopic, insertChatMessage, isChatDbWebhookError } from "@/lib/chat-db";
import { handleTelegramWebhook } from "@/lib/telegram-webhook-handler";

export function POST(request: Request) {
  return handleTelegramWebhook(request, {
    getChatSessionByTopic,
    insertChatMessage,
    isChatDbWebhookError,
    secret: process.env.TELEGRAM_WEBHOOK_SECRET,
    groupChatId: process.env.TELEGRAM_GROUP_CHAT_ID,
  });
}
