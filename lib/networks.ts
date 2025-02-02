import { base, baseSepolia, mainnet, sepolia, type Chain } from "viem/chains";

export const SUPPORTED_NETWORKS: Chain[] = [
    base,
    baseSepolia,
    mainnet,
    sepolia
]

export const DEFAULT_NETWORK = base;