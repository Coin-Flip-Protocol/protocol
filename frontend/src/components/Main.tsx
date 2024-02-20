import BackgroundImage from "../assets/bg.png";

import Connect from "./Connect";
import { Bet } from "./Bet";
import { useAccount } from "wagmi";

export default function Main() {
  const { isConnected } = useAccount();

  return (
    <section
      className={`bg-no-repeat bg-cover bg-center rounded-lg p-14 h-screen flex align-middle justify-center items-center`}
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="bg-white shadow-md rounded-lg px-[50px] py-[50px] text-center">
        {isConnected ? <Bet /> : <Connect />}
      </div>
    </section>
  );
}
