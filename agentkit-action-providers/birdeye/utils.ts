import { Network } from "./types";

export const networksByChainId: Record<string, Network> = {
    "8453": Network.BASE,
    "1": Network.ETHEREUM,
    "137": Network.POLYGON,
    "56": Network.BSC,
    "42161": Network.ARBITRUM,
    "10": Network.OPTIMISM,
    "43114": Network.AVALANCHE,
}

export const chainIdToNetwork = (chainId: string): Network | undefined => {
    return networksByChainId[chainId];
}