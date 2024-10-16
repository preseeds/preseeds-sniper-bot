import axios from "axios";
import dotenv from "dotenv";
import dbHandler from "./cache";
import { publicClient, watchEvents } from "./config";
import { formatEther } from "viem";
dotenv.config();

const BOT_TOKEN: string = process.env.BOT_TOKEN || "";
const CHAT_ID: string = process.env.CHAT_ID || "";
const API_URL: string = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

const sendTelegramMessage = async (message: string) => {
  try {
    await axios.post(API_URL, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  } catch (error: any) {
    console.error("Error sending message:", error.message);
  }
};

const onCreateToken = async (logs: any) => {
  const log = logs[0];
  const message = `
<b>New Token Created</b>

<i>Token Address:</i> <b>${log.args.token}</b>
<i>Name:</i> <b>${log.args.name}</b>
<i>Symbol:</i> <b>${log.args.symbol}</b>
<i>Target Liquidity:</i> <b>${formatEther(log.args.targetLiquidity)} VIC</b>

To buy this token, send VIC to token address or using <a href="https://coin98.com/request?address=${log.args.token}&amount=&chain=Viction&token=">Coin98 Magic Link</a>

View on Preseeds: <a href="https://preseeds.meme/token/${log.args.token}">Link</a>
  `;
  await sendTelegramMessage(message);
};

const main = async () => {
  console.log("Sniper bot");
  const unwatch = publicClient.watchEvent({
    address: "0x755d81B3eB576637FB5869B8461605994B4Eb0AE",
    events: watchEvents,
    onLogs: onCreateToken,
  });
};

main();
