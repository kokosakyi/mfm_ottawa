import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Events',
}

interface EventsPageProps {
  searchParams: Promise<{ q?: string; view?: string }>
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

function buildCurrentMonthWeeks(year: number, monthIndex: number) {
  const firstDay = new Date(year, monthIndex, 1).getDay()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const prevMonthDays = new Date(year, monthIndex, 0).getDate()

  const cells: Array<{ day: number; inMonth: boolean }> = []
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, inMonth: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true })
  }
  let nextDay = 1
  while (cells.length % 7 !== 0) {
    cells.push({ day: nextDay++, inMonth: false })
  }

  const weeks: Array<Array<{ day: number; inMonth: boolean }>> = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }
  return weeks
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams
  const query = (params.q || '').trim()
  const view = params.view === 'list' ? 'list' : 'month'

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
    limit: 50,
  })

  const upcomingEvents = eventsResult.docs.filter(
    (ev) => ev.statusType === 'upcoming',
  )
  const pastEvents = eventsResult.docs.filter(
    (ev) => ev.statusType !== 'upcoming',
  )

  const now = new Date()
  const monthLabel = now.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  })
  const weeks = buildCurrentMonthWeeks(now.getFullYear(), now.getMonth())

  return (
    <div className="tribe-events-container">
      {upcomingEvents.length === 0 && (
        <div className="tribe-notice-banner" role="status">
          {query
            ? `No upcoming events matched "${query}". Showing matching events below.`
            : 'There are no upcoming events.'}
        </div>
      )}

      <div className="tribe-events-bar">
        <search>
          <form method="GET" action="/events" className="tribe-search-form">
            <input type="hidden" name="view" value={view} />
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
                ? `/events?view=month&q=${encodeURIComponent(query)}`
                : '/events?view=month'
            }
            className={`tribe-view-tab${view === 'month' ? ' is-active' : ''}`}
          >
            Month
          </Link>
        </div>
      </div>

      {view === 'month' && (
        <>
          <div className="tribe-top-bar">
            <Link href="/events?view=month" className="tribe-today-badge">
              This Month
            </Link>
            <h1 className="tribe-current-heading">{monthLabel}</h1>
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
                  {week.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={cell.inMonth ? undefined : 'is-muted'}
                    >
                      {cell.day}
                    </td>
                  ))}
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
            return (
              <div key={ev.id} className="tribe-event-row">
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
          })}
        </section>
      )}

      <section>
        <h2 className="tribe-past-events-heading">Latest Past Events</h2>
        {pastEvents.length === 0 ? (
          <p style={{ fontSize: '1.6rem' }}>No past events found.</p>
        ) : (
          pastEvents.map((ev) => {
            const dt = new Date(ev.startDate)
            return (
              <div key={ev.id} className="tribe-event-row">
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
