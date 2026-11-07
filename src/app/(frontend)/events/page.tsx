import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Events',
}

interface EventsPageProps {
  searchParams: Promise<{
    q?: string
    view?: string
    month?: string
    year?: string
  }>
}

const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function buildMonthWeeks(year: number, monthIndex: number) {
  const firstDay = new Date(year, monthIndex, 1).getDay()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const prevMonthDays = new Date(year, monthIndex, 0).getDate()

  const cells: Array<{ day: number; inMonth: boolean; dateKey: string }> = []
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i
    const prevMonth = monthIndex === 0 ? 12 : monthIndex
    const prevYear = monthIndex === 0 ? year - 1 : year
    cells.push({
      day: d,
      inMonth: false,
      dateKey: `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      inMonth: true,
      dateKey: `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    })
  }
  let nextDay = 1
  while (cells.length % 7 !== 0) {
    const nextMonth = monthIndex === 11 ? 1 : monthIndex + 2
    const nextYear = monthIndex === 11 ? year + 1 : year
    cells.push({
      day: nextDay,
      inMonth: false,
      dateKey: `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}`,
    })
    nextDay++
  }

  const weeks: Array<Array<{ day: number; inMonth: boolean; dateKey: string }>> = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }
  return weeks
}

function createGoogleCalendarUrl(event: {
  title: string
  startDate: string
  endDate?: string | null
  venueName?: string
  venueAddress?: string
  description?: string | null
}) {
  const start = new Date(event.startDate)
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, '')
  const end = event.endDate
    ? new Date(event.endDate).toISOString().replace(/-|:|\.\d\d\d/g, '')
    : start

  const details = encodeURIComponent(
    `${event.description || ''}\n\nLocation: ${event.venueName || ''}, ${event.venueAddress || ''}`,
  )
  const location = encodeURIComponent(
    `${event.venueName || ''}, ${event.venueAddress || ''}`,
  )
  const text = encodeURIComponent(event.title)

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams
  const query = (params.q || '').trim()
  const view = params.view === 'list' ? 'list' : 'month'

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // 1-indexed

  const targetYear =
    Number.parseInt(params.year || '', 10) || currentYear
  const parsedMonth = Number.parseInt(params.month || '', 10)
  const targetMonth =
    parsedMonth >= 1 && parsedMonth <= 12 ? parsedMonth : currentMonth

  const targetDate = new Date(targetYear, targetMonth - 1, 1)
  const monthLabel = targetDate.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  // Previous and next month calculations
  const prevMonth = targetMonth === 1 ? 12 : targetMonth - 1
  const prevYear = targetMonth === 1 ? targetYear - 1 : targetYear
  const nextMonth = targetMonth === 12 ? 1 : targetMonth + 1
  const nextYear = targetMonth === 12 ? targetYear + 1 : targetYear

  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const payload = await getPayloadClient()
  const eventsResult = await payload.find({
    collection: 'events',
    where: query
      ? {
          or: [
            { title: { like: query } },
            { description: { like: query } },
          ],
        }
      : undefined,
    sort: '-startDate',
    limit: 100,
  })

  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  // Dynamically calculate upcoming vs past based on date
  const upcomingEvents: typeof eventsResult.docs = []
  const pastEvents: typeof eventsResult.docs = []

  for (const ev of eventsResult.docs) {
    const end = ev.endDate ? new Date(ev.endDate) : new Date(ev.startDate)
    if (end.getTime() >= startOfToday.getTime()) {
      upcomingEvents.push(ev)
    } else {
      pastEvents.push(ev)
    }
  }

  // Sort upcoming ascending (soonest first)
  upcomingEvents.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  )

  // Map of events by date string (YYYY-MM-DD)
  const eventsByDate = new Map<string, typeof eventsResult.docs>()
  for (const ev of eventsResult.docs) {
    const d = new Date(ev.startDate)
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
    const existing = eventsByDate.get(key) || []
    existing.push(ev)
    eventsByDate.set(key, existing)
  }

  const weeks = buildMonthWeeks(targetYear, targetMonth - 1)

  return (
    <div className="tribe-events-container">
      {upcomingEvents.length === 0 && (
        <div className="tribe-notice-banner" role="status">
          {query
            ? `No upcoming events matched "${query}". Showing matching past events below.`
            : 'There are no upcoming events currently scheduled.'}
        </div>
      )}

      <div className="tribe-events-bar">
        <search>
          <form method="GET" action="/events" className="tribe-search-form">
            <input type="hidden" name="view" value={view} />
            {view === 'month' && (
              <>
                <input type="hidden" name="month" value={targetMonth} />
                <input type="hidden" name="year" value={targetYear} />
              </>
            )}
            <div className="tribe-search-input-wrap">
              <label htmlFor="events-keyword-input" className="sr-only">
                Search for events by keyword
              </label>
              <svg
                className="tribe-search-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M11.164 10.133L16 14.97 14.969 16l-4.836-4.836a6.225 6.225 0 01-3.875 1.352 6.24 6.24 0 01-4.427-1.832A6.272 6.272 0 010 6.258 6.24 6.24 0 011.831 1.83 6.272 6.272 0 016.258 0c1.67 0 3.235.658 4.426 1.831a6.272 6.272 0 011.832 4.427c0 1.422-.48 2.773-1.352 3.875zM6.258 1.458c-1.28 0-2.49.498-3.396 1.404-1.866 1.867-1.866 4.925 0 6.791a4.774 4.774 0 003.396 1.405c1.28 0 2.489-.498 3.395-1.405 1.867-1.866 1.867-4.924 0-6.79a4.774 4.774 0 00-3.395-1.405z"
                />
              </svg>
              <input
                id="events-keyword-input"
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search for events"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                className="tribe-search-input"
              />
            </div>
            <button type="submit" className="tribe-find-btn">
              Find Events
            </button>
            {query && (
              <Link
                href={`/events?view=${view}`}
                style={{
                  padding: '1.2rem 1.6rem',
                  fontSize: '1.4rem',
                  textDecoration: 'none',
                  color: '#666',
                  alignSelf: 'center',
                }}
              >
                Clear
              </Link>
            )}
          </form>
        </search>

        <div className="tribe-view-tabs" aria-label="Event calendar views">
          <Link
            href={
              query
                ? `/events?view=list&q=${encodeURIComponent(query)}`
                : '/events?view=list'
            }
            className={`tribe-view-tab${view === 'list' ? ' is-active' : ''}`}
          >
            List
          </Link>
          <Link
            href={
              query
                ? `/events?view=month&month=${targetMonth}&year=${targetYear}&q=${encodeURIComponent(query)}`
                : `/events?view=month&month=${targetMonth}&year=${targetYear}`
            }
            className={`tribe-view-tab${view === 'month' ? ' is-active' : ''}`}
          >
            Month
          </Link>
        </div>
      </div>

      {view === 'month' && (
        <>
          <div className="tribe-top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div className="tribe-nav-group">
              <Link
                href={`/events?view=month&month=${prevMonth}&year=${prevYear}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
                className="tribe-nav-btn"
                aria-label="Previous month"
              >
                &larr; Prev Month
              </Link>
              <Link
                href={`/events?view=month&month=${currentMonth}&year=${currentYear}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
                className="tribe-today-badge"
              >
                This Month
              </Link>
              <Link
                href={`/events?view=month&month=${nextMonth}&year=${nextYear}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
                className="tribe-nav-btn"
                aria-label="Next month"
              >
                Next Month &rarr;
              </Link>
            </div>
            <h1 className="tribe-current-heading" style={{ margin: 0 }}>
              {monthLabel}
            </h1>
          </div>

          <table
            className="tribe-month-grid"
            aria-label={`Calendar for ${monthLabel}`}
          >
            <thead>
              <tr>
                <th scope="col">Sun</th>
                <th scope="col">Mon</th>
                <th scope="col">Tue</th>
                <th scope="col">Wed</th>
                <th scope="col">Thu</th>
                <th scope="col">Fri</th>
                <th scope="col">Sat</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, wIdx) => (
                <tr key={wIdx}>
                  {week.map((cell, cIdx) => {
                    const cellEvents = eventsByDate.get(cell.dateKey) || []
                    const isToday = cell.dateKey === todayKey

                    return (
                      <td
                        key={cIdx}
                        className={`${cell.inMonth ? '' : 'is-muted'} ${isToday ? 'is-today' : ''}`}
                      >
                        <span className="tribe-cal-day-num">{cell.day}</span>
                        {cellEvents.length > 0 && (
                          <div className="tribe-cal-events-list">
                            {cellEvents.map((ev) => (
                              <a
                                key={ev.id}
                                href={`#event-${ev.id}`}
                                className="tribe-cal-event-pill"
                                title={`${ev.title} (${ev.dateTimeDisplay})`}
                              >
                                {ev.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {upcomingEvents.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <h2 className="tribe-past-events-heading">Upcoming Events</h2>
          {upcomingEvents.map((ev) => {
            const dt = new Date(ev.startDate)
            const gcalUrl = createGoogleCalendarUrl(ev)

            return (
              <div key={ev.id} id={`event-${ev.id}`} className="tribe-event-row">
                <div className="tribe-event-date-tag" aria-hidden="true">
                  <span className="tribe-event-date-month">
                    {MONTH_SHORT[dt.getUTCMonth()]}
                  </span>
                  <span className="tribe-event-date-day">
                    {dt.getUTCDate()}
                  </span>
                  <span className="tribe-event-date-year">
                    {dt.getUTCFullYear()}
                  </span>
                </div>
                <article className="tribe-event-details">
                  <div className="tribe-event-datetime">
                    {ev.dateTimeDisplay}
                  </div>
                  <h3 className="tribe-event-title">{ev.title}</h3>
                  <address className="tribe-event-venue">
                    <strong>{ev.venueName}</strong>
                    <span>{ev.venueAddress}</span>
                  </address>
                  {ev.description && (
                    <p className="tribe-event-desc">{ev.description}</p>
                  )}
                  <div style={{ marginTop: '1rem' }}>
                    <a
                      href={gcalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        fontSize: '1.3rem',
                        fontWeight: 600,
                        color: 'rgb(149, 45, 3)',
                        textDecoration: 'none',
                        border: '1px solid rgb(236, 131, 11)',
                        padding: '0.4rem 1rem',
                        borderRadius: '0.6rem',
                      }}
                    >
                      + Add to Google Calendar
                    </a>
                  </div>
                </article>
              </div>
            )
          })}
        </section>
      )}

      <section>
        <h2 className="tribe-past-events-heading">Past Events</h2>
        {pastEvents.length === 0 ? (
          <p style={{ fontSize: '1.6rem' }}>No past events found.</p>
        ) : (
          pastEvents.map((ev) => {
            const dt = new Date(ev.startDate)
            return (
              <div key={ev.id} id={`event-${ev.id}`} className="tribe-event-row">
                <div className="tribe-event-date-tag" aria-hidden="true">
                  <span className="tribe-event-date-month">
                    {MONTH_SHORT[dt.getUTCMonth()]}
                  </span>
                  <span className="tribe-event-date-day">
                    {dt.getUTCDate()}
                  </span>
                  <span className="tribe-event-date-year">
                    {dt.getUTCFullYear()}
                  </span>
                </div>
                <article className="tribe-event-details">
                  <div className="tribe-event-datetime">
                    {ev.dateTimeDisplay}
                  </div>
                  <h3 className="tribe-event-title">{ev.title}</h3>
                  <address className="tribe-event-venue">
                    <strong>{ev.venueName}</strong>
                    <span>{ev.venueAddress}</span>
                  </address>
                  {ev.description && (
                    <p className="tribe-event-desc">{ev.description}</p>
                  )}
                </article>
              </div>
            )
          })
        )}
      </section>
    </div>
  )
}
