import Logo from "../assets/logomark.png";
import BtnConnect from "./BtnConnect";

export default function Header() {
  return (
    <header className="px-[10px] flex mx-14 py-[30px] justify-between items-center">
      <div className="flex justify-center gap-3">
        <img src={Logo} alt="CoinFlip Logo" />

        <span className="text-white font-bold text-[20px]">CoinFlip</span>
      </div>
      <BtnConnect />
    </header>
  );
}
