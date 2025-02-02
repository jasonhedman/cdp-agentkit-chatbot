import { gql } from '@apollo/client';
import { executeVaultDataQuery } from './base-query';
import { VAULT_FIELDS_FRAGMENT } from './vault-fragments';

import type { TimeseriesOptions, VaultDataResponse } from '../types';

const GET_VAULT_DATA_QUERY = gql`
  ${VAULT_FIELDS_FRAGMENT}
  query VaultApys($options: TimeseriesOptions, $vaultAddress: String!, $chainId: Int!) {
    vaultByAddress(address: $vaultAddress, chainId: $chainId) {
      ...VaultFields
      historicalState {
        apy(options: $options) {
          x
          y
        }
        netApy(options: $options) {
          x
          y
        }
      }
    }
  }
`;

export const getVaultData = async (
  vaultAddress: string,
  chainId: number,
  options: TimeseriesOptions
): Promise<VaultDataResponse> => {
  return executeVaultDataQuery(GET_VAULT_DATA_QUERY, {
    vaultAddress,
    chainId,
    options,
  });
}; 