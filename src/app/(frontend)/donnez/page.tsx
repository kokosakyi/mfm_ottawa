import type { Metadata } from 'next'
import DonatePage from '../donate/page'

export const metadata: Metadata = {
  title: 'Dons / Faire un don — MFM Ottawa',
}

export default async function DonnezPage() {
  return <DonatePage searchParams={Promise.resolve({ lang: 'fr' })} />
}
