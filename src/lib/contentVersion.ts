import { createHash } from 'node:crypto';

interface VersionableContent {
  data: unknown;
  body?: string;
}

export function contentVersion(entry: VersionableContent): string {
  return createHash('sha256')
    .update(JSON.stringify(entry.data))
    .update(entry.body ?? '')
    .digest('hex')
    .slice(0, 12);
}
