import { gql } from '@apollo/client';

export const VAULT_FIELDS_FRAGMENT = gql`
  fragment VaultFields on Vault {
    address
    symbol
    name
    creationBlockNumber
    creationTimestamp
    creatorAddress
    whitelisted
    asset {
      id
      address
      decimals
      symbol
      logoURI
    }
    chain {
      id
      network
    }
    state {
      id
      apy
      netApy
      totalAssets
      totalAssetsUsd
      fee
      timelock
    }
    metadata {
      image
      description
    }
  }
`;