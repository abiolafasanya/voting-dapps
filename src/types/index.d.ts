export type WalletStatus =
  | "isWallet"
  | "loading"
  | "error"
  | "connected"
  | "disconnected"
  | "notfound";

export interface EthereumCallExceptionError extends Error {
  code: string;
  action: string;
  data: string;
  reason: string;
  transaction: {
    to: string;
    data: string;
    from: string;
  };
  invocation: null;
  revert: {
    signature: string;
    name: string;
    args: string[];
  };
  shortMessage: string;
  info: {
    error: {
      code: number;
      data: {
        originalError: {
          code: number;
          data: string;
          message: string;
        };
      };
      message: string;
    };
    payload: {
      method: string;
      params: Array<{
        from: string;
        to: string;
        data: string;
      }>;
      id: number;
      jsonrpc: string;
    };
  };
  stack: string;
  message: string;
};
