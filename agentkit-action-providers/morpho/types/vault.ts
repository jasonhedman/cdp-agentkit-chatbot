export interface Asset {
  id: string;
  address: string;
  decimals: number;
  symbol: string;
}

export interface Chain {
  id: string;
  network: string;
}

export interface VaultState {
  id: string;
  apy: number;
  netApy: number;
  totalAssets: string;
  totalAssetsUsd: string;
  fee: number;
  timelock: number;
}

export interface Vault {
  address: string;
  symbol: string;
  name: string;
  creationBlockNumber: number;
  creationTimestamp: number;
  creatorAddress: string;
  whitelisted: boolean;
  asset: Asset;
  chain: Chain;
  state: VaultState;
}

export interface VaultsResponse {
  vaults: {
    items: Vault[];
  };
} 