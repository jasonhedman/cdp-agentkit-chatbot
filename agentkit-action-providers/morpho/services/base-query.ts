import { DocumentNode } from '@apollo/client';
import { morphoClient } from './apollo-client';
import { VaultsResponse, VaultDataResponse } from '../types';

export const executeVaultQuery = async <T extends Record<string, any>>(
  query: DocumentNode,
  variables: T
) => {
  try {
    const { data } = await morphoClient.query<VaultsResponse>({
      query,
      variables,
    });

    return data.vaults.items;
  } catch (error) {
    console.error('Error fetching vaults:', error);
    throw error;
  }
};

export const executeVaultDataQuery = async <T extends Record<string, any>>(
  query: DocumentNode,
  variables: T
) => {
  try {
    const { data } = await morphoClient.query<VaultDataResponse>({
      query,
      variables,
    });

    return data;
  } catch (error) {
    console.error('Error fetching vault data:', error);
    throw error;
  }
}; 