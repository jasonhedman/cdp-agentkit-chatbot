'use client';

import { startTransition, useOptimistic, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SUPPORTED_NETWORKS, DEFAULT_NETWORK } from '@/lib/networks';
import { cn } from '@/lib/utils';

import { CheckCircleFillIcon, ChevronDownIcon } from './icons';
import { saveNetwork } from '@/app/(chat)/actions';

export function NetworkSelector({
  selectedNetworkName = DEFAULT_NETWORK.name,
  className,
}: {
  selectedNetworkName?: string;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [optimisticNetworkName, setOptimisticNetworkName] = useOptimistic(selectedNetworkName);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
          className,
        )}
      >
        <Button variant="outline" className="md:px-2 md:h-[34px]">
          {optimisticNetworkName}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[300px]">
        {SUPPORTED_NETWORKS.map((network) => (
          <DropdownMenuItem
            key={network.id}
            onSelect={() => {
              setOpen(false);

              startTransition(() => {
                setOptimisticNetworkName(network.name);
                saveNetwork(network.name);
              });
            }}
            className="gap-4 group/item flex flex-row justify-between items-center"
            data-active={network.name === optimisticNetworkName}
          >
            <div className="flex flex-col gap-1 items-start">
              {network.name}
              <div className="text-xs text-muted-foreground">
                Chain ID: {network.id}
              </div>
            </div>
            <div className="text-foreground dark:text-foreground opacity-0 group-data-[active=true]/item:opacity-100">
              <CheckCircleFillIcon />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 