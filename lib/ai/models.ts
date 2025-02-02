// Define your models here.

export enum ModelProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
}

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
  logoUrl: string;
  provider: ModelProvider;
}

export const models: Array<Model> = [
  {
    id: 'gpt-4o',
    label: 'GPT 4o',
    apiIdentifier: 'gpt-4o',
    description: 'OpenAI\'s model for complex, multi-step tasks',
    logoUrl: '/images/openai.png',
    provider: ModelProvider.OPENAI,
  },
  {
    id: 'gpt-4o-mini',
    label: 'GPT 4o mini',
    apiIdentifier: 'gpt-4o-mini',
    description: 'OpenAI\'s small model for fast, lightweight tasks',
    logoUrl: '/images/openai.png',
    provider: ModelProvider.OPENAI,
  },
  {
    id: 'claude-3-5-sonnet-latest',
    label: 'Claude 3.5 Sonnet',
    apiIdentifier: 'claude-3-5-sonnet-latest',
    description: 'Anthropic\'s model for complex, multi-step tasks',
    logoUrl: '/images/anthropic.png',
    provider: ModelProvider.ANTHROPIC,
  },
  {
    id: 'claude-3-5-haiku-latest',
    label: 'Claude 3.5 Haiku',
    apiIdentifier: 'claude-3-5-haiku-latest',
    description: 'Anthropic\'s model for fast, lightweight tasks',
    logoUrl: '/images/anthropic.png',
    provider: ModelProvider.ANTHROPIC,
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'gpt-4o-mini';
