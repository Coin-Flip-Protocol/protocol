import { useState } from "react";

import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { abi } from "../abi/CoinFlip";
import { getConstants } from "../constants/contract";

export function Bet() {
  const [isHeads, setIsHeads] = useState<boolean>(false);
  const [amount, setAmount] = useState<bigint>(1n);

  const { data: hash, isPending, writeContract } = useWriteContract();

  // Submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    writeContract({
      address: getConstants.contractAddress,
      abi,
      functionName: "placeBet",
      args: [isHeads],
      value: amount,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={onSubmit}>
      <label>
        <input
          type="radio"
          name="isHeads"
          checked={isHeads}
          placeholder=""
          required
          onChange={() => setIsHeads(true)}
        />
        Heads
      </label>
      <label>
        <input
          type="radio"
          name="isHeads"
          checked={!isHeads}
          placeholder=""
          required
          onChange={() => setIsHeads(false)}
        />
        Tails
      </label>

      <input
        type="number"
        name="amount"
        value={amount.toString()}
        onChange={(e) => setAmount(BigInt(e.target.value))}
      />

      <button disabled={isPending} type="submit">
        {isPending ? "Confirming..." : "Mint"}
      </button>

      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
    </form>
  );
}
