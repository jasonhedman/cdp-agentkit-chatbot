import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';

import { ModelProvider, type Model } from './models';

export const getModel = (model: Model) => {
  switch (model.provider) {
    case ModelProvider.OPENAI:
      return openai(model.apiIdentifier);
    case ModelProvider.ANTHROPIC:
      return anthropic(model.apiIdentifier);
    default:
      throw new Error(`Unsupported model provider: ${model.provider}`);
  }
};

export const imageGenerationModel = openai.image('dall-e-3');
