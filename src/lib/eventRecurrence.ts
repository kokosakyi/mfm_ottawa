export interface EventRecurrence {
  isRecurring?: boolean | null
  pattern?: 'weekly' | 'biweekly' | 'monthly_nth_day' | 'monthly_day_of_month' | null
  dayOfWeek?: string | null // '0'..'6' (Sun..Sat)
  nthWeek?: string | null // '1','2','3','4','last'
  recurrenceEndDate?: string | null
}

export interface BaseEventDoc {
  id: string | number
  title: string
  slug: string
  startDate: string
  endDate?: string | null
  dateTimeDisplay: string
  venueName?: string | null
  venueAddress?: string | null
  description?: string | null
  statusType?: 'upcoming' | 'past' | null
  recurrence?: EventRecurrence | null
}

export interface ExpandedEventInstance extends BaseEventDoc {
  instanceKey: string
  instanceDateKey: string // 'YYYY-MM-DD'
  isOccurrence?: boolean
}

/**
 * Format date to 'YYYY-MM-DD' in UTC or local depending on standard usage
 */
export function toDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function getNthWeekdayOfMonth(year: number, monthIndex: number, dayOfWeek: number, nth: string): number | null {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const matchingDays: number[] = []

  for (let d = 1; d <= daysInMonth; d++) {
    const testDate = new Date(year, monthIndex, d)
    if (testDate.getDay() === dayOfWeek) {
      matchingDays.push(d)
    }
  }

  if (nth === 'last') {
    return matchingDays.length > 0 ? matchingDays[matchingDays.length - 1] : null
  }

  const nthIndex = Number.parseInt(nth, 10) - 1
  if (nthIndex >= 0 && nthIndex < matchingDays.length) {
    return matchingDays[nthIndex]
  }

  return null
}

/**
 * Given a list of events from the database and a target date range (start, end),
 * expands recurring events into actual occurrences alongside non-recurring events.
 */
export function expandEventsForRange(
  events: BaseEventDoc[],
  rangeStart: Date,
  rangeEnd: Date,
): ExpandedEventInstance[] {
  const instances: ExpandedEventInstance[] = []

  for (const ev of events) {
    const recurrence = ev.recurrence

    // Non-recurring event: emit original event if it has a startDate
    if (!recurrence?.isRecurring) {
      const origDate = new Date(ev.startDate)
      instances.push({
        ...ev,
        instanceKey: String(ev.id),
        instanceDateKey: toDateKey(origDate),
        isOccurrence: false,
      })
      continue
    }

    // Recurring event
    const startOrigin = new Date(ev.startDate)
    const recurrenceEnd = recurrence.recurrenceEndDate
      ? new Date(recurrence.recurrenceEndDate)
      : null

    if (recurrenceEnd) {
      recurrenceEnd.setHours(23, 59, 59, 999)
    }

    const durationMs = ev.endDate
      ? new Date(ev.endDate).getTime() - startOrigin.getTime()
      : 0

    const pattern = recurrence.pattern || 'weekly'
    const targetDayOfWeek = Number.parseInt(
      recurrence.dayOfWeek !== undefined && recurrence.dayOfWeek !== null && recurrence.dayOfWeek !== ''
        ? recurrence.dayOfWeek
        : String(startOrigin.getDay()),
      10,
    )

    // Iterate through days within [rangeStart, rangeEnd]
    const cur = new Date(rangeStart)
    cur.setHours(0, 0, 0, 0)
    const endLimit = new Date(rangeEnd)
    endLimit.setHours(23, 59, 59, 999)

    while (cur <= endLimit) {
      // Must not be before the event's original start date
      const curMidnight = new Date(cur)
      curMidnight.setHours(23, 59, 59, 999)
      if (curMidnight < startOrigin) {
        cur.setDate(cur.getDate() + 1)
        continue
      }

      // Must not be after recurrence end date
      if (recurrenceEnd && cur > recurrenceEnd) {
        break
      }

      let matches = false

      if (pattern === 'weekly') {
        matches = cur.getDay() === targetDayOfWeek
      } else if (pattern === 'biweekly') {
        if (cur.getDay() === targetDayOfWeek) {
          // Check if difference in weeks is an even multiple of 2
          const diffDays = Math.round(
            (cur.getTime() - startOrigin.getTime()) / (1000 * 60 * 60 * 24),
          )
          const diffWeeks = Math.floor(diffDays / 7)
          matches = diffWeeks >= 0 && diffWeeks % 2 === 0
        }
      } else if (pattern === 'monthly_nth_day') {
        const nth = recurrence.nthWeek || '1'
        const expectedDay = getNthWeekdayOfMonth(
          cur.getFullYear(),
          cur.getMonth(),
          targetDayOfWeek,
          nth,
        )
        matches = expectedDay === cur.getDate()
      } else if (pattern === 'monthly_day_of_month') {
        matches = cur.getDate() === startOrigin.getDate()
      }

      if (matches) {
        const occStart = new Date(cur)
        occStart.setHours(
          startOrigin.getHours(),
          startOrigin.getMinutes(),
          startOrigin.getSeconds(),
          startOrigin.getMilliseconds(),
        )

        const occEnd = durationMs > 0
          ? new Date(occStart.getTime() + durationMs)
          : null

        const dateKey = toDateKey(occStart)

        instances.push({
          ...ev,
          startDate: occStart.toISOString(),
          endDate: occEnd ? occEnd.toISOString() : null,
          instanceKey: `${ev.id}-${dateKey}`,
          instanceDateKey: dateKey,
          isOccurrence: true,
        })
      }

      cur.setDate(cur.getDate() + 1)
    }
  }

  return instances
}
