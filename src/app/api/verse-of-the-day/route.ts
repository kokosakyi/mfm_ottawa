import { NextRequest, NextResponse } from 'next/server'
import { fetchDailyVersesNet } from '@/lib/dailyVerses'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dateParam = searchParams.get('date')

    let targetDate = new Date()
    if (dateParam) {
      // Support formats like YYYY/M/D or YYYY-MM-DD
      const parts = dateParam.includes('/')
        ? dateParam.split('/').map(Number)
        : dateParam.split('-').map(Number)

      if (parts.length === 3 && !parts.some(isNaN)) {
        targetDate = new Date(parts[0], parts[1] - 1, parts[2])
      }
    }

    const verse = await fetchDailyVersesNet(targetDate)

    const year = targetDate.getFullYear()
    const month = targetDate.getMonth() + 1
    const day = targetDate.getDate()

    return NextResponse.json(
      {
        date: `${year}/${month}/${day}`,
        sourceUrl: `https://dailyverses.net/${year}/${month}/${day}`,
        sourceUrlFr: `https://dailyverses.net/fr/${year}/${month}/${day}`,
        heading: verse.headingEn,
        headingFr: verse.headingFr,
        verseText: verse.textEn,
        verseTextFr: verse.textFr,
        reference: verse.referenceEn,
        referenceFr: verse.referenceFr,
        referenceUrl: verse.referenceUrl,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
    )
  } catch (error) {
    console.error('API Error in /api/verse-of-the-day:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Bible verse of the day' },
      { status: 500 },
    )
  }
}
