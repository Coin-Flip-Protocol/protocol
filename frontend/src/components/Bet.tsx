import { useState } from "react";

import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { abi } from "../abi/CoinFlip";
import { getConstants } from "../constants/contract";
import InputRadio from "./InputRadio";
import AnimationSpinner from "./AnimationSpinner";
import { parseUnits } from "viem";

export function Bet() {
  const [isHeads, setIsHeads] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("1");

  const { data: hash, isPending, writeContract, error } = useWriteContract();

  // Submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    writeContract({
      address: getConstants.contractAddress,
      abi,
      functionName: "placeBet",
      args: [isHeads],
      value: parseUnits(amount.toString(), 18),
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-[#212121] font-bold md:text-[36px] text-[36px]">
        Make your bet, toss your coin
      </h2>

      {error?.message}

      <div className="bg-gray-200 p-5 rounded-lg mt-5 text-left">
        <div className="mb-2 text-sm font-medium">Select</div>
        <div className="flex items-center mb-4">
          <InputRadio checked={isHeads} onChange={() => setIsHeads(true)}>
            Heads
          </InputRadio>
        </div>
        <div className="flex items-center mb-4">
          <InputRadio checked={!isHeads} onChange={() => setIsHeads(false)}>
            Tails
          </InputRadio>
        </div>

        <div className="mb-2 text-sm font-medium">Betting amount</div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm">Ether</span>
          </div>

          <input
            type="number"
            name="amount"
            className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-20 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            value={amount.toString()}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          className="mt-5 w-full inline-flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150"
          disabled={isPending}
          type="submit"
        >
          {isPending && <AnimationSpinner />}
          {isConfirming
            ? "Waiting for confirmation..."
            : isPending
            ? "Confirming..."
            : "Place my bet"}
        </button>

        {/* {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
         */}

        {isConfirmed && (
          <div className="text-md mt-4">Your bet placed successfully.</div>
        )}
      </div>
    </form>
  );
}
