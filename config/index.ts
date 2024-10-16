import { createPublicClient, defineChain, http, parseAbi } from "viem";

const mainnet = defineChain({
  id: 88,
  name: "Viction Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Viction",
    symbol: "VIC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.viction.xyz"],
      webSocket: ["wss://ws.viction.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://vicscan.xyz" },
  },
  testnet: true,
});

export const watchEvents = parseAbi([
  "event CreateToken(address indexed token, string name, string symbol, string image, uint256 unlockTime, uint256 targetLiquidity, address indexed creator)",
]);


export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})