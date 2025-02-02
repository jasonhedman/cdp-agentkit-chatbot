import { gql } from '@apollo/client';
import { executeVaultQuery } from './base-query';
import { VAULT_FIELDS_FRAGMENT } from './vault-fragments';

const SEARCH_VAULTS_BY_CHAIN_AND_ASSET_QUERY = gql`
  ${VAULT_FIELDS_FRAGMENT}
  query SearchVaultsByChainAndAsset($chainIds: [Int!], $assetAddresses: [String!]) {
    vaults(
      where: { 
        chainId_in: $chainIds, 
        assetAddress_in: $assetAddresses,
        whitelisted: true 
      }
      first: 6
      orderBy: NetApy
      orderDirection: Desc
    ) {
      items {
        ...VaultFields
      }
    }
  }
`;

export const searchVaultsByChainAndAsset = async (chainIds: number[], assetAddresses: string[]) => {
  return executeVaultQuery(SEARCH_VAULTS_BY_CHAIN_AND_ASSET_QUERY, { chainIds, assetAddresses });
}; 