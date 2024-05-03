"use client";
import React, { useEffect, useMemo, useState } from "react";
// Import everything
import { ethers } from "ethers";

// Import just a few select items
import { BrowserProvider, parseUnits } from "ethers";

// Import from a specific export
import { HDNodeWallet } from "ethers/wallet";

import { toast } from "sonner";
import { WalletStatus } from "@/types";
import Cookies from "js-cookie";

type BrowserProviderType = typeof ethers.BrowserProvider;

export function useConnectHook() {
  const [status, setStatus] = useState<boolean>(false);
  const [address, setAddress] = useState(() => {
    if (Cookies.get("ethereum_address") !== null) {
      return Cookies.get("ethereum_address") as string;
    } else {
      return "";
    }
  });

  const getSigner = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
  };

  async function connectWallet(): Promise<string | null> {
    // Check if the MetaMask extension is installed
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // Return the first account address
        setStatus(true);
        Cookies.set("ethereum_address", accounts[0], { expires: 1 });
        Cookies.set("wallet_status", "true", { expires: 1 });
        return accounts[0];
      } catch (error) {
        toast("User denied account access or an error occurred");
        console.log(error);
        setStatus(false);
        return null;
      }
    } else {
      setStatus(false);
      toast(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html",
        { dismissible: true }
      );
      await ethers.getDefaultProvider();
      return null;
    }
  }

  async function handleConnect() {
    const account = await connectWallet();
    if (account) {
      toast("Wallet connected");
      setAddress(account);
      setStatus(true);
      console.log("Connected with account:", account);
      // Perform additional logic with the connected account
    }
  }

  async function handleDisconnect() {
    if (window.ethereum) {
      // Reset the `window.ethereum` object
      toast("Wallet disconnected");
      console.log("Wallet disconnected");
    } else {
      toast("No Ethereum wallet connected.");
      console.log("No Ethereum wallet connected.");
    }
    setAddress("");
    setStatus(false);
    Cookies.remove("ethereum_address");
    Cookies.remove("wallet_status");
  }

  return { handleConnect, handleDisconnect, address, status, getSigner };
}
