import React from 'react'
import { HomeView } from '@/components/HomeView'
import { fetchHomeViewProps } from '@/lib/homeData'

export default async function HomePageRoute() {
  const props = await fetchHomeViewProps('en')
  return <HomeView {...props} />
}
