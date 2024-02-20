import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  Chain,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Logo from "./assets/logomark.png";
import BackgroundImage from "./assets/bg.png";
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
    <div className="bg-[#2A1853] font-sans">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <div className="container m-auto p-[0px] box-border">
              <header className="px-[10px] flex mx-14 py-[30px] justify-between items-center">
                <div className="flex justify-center gap-3">
                  <img src={Logo} alt="CoinFlip Logo" />

                  <span className="text-white font-bold text-[20px]">
                    CoinFlip
                  </span>
                </div>
                <div className="flex justify-between gap-6 ">
                  <Connect />

                  {/* 
                  <button className="bg-[#7F56D9] p-[10px] rounded-md text-white font-[700] text-[16px]">
                    Connect Wallet
                  </button> */}
                </div>
              </header>
              <section
                className={`bg-no-repeat bg-cover bg-center rounded-lg p-14`}
                style={{ backgroundImage: `url(${BackgroundImage})` }}
              >
                <div className="bg-white shadow-md rounded-lg">
                  <div className="px-[100px] py-[50px] text-center">
                    <h2 className="text-[#212121] font-bold md:text-[72px] text-[45px]">
                      Flip a coin & Win!
                    </h2>
                    <p className="font-normal text-[20px] w-[] text-[#424242] pt-[20px] max-w-[99%]">
                      To play, users predict "heads" or "tails" in a coin toss.
                      If their guess matches the outcome, they win. Gamble
                      responsibly, setting limits on spending and time.
                    </p>
                    <Connect />

                    {/* <button className="bg-[#2A1853] text-white rounded-md mt-[48px] p-[10px]">
                        Connect Your Wallet
                      </button> */}

                    <Bet />
                  </div>
                </div>
              </section>
            </div>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default App;
