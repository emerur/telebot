import { VercelRequest, VercelResponse } from "@vercel/node";
import {  NextResponse } from "next/server"
import { Telegraf } from "telegraf";

// Environment variables
const BOT_TOKEN = process.env.BOT_TOKEN; // Replace with your bot token
const SECRET_HASH = "32e58fbahey833349df3383dc910e180"; // Replace with your own secret hash

// Initialize the bot
const bot = new Telegraf(BOT_TOKEN);

// /start handler
export async function handleStartCommand(ctx) {
  const COMMAND = "/start";
  const channelUrl = "t.me/metrovpnss";
  const targetUrl = "t.me/+T5FSkROuwmpmMTk0";

  // Welcome message with Markdown formatting
  const reply = `
🚀 UNLOCK FREE MONEY-MAKING METHODS + UNLIMITED PROXIES! 🤑🤑

💸 Tired of scams? Get REAL cash with these 100% FREE methods!
🌟 Discover the ULTIMATE money-making methods that will change your life FOREVER! 
🌟 No experience required - we provide step-by-step blueprints to guide you to financial freedom! 💰💰

🔥 What’s Inside?
🏦 Bank Logs & CC Methods 
🏦 Free Cashout Walkthroughs
🏦 2025 Cashapp Methods 🔥
✅ Premium Proxies & Tools (Zero Cost, No Signup!)

🛡 Protect your identity with our top-grade anonymity solutions: 
✅ Over 30 MILLION Residential Socks5 IPs 
✅ 1 MILLION+ Mobile 4G/LTE Proxies 
✅ ZERO Fraud Score - 100% Untraceable 

🎯 Don't waste another second grinding - start earning the SMART way! 
🎯 Unrivaled resources and support - COMPLETELY FREE! No catch!

👇 Seize this life-changing opportunity NOW! 👇 🔗 [UNLOCK YOUR WEALTH TODAY!](${targetUrl})
`;

  try {
    await ctx.reply(reply, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔗 Join Channel", url: channelUrl }],
          [
            {
              text: "🌐 Get Free Proxies",
              url: channelUrl,
            },
          ],
          [{ text: "🎓 Make $500 - $7,000 Free", url: targetUrl }],
        ],
      },
    });
    console.log(`Reply to ${COMMAND} command sent successfully.`);
  } catch (error) {
    console.error(`Something went wrong with the ${COMMAND} command:`, error);
  }
}
export async function sendImageCommand(ctx) {
  // Send image first
  await ctx.replyWithVideo(
    {
      url: "https://v0-free-proxy-landing-page.vercel.app/ways.MP4",
    }, // or use { source: 'path/to/image.jpg' }
    { caption: "🔥Cashout On A Daily🔥" }
  );
}

// Register the /start command handler
bot.command("start", async (ctx) => {
  // Send image first
  await sendImageCommand(ctx);
  await handleStartCommand(ctx);
});

// API route handler
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { body, query } = req;

    // Set webhook if requested
    if (query.setWebhook === "true") {
     const webhookUrl = `${process.env.WEBHOOK_URL}`
    await bot.telegram.setWebhook(webhookUrl)

    return res.status(200).send("OK");
    }

    // Handle incoming updates from Telegram  
      await bot.handleUpdate(body);
  
    return res.status(200).send("OK");
    })
  } catch (error) {
    return res.json({ error: "Internal server error" }, { status: 500 })
  }

  // Acknowledge the request with Telegram
  // res.status(200).send("OK");
};
