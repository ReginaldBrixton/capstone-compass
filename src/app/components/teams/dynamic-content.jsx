import ClientOnly from '../common/client-only';

export default function DynamicContent() {
  return (
    <ClientOnly>{/* Your dynamic content that uses browser APIs */}</ClientOnly>
  );
}
