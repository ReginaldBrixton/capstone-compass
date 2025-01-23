import { cn } from '../../lib/utils';
import Image from 'next/image';
import React from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ size = 'md', className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative inline-block overflow-hidden rounded-full',
        size === 'sm' && 'h-8 w-8',
        size === 'md' && 'h-10 w-10',
        size === 'lg' && 'h-12 w-12',
        className
      )}
      {...props}
    />
  );
}

interface AvatarImageProps
  extends Omit<React.ComponentProps<typeof Image>, 'width' | 'height'> {
  onLoadingStatusChange?: (status: 'loading' | 'loaded' | 'error') => void;
}

export function AvatarImage({
  className,
  onLoadingStatusChange,
  src,
  alt = '',
  ...props
}: AvatarImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={cn('object-cover', className)}
      onLoad={() => onLoadingStatusChange?.('loaded')}
      onError={() => onLoadingStatusChange?.('error')}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className
      )}
      {...props}
    />
  );
}
