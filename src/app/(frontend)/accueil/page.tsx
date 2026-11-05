import type { Metadata } from 'next'
import React from 'react'
import { HomeView } from '@/components/HomeView'
import { fetchHomeViewProps } from '@/lib/homeData'

export const metadata: Metadata = {
  title: 'Accueil — MFM Ottawa',
}

export default async function AccueilPage() {
  const props = await fetchHomeViewProps('fr')
  return <HomeView {...props} />
}
