import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_MODEL_NAME, models } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { SUPPORTED_NETWORKS, DEFAULT_NETWORK } from '@/lib/networks';

export default async function Page() {
  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('model-id')?.value;
  const networkFromCookie = cookieStore.get('network')?.value;

  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;


  const selectedNetwork = (SUPPORTED_NETWORKS.find(n => n.name === networkFromCookie)?.name || DEFAULT_NETWORK.name);

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        selectedModelId={selectedModelId}
        selectedVisibilityType="private"
        isReadonly={false}
        selectedNetwork={selectedNetwork}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
