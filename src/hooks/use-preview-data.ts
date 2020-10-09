import { useEffect, useState } from 'react';

export default function usePreviewData<R, T>(transformer: (data: R) => T): T | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [previewData, setPreviewData] = useState<any>();

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const isWindow = !(event.source instanceof MessagePort) && !(event.source instanceof ServiceWorker);
      const source = event.source && isWindow ? (event.source as Window) : null;

      if (!source) return;

      if (event.data === 'ping') {
        (event.source as Window)?.postMessage('pong', event.origin);
        return;
      }

      setPreviewData(event.data);
      window.removeEventListener('message', handler);
    };

    window.addEventListener('message', handler, false);
    return () => window.removeEventListener('message', handler, false);
  }, []);

  return previewData ? transformer(previewData) : undefined;
}
