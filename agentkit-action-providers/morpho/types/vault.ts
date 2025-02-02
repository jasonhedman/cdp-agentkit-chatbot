import { TimeseriesData } from "./historical-yield";

export interface Asset {
  id: string;
  address: string;
  decimals: number;
  symbol: string;
  logoURI: string;
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
  metadata: {
    image: string;
    description: string;
  };
}

export interface VaultsResponse {
  vaults: {
    items: Vault[];
  };
} 

export interface VaultData extends Vault {
  historicalState: {
    apy: TimeseriesData[];
    netApy: TimeseriesData[];
  };
}

export interface VaultDataResponse {
    vaultByAddress: VaultData
}

export interface VaultPosition {
  vault: Vault;
  assets: string;
}

export interface UserVaultPositions {
  userByAddress: {
    address: string;
    vaultPositions: VaultPosition[];
  };
}