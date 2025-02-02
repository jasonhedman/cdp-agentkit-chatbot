import { base, baseSepolia, mainnet, sepolia, type Chain, goerli } from "viem/chains";

export const SUPPORTED_NETWORKS: Chain[] = [
    baseSepolia,
    base,
    mainnet,
    sepolia,
    goerli
]

export const DEFAULT_NETWORK = baseSepolia;