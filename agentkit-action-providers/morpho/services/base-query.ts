import type { DocumentNode } from '@apollo/client';
import { morphoClient } from './apollo-client';
import type { VaultsResponse, VaultDataResponse } from '../types';

export const executeUserQuery = async <T extends Record<string, any>, R>(
  query: DocumentNode,
  variables: T
): Promise<R> => {
  try {
    const { data } = await morphoClient.query<R>({
      query,
      variables,
    });

    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

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