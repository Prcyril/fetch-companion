import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { events, pets } from './mockData'
import type { Pet, TimelineEvent } from './types'

const EVENT_META: Record<string, { bg: string; dot: string; text: string; label: string }> = {
  vet:        { bg: '#E1F5EE', dot: '#1D9E75', text: '#0F6E56', label: 'Vet visit' },
  medication: { bg: '#FFF5E0', dot: '#E8A020', text: '#854F0B', label: 'Medication' },
  insurance:  { bg: '#EEF0F8', dot: '#5B8DEF', text: '#3A4A9A', label: 'Insurance' },
  wellness:   { bg: '#F3EEFB', dot: '#9B72CF', text: '#6B3FA0', label: 'Wellness' },
  milestone:  { bg: '#F9E0F3', dot: '#F279C5', text: '#A0348A', label: 'Milestone' },
  emergency:  { bg: '#FCEAEA', dot: '#E05A5A', text: '#A03030', label: 'Emergency' },
}

const FILTERS = ['All', 'Vet', 'Medication', 'Insurance', 'Wellness', 'Milestone', 'Emergency']

const DOT_SIZE = 14
const DOT_COL_WIDTH = 32

function groupByMonth(evts: TimelineEvent[]): Record<string, TimelineEvent[]> {
  return evts.reduce((acc, evt) => {
    const key = new Date(evt.date).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
    if (!acc[key]) acc[key] = []
    acc[key].push(evt)
    return acc
  }, {} as Record<string, TimelineEvent[]>)
}

export default function TimelineScreen() {
  const [activePetId, setActivePetId] = useState(pets[0].id)
  const [activeFilter, setActiveFilter] = useState('All')
  const navigate = useNavigate()

  const activePet = pets.find(p => p.id === activePetId) as Pet

  const filtered = events
    .filter(e => e.petId === activePetId)
    .filter(e => activeFilter === 'All' || e.type === activeFilter.toLowerCase())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const grouped = groupByMonth(filtered)
  const months = Object.keys(grouped)

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F7', paddingBottom: 32 }}>

      <div style={{ padding: '16px 20px 16px' }}>
        <p style={{ fontSize: 13, color: '#6B6B6B', margin: '0 0 4px' }}>Health history</p>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 28, fontWeight: 700, color: '#1A1A1A',
          margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2,
        }}>
          {activePet.name}'s timeline
        </h1>
      </div>

      {/* Pet switcher */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 16px' }}>
        {pets.map(pet => {
          const active = pet.id === activePetId
          return (
            <button key={pet.id} onClick={() => setActivePetId(pet.id)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 9999,
              border: active ? '1.5px solid #F279C5' : '0.5px solid #DEDEDE',
              backgroundColor: active ? '#F9E0F3' : '#FFFFFF',
              cursor: 'pointer', transition: 'all 200ms ease-out',
              fontFamily: 'inherit',
            }}>
              <span style={{ fontSize: 16 }}>{pet.emoji}</span>
              <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: active ? '#A0348A' : '#1A1A1A' }}>
                {pet.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Filter chips */}
      <div style={{
        display: 'flex', gap: 8, padding: '0 20px 20px',
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {FILTERS.map(filter => {
          const active = filter === activeFilter
          return (
            <button key={filter} onClick={() => setActiveFilter(filter)} style={{
              padding: '6px 14px', borderRadius: 9999, whiteSpace: 'nowrap',
              border: active ? '1.5px solid #1A1A1A' : '0.5px solid #DEDEDE',
              backgroundColor: active ? '#1A1A1A' : '#FFFFFF',
              color: active ? '#FFFFFF' : '#6B6B6B',
              fontSize: 13, fontWeight: active ? 500 : 400,
              cursor: 'pointer', transition: 'all 200ms ease-out',
              fontFamily: 'inherit',
            }}>
              {filter}
            </button>
          )
        })}
      </div>

      {months.length === 0 && activeFilter === 'All' && (
        <div style={{ padding: '48px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: 32, margin: '0 0 12px' }}>🐾</p>
          <p style={{ fontSize: 15, fontWeight: 500, color: '#1A1A1A', margin: '0 0 6px' }}>No events yet</p>
          <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>Tap + to log {activePet.name}'s first health event</p>
        </div>
      )}
      {months.length === 0 && activeFilter !== 'All' && (
        <div style={{ padding: '48px 20px', textAlign: 'center' }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            backgroundColor: EVENT_META[activeFilter.toLowerCase()]?.dot ?? '#B0B0BF',
            margin: '0 auto 14px',
          }} />
          <p style={{ fontSize: 13, color: '#6B6B6B', margin: '0 0 4px' }}>
            No {activeFilter.toLowerCase()} events logged for {activePet.name} yet
          </p>
          <p style={{ fontSize: 12, color: '#B0B0BF', margin: 0 }}>Tap + to log the first one</p>
        </div>
      )}

      {/* Timeline body */}
      <div style={{ padding: '0 20px', position: 'relative' }}>

        {/* Gradient spine */}
        <div style={{
          position: 'absolute',
          left: 20 + DOT_COL_WIDTH / 2 - 1,
          top: 0,
          bottom: 0,
          width: 2,
          background: 'linear-gradient(to top, #F9E0F3, #F279C5)',
          borderRadius: 2,
          zIndex: 0,
        }} />

        {months.map((month, monthIdx) => (
          <div key={month} style={{ marginBottom: 4 }}>

            <div style={{
              display: 'flex', alignItems: 'center',
              marginBottom: 8, position: 'relative', zIndex: 1,
            }}>
              <div style={{ width: DOT_COL_WIDTH, flexShrink: 0 }} />
              <p style={{
                fontSize: 11, fontWeight: 600, color: '#1D9E75',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                margin: 0, paddingLeft: 12,
              }}>
                {month}
              </p>
            </div>

            {grouped[month].map((event, eventIdx) => {
              const meta = EVENT_META[event.type]
              const isLast = monthIdx === months.length - 1 && eventIdx === grouped[month].length - 1

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: eventIdx * 0.04, ease: 'easeOut' }}
                  style={{
                    display: 'flex', alignItems: 'flex-start',
                    marginBottom: isLast ? 16 : 10,
                    position: 'relative', zIndex: 1,
                  }}
                >
                  {/* Dot column */}
                  <div style={{
                    width: DOT_COL_WIDTH, flexShrink: 0,
                    display: 'flex', justifyContent: 'center',
                    paddingTop: 16,
                  }}>
                    <div style={{
                      width: DOT_SIZE, height: DOT_SIZE,
                      borderRadius: '50%',
                      backgroundColor: meta.dot,
                      border: '2.5px solid #F5F5F7',
                      boxShadow: `0 0 0 2px ${meta.dot}`,
                      flexShrink: 0,
                    }} />
                  </div>

                  {/* Card */}
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/event/${event.id}`)}
                    style={{
                      flex: 1, marginLeft: 12,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 12, border: '0.5px solid #DEDEDE',
                      padding: '12px 14px', cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <span style={{
                        fontSize: 11, fontWeight: 500,
                        color: meta.text, backgroundColor: meta.bg,
                        borderRadius: 9999, padding: '3px 8px',
                      }}>
                        {meta.label}
                      </span>
                      <span style={{ fontSize: 11, color: '#B0B0BF' }}>
                        {new Date(event.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>

                    <p style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A', margin: '0 0 2px' }}>
                      {event.title}
                    </p>

                    {event.clinic && (
                      <p style={{ fontSize: 12, color: '#6B6B6B', margin: '0 0 4px' }}>
                        {event.clinic}
                      </p>
                    )}

                    {event.notes && (
                      <p style={{
                        fontSize: 12, color: '#6B6B6B', margin: 0, lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {event.notes}
                      </p>
                    )}

                    {event.attachments && (
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        marginTop: 8, paddingTop: 8,
                        borderTop: '0.5px solid #F0F0F2',
                      }}>
                        <span style={{ fontSize: 12 }}>📎</span>
                        <span style={{ fontSize: 11, color: '#6B6B6B' }}>
                          {event.attachments} {event.attachments === 1 ? 'document' : 'documents'}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        ))}

        {/* End-of-list tail — gentle close when a filter is active and has results */}
        {months.length > 0 && activeFilter !== 'All' && (() => {
          const filterMeta = EVENT_META[activeFilter.toLowerCase()]
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(filtered.length * 0.04, 0.3) + 0.15, duration: 0.3 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                paddingTop: 4, paddingBottom: 20,
                position: 'relative', zIndex: 1,
              }}
            >
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                backgroundColor: filterMeta?.dot ?? '#B0B0BF',
                marginBottom: 14,
              }} />
              <p style={{ fontSize: 13, color: '#6B6B6B', margin: '0 0 4px', textAlign: 'center' }}>
                That's all of {activePet.name}'s {activeFilter.toLowerCase()} events
              </p>
              <p style={{ fontSize: 12, color: '#B0B0BF', margin: 0, textAlign: 'center' }}>
                Tap + to log another
              </p>
            </motion.div>
          )
        })()}
      </div>
    </div>
  )
}
