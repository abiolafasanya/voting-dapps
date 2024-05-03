import VotingAbi from '@/data/voting.json'

const config = {
  RPC_URL: process.env.RPC_URL,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  CONTRACT_ADDRESS: "0x8c52fB38512e51F38FDb136Fd5B1B80f2A932491",
  ABI: VotingAbi.abi
};

type VotingAbiType = typeof VotingAbi.abi

export {config}