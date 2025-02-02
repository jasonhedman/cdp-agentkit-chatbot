import { gql } from '@apollo/client';
import { executeUserQuery } from './base-query';
import type { UserVaultPositions } from '../types/vault';
import { VAULT_FIELDS_FRAGMENT } from './vault-fragments';

const USER_VAULT_POSITIONS_QUERY = gql`
  ${VAULT_FIELDS_FRAGMENT}
  query UserVaultPositions($chainId: Int!, $address: String!) {
    userByAddress(chainId: $chainId, address: $address) {
      address
      vaultPositions {
        vault {
          ...VaultFields
        }
        assets
      }
    }
  }
`;

export const getVaultPositions = async (
  chainId: number,
  address: string
): Promise<UserVaultPositions> => {
  return executeUserQuery<
    { chainId: number; address: string },
    UserVaultPositions
  >(USER_VAULT_POSITIONS_QUERY, {
    chainId,
    address,
  });
}; 