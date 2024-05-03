export const resultData = [
  {
    id: 1,
    name: "John Doe",
    address: "0xfb330",
    regular: 5,
    vip: 5,
    executive: 0,
    chairmanVoted: false,
    totalVote: 10,
  },
  {
    id: 2,
    name: "Jane Smith",
    address: "0xfb331",
    regular: 10,
    vip: 5,
    executive: 5,
    chairmanVoted: true,
    totalVote: 20,
  },
  {
    id: 3,
    name: "Alice Johnson",
    address: "0xfb332",
    regular: 5,
    vip: 5,
    executive: 0,
    chairmanVoted: false,
    totalVote: 10,
  },
  {
    id: 4,
    name: "Bob Brown",
    address: "0xfb333",
    regular: 5,
    vip: 5,
    executive: 0,
    chairmanVoted: false,
    totalVote: 10,
  },
];

export type ResultType = typeof resultData[0]