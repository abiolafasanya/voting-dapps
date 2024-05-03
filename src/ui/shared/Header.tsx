"use client";
import { Button } from "@/components/ui/button";
import { useConnectHook } from "@/hooks/connectHook";
import { limitTextLength } from "@/utils/helpers";
import React from "react";
import Link from "next/link";

const menus = [
  { id: 2, name: "Voter", url: "/voter" },
  { id: 3, name: "Results", url: "/results" },
  { id: 4, name: "Dashboard", url: "/dashboard" },
];

export default function Header() {
  const { address, handleConnect, handleDisconnect, status } = useConnectHook();
  return (
    <header className="w-full py-5 flex-col md:flex-row flex justify-between items-center">
      <Link href={"/"} className="text-2xl font-semibold">
        VotingDapps
      </Link>
      <menu className="space-x-5 capitalize">
        {menus.map((menu, i) => (
          <Link key={i} href={menu.url} className="text-pretty font-semibold">
            {menu.name}
          </Link>
        ))}
      </menu>
      <WalletButton
        address={address}
        connect={handleConnect}
        disconnect={handleDisconnect}
        status={status}
      />
    </header>
  );
}

type Props = {
  status: boolean;
  address: string;
  connect: () => void;
  disconnect: () => void;
};

function WalletButton({ address, connect, disconnect, status }: Props) {
  return (
    <>
      {!address ? (
        <Button onClick={connect}>Connect Wallet</Button>
      ) : (
        <Button onClick={disconnect}>{limitTextLength(address, 12)}</Button>
      )}
    </>
  );
}
