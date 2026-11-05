import config from '@payload-config'
import { getPayload } from 'payload'

export async function getPayloadClient() {
  return getPayload({ config })
}

export function resolveMediaUrl(uploadDoc: unknown, fallbackUrl?: string | null): string {
  if (
    uploadDoc &&
    typeof uploadDoc === 'object' &&
    'url' in uploadDoc &&
    typeof (uploadDoc as { url?: unknown }).url === 'string' &&
    (uploadDoc as { url: string }).url.length > 0
  ) {
    return (uploadDoc as { url: string }).url
  }
  return fallbackUrl || ''
}
