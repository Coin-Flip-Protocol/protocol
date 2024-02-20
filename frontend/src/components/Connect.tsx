import { ConnectButton } from "@rainbow-me/rainbowkit";
import BtnConnect from "./BtnConnect";

export default function Connect() {
  return (
    <div className="w-[1000px]">
      <h2 className="text-[#212121] font-bold md:text-[72px] text-[45px]">
        Flip a coin & Win!
      </h2>
      <p className="font-normal text-[20px] w-[600px] mx-auto text-[#424242] pt-[20px] max-w-[99%]">
        To play, users predict "heads" or "tails" in a coin toss. If their guess
        matches the outcome, they win. Gamble responsibly, setting limits on
        spending and time.
      </p>

      <div className="flex align-middle justify-center mt-8">
        <BtnConnect />
      </div>
    </div>
  );
}
