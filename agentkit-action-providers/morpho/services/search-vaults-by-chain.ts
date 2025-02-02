import { gql } from '@apollo/client';
import { executeVaultQuery } from './base-query';
import { VAULT_FIELDS_FRAGMENT } from './vault-fragments';

const SEARCH_VAULTS_QUERY = gql`
  ${VAULT_FIELDS_FRAGMENT}
  query SearchVaults($chainIds: [Int!]) {
    vaults(
      where: { chainId_in: $chainIds, whitelisted: true }
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

export const searchVaultsByChain = async (chainIds: number[]) => {
  return executeVaultQuery(SEARCH_VAULTS_QUERY, { chainIds });
};
