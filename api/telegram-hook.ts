import { VercelRequest, VercelResponse } from "@vercel/node";
import { Telegraf } from "telegraf";

// Environment variables
const BOT_TOKEN = process.env.BOT_TOKEN; // Replace with your bot token
const SECRET_HASH = "32e58fbahey833349df3383dc910e180"; // Replace with your own secret hash

// Initialize the bot
const bot = new Telegraf(BOT_TOKEN);

// Handle the /start command
export async function handleStartCommand(ctx) {
  const COMMAND = "/start";
  const { message } = ctx;

  // Welcome message with Markdown formatting
  const reply = `
🚀 Welcome to *OG Signal Bot*! 

Get real-time crypto signals, investment tips, and market insights from *The OG Chasers*. 
Join our community and unlock the potential to earn up to $1000 daily! 💰

🔗 Follow us on Telegram: [Join The OG Chasers](https://t.me/YourChannelUsername)
  `;

  try {
    await ctx.reply(reply, {
      parse_mode: "Markdown",
      reply_to_message_id: message?.message_id,
    });
    console.log(`Reply to ${COMMAND} command sent successfully.`);
  } catch (error) {
    console.error(`Something went wrong with the ${COMMAND} command:`, error);
  }
}

// Register the /start command handler
bot.command("start", async (ctx) => {
  await handleStartCommand(ctx);
});

// API route handler
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { body, query } = req;

    // Set webhook if requested
    if (query.setWebhook === "true") {
      const webhookUrl = `${process.env.VERCEL_URL}/api/telegram-hook?secret_hash=${SECRET_HASH}`;
      const isSet = await bot.telegram.setWebhook(webhookUrl);
      console.log(`Set webhook to ${webhookUrl}: ${isSet}`);
    }

    // Handle incoming updates from Telegram
    if (query.secret_hash == SECRET_HASH) {
      await bot.handleUpdate(body);
    }
  } catch (error) {
    console.error("Error handling Telegram update:", error.toString());
  }

  // Acknowledge the request with Telegram
  res.status(200).send("OK");
};
