import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  Chain,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Main from "./components/Main";
import Header from "./components/Header";

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
    <div className="bg-[#2A1853] font-sans">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={lightTheme({
              accentColor: "#7F56D9",
              accentColorForeground: "white",
              borderRadius: "small",
              fontStack: "system",
              overlayBlur: "small",
            })}
          >
            <div className="container m-auto p-[0px] box-border">
              <Header />

              <Main />
            </div>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default App;
