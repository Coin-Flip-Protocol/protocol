import React from "react";
import logo from "./logo.svg";
import "./App.css";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  Chain,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Connect from "./components/Connect";
import { Bet } from "./components/Bet";

const queryClient = new QueryClient();

const CHAIN_CONFIG = {
  id: 168587773,
  name: "Blast Sepolia",
  // iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
  // iconBackground: "#fff",
  nativeCurrency: { name: "Eth", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://sepolia.blast.io"] },
  },
  // blockExplorers: {
  //   default: { name: "SnowTrace", url: "https://snowtrace.io" },
  // },
  // contracts: {
  //   multicall3: {
  //     address: "0xca11bde05977b3631167028862be2a173976ca11",
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [CHAIN_CONFIG],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Connect />

          <Bet />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
