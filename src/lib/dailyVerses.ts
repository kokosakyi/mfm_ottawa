export interface DailyVerse {
  headingEn: string
  headingFr: string
  textEn: string
  textFr: string
  referenceEn: string
  referenceFr: string
  referenceUrl: string
}

export const CURATED_DAILY_VERSES: DailyVerse[] = [
  {
    headingEn: 'Bible Verse of the Day',
    headingFr: 'Verset biblique du jour',
    textEn:
      'Do I take any pleasure in the death of the wicked? declares the Sovereign LORD. Rather, am I not pleased when they turn from their ways and live?',
    textFr:
      "Est-ce que je prends plaisir à voir le méchant mourir? déclare le Seigneur, l'Eternel. N'est-ce pas plutôt à le voir changer de conduite et vivre?",
    referenceEn: 'Ezekiel 18:23',
    referenceFr: 'Ézéchiel 18:23',
    referenceUrl: 'https://dailyverses.net/ezekiel/18/23',
  },
  {
    headingEn: 'Bible Verse of the Day',
    headingFr: 'Verset biblique du jour',
    textEn:
      'For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.',
    textFr:
      'Car je connais les projets que j’ai formés sur vous, dit l’Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l’espérance.',
    referenceEn: 'Jeremiah 29:11',
    referenceFr: 'Jérémie 29:11',
    referenceUrl: 'https://dailyverses.net/jeremiah/29/11',
  },
  {
    headingEn: 'Bible Verse of the Day',
    headingFr: 'Verset biblique du jour',
    textEn:
      'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    textFr:
      'Confie-toi en l’Éternel de tout ton cœur, et ne t’appuie pas sur ta sagesse; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.',
    referenceEn: 'Proverbs 3:5-6',
    referenceFr: 'Proverbes 3:5-6',
    referenceUrl: 'https://dailyverses.net/proverbs/3/5-6',
  },
  {
    headingEn: 'Bible Verse of the Day',
    headingFr: 'Verset biblique du jour',
    textEn:
      'The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?',
    textFr:
      'L’Éternel est ma lumière et mon salut: de qui aurais-je crainte? L’Éternel est le soutien de ma vie: de qui aurais-je peur?',
    referenceEn: 'Psalm 27:1',
    referenceFr: 'Psaume 27:1',
    referenceUrl: 'https://dailyverses.net/psalms/27/1',
  },
  {
    headingEn: 'Bible Verse of the Day',
    headingFr: 'Verset biblique du jour',
    textEn:
      'I can do all things through Christ who strengthens me.',
    textFr:
      'Je puis tout par celui qui me fortifie.',
    referenceEn: 'Philippians 4:13',
    referenceFr: 'Philippiens 4:13',
    referenceUrl: 'https://dailyverses.net/philippians/4/13',
  },
  {
    headingEn: 'Bible Verse of the Day',
    headingFr: 'Verset biblique du jour',
    textEn:
      'Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.',
    textFr:
      'Fortifie-toi et prends courage! Ne t’effraie point et ne t’épouvante point, car l’Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.',
    referenceEn: 'Joshua 1:9',
    referenceFr: 'Josué 1:9',
    referenceUrl: 'https://dailyverses.net/joshua/1/9',
  },
  {
    headingEn: 'Bible Verse of the Day',
    headingFr: 'Verset biblique du jour',
    textEn:
      'The steadfast love of the LORD never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.',
    textFr:
      'Les bontés de l’Éternel ne sont pas épuisées, ses compassions ne sont pas à leur terme; elles se renouvellent chaque matin. Oh! que ta fidélité est grande!',
    referenceEn: 'Lamentations 3:22-23',
    referenceFr: 'Lamentations 3:22-23',
    referenceUrl: 'https://dailyverses.net/lamentations/3/22-23',
  },
  {
    headingEn: 'Bible Verse of the Day',
    headingFr: 'Verset biblique du jour',
    textEn:
      'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    textFr:
      'Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.',
    referenceEn: 'Romans 8:28',
    referenceFr: 'Romains 8:28',
    referenceUrl: 'https://dailyverses.net/romans/8/28',
  },
  {
    headingEn: 'Bible Verse of the Day',
    headingFr: 'Verset biblique du jour',
    textEn:
      'Cast all your anxiety on him because he cares for you.',
    textFr:
      'Et déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.',
    referenceEn: '1 Peter 5:7',
    referenceFr: '1 Pierre 5:7',
    referenceUrl: 'https://dailyverses.net/1-peter/5/7',
  },
  {
    headingEn: 'Bible Verse of the Day',
    headingFr: 'Verset biblique du jour',
    textEn:
      'The name of the LORD is a strong tower; the righteous run to it and are safe.',
    textFr:
      'Le nom de l’Éternel est une tour forte; le juste s’y réfugie, et se trouve en sûreté.',
    referenceEn: 'Proverbs 18:10',
    referenceFr: 'Proverbes 18:10',
    referenceUrl: 'https://dailyverses.net/proverbs/18/10',
  },
]

function cleanHtml(raw: string): string {
  return raw
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
}

/**
 * Returns a fallback rotating daily verse based on calendar date.
 */
export function getRotatingVerse(date: Date = new Date()): DailyVerse {
  const startOfYear = new Date(date.getFullYear(), 0, 1)
  const dayOfYear = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
  )
  const index = Math.abs(dayOfYear) % CURATED_DAILY_VERSES.length
  return CURATED_DAILY_VERSES[index]
}

/**
 * Fetches the official daily verse from DailyVerses.net for the given date,
 * accessing both English and French translations.
 */
export async function fetchDailyVersesNet(
  targetDate: Date = new Date(),
): Promise<DailyVerse> {
  const year = targetDate.getFullYear()
  const month = targetDate.getMonth() + 1
  const day = targetDate.getDate()
  const fallback = getRotatingVerse(targetDate)

  const enUrl = `https://dailyverses.net/${year}/${month}/${day}`
  const frUrl = `https://dailyverses.net/fr/${year}/${month}/${day}`

  try {
    const [enRes, frRes] = await Promise.all([
      fetch(enUrl, {
        next: { revalidate: 3600 },
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MFMOttawa/1.0)' },
      }).catch(() => null),
      fetch(frUrl, {
        next: { revalidate: 3600 },
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MFMOttawa/1.0)' },
      }).catch(() => null),
    ])

    let textEn = fallback.textEn
    let refEn = fallback.referenceEn
    let refUrl = enUrl

    if (enRes && enRes.ok) {
      const htmlEn = await enRes.text()
      const vMatch = htmlEn.match(/<span class="v1">([\s\S]*?)<\/span>/)
      const refMatch = htmlEn.match(/<a href="([^"]*)" class="vc">([\s\S]*?)<\/a>/)
      if (vMatch && vMatch[1]) {
        textEn = cleanHtml(vMatch[1])
      }
      if (refMatch && refMatch[2]) {
        refEn = cleanHtml(refMatch[2])
        if (refMatch[1]) {
          refUrl = refMatch[1].startsWith('http')
            ? refMatch[1]
            : `https://dailyverses.net${refMatch[1]}`
        }
      }
    }

    let textFr = fallback.textFr
    let refFr = fallback.referenceFr

    if (frRes && frRes.ok) {
      const htmlFr = await frRes.text()
      const vMatchFr = htmlFr.match(/<span class="v1">([\s\S]*?)<\/span>/)
      const refMatchFr = htmlFr.match(/<a href="([^"]*)" class="vc">([\s\S]*?)<\/a>/)
      if (vMatchFr && vMatchFr[1]) {
        textFr = cleanHtml(vMatchFr[1])
      }
      if (refMatchFr && refMatchFr[2]) {
        refFr = cleanHtml(refMatchFr[2])
      }
    }

    return {
      headingEn: 'Bible Verse of the Day',
      headingFr: 'Verset biblique du jour',
      textEn,
      textFr,
      referenceEn: refEn,
      referenceFr: refFr,
      referenceUrl: refUrl,
    }
  } catch (err) {
    console.error('Error fetching DailyVerses.net:', err)
    return fallback
  }
}
