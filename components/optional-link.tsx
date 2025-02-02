import React from 'react'

import Link from 'next/link';

import { cn } from '@/lib/utils';

interface Props {
    href?: string;
    className?: string;
    children: React.ReactNode;
    target?: string;
}

export const OptionalLink = ({ href, className, children, target }: Props) => {

    if (!href) {
        return children;
    }

    return (
        <Link href={href} className={cn(className)} target={target}>
            {children}
        </Link>
    )
}