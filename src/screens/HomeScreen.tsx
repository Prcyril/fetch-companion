import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { pets, events } from '../data/mockData'
import type { Pet } from '../types/index'

const EVENT_COLOURS: Record<string, { bg: string; dot: string; text: string; label: string }> = {
  vet:        { bg: '#E1F5EE', dot: '#1D9E75', text: '#0F6E56', label: 'Vet visit' },
  medication: { bg: '#FFF5E0', dot: '#E8A020', text: '#854F0B', label: 'Medication' },
  insurance:  { bg: '#EEF0F8', dot: '#5B8DEF', text: '#3A4A9A', label: 'Insurance' },
  wellness:   { bg: '#F3EEFB', dot: '#9B72CF', text: '#6B3FA0', label: 'Wellness' },
  milestone:  { bg: '#F9E0F3', dot: '#F279C5', text: '#A0348A', label: 'Milestone' },
  emergency:  { bg: '#FCEAEA', dot: '#E05A5A', text: '#A03030', label: 'Emergency' },
}

function getAge(dob: string): string {
  const years = Math.floor((Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365))
  return years === 1 ? '1 yr' : `${years} yrs`
}

function getLastVetVisit(petId: string): string {
  const vetEvents = events
    .filter(e => e.petId === petId && e.type === 'vet')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  if (!vetEvents.length) return 'None yet'
  return new Date(vetEvents[0].date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getRecentEvents(petId: string) {
  return events
    .filter(e => e.petId === petId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
}

export default function HomeScreen() {
  const [activePetId, setActivePetId] = useState(pets[0].id)
  const navigate = useNavigate()
  const activePet = pets.find(p => p.id === activePetId) as Pet
  const recentEvents = getRecentEvents(activePetId)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F7', paddingBottom: 24 }}
    >
      <div style={{ padding: '56px 20px 16px' }}>
        <p style={{ fontSize: 13, color: '#6B6B6B', margin: '0 0 4px' }}>Good morning 👋</p>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 28, fontWeight: 700, color: '#1A1A1A',
          margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2,
        }}>Your pets</h1>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 20px 20px' }}>
        {pets.map(pet => {
          const active = pet.id === activePetId
          return (
            <button key={pet.id} onClick={() => setActivePetId(pet.id)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 9999,
              border: active ? '1.5px solid #F279C5' : '0.5px solid #DEDEDE',
              backgroundColor: active ? '#F9E0F3' : '#FFFFFF',
              cursor: 'pointer', transition: 'all 200ms ease-out',
            }}>
              <span style={{ fontSize: 18 }}>{pet.emoji}</span>
              <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: active ? '#A0348A' : '#1A1A1A' }}>
                {pet.name}
              </span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePetId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{ padding: '0 20px 20px' }}
        >
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: 16,
            border: '0.5px solid #DEDEDE', padding: '18px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', right: -4, top: -4,
              fontSize: 72, opacity: 0.07,
              pointerEvents: 'none', userSelect: 'none',
            }}>
              {activePet.emoji}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                backgroundColor: activePet.colour,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, flexShrink: 0,
              }}>
                {activePet.emoji}
              </div>
              <div>
                <h2 style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 20, fontWeight: 700, color: '#1A1A1A',
                  margin: '0 0 2px', letterSpacing: '-0.01em',
                }}>
                  {activePet.name}
                </h2>
                <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>
                  {activePet.breed} · {getAge(activePet.dob)}
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              paddingTop: 14, borderTop: '0.5px solid #F0F0F2',
            }}>
              {[
                { label: 'Last vet', value: getLastVetVisit(activePetId) },
                { label: 'Events', value: `${events.filter(e => e.petId === activePetId).length}` },
                { label: 'Cover', value: 'Active ✓', green: true },
              ].map((stat, i) => (
                <div key={i} style={{
                  flex: 1,
                  borderLeft: i > 0 ? '0.5px solid #F0F0F2' : 'none',
                  paddingLeft: i > 0 ? 12 : 0,
                }}>
                  <p style={{ fontSize: 10, color: '#6B6B6B', margin: '0 0 3px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: stat.green ? '#1D9E75' : '#1A1A1A', margin: 0 }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', margin: 0 }}>Recent events</h3>
          <button onClick={() => navigate('/timeline')} style={{
            fontSize: 13, color: '#F279C5', fontWeight: 500,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}>
            See all →
          </button>
        </div>

        {recentEvents.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: 12,
            border: '0.5px solid #DEDEDE', padding: '32px 20px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 28, margin: '0 0 8px' }}>🐾</p>
            <p style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A', margin: '0 0 4px' }}>No events yet</p>
            <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>
              Tap + to log {activePet.name}'s first health event
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentEvents.map(event => {
              const colours = EVENT_COLOURS[event.type]
              return (
                <motion.div
                  key={event.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/event/${event.id}`)}
                  style={{
                    backgroundColor: '#FFFFFF', borderRadius: 12,
                    border: '0.5px solid #DEDEDE', padding: '12px 14px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    backgroundColor: colours.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: colours.dot }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A', margin: '0 0 2px' }}>
                      {event.title}
                    </p>
                    <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>
                      {new Date(event.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {event.clinic ? ` · ${event.clinic}` : ''}
                    </p>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 500,
                    color: colours.text, backgroundColor: colours.bg,
                    borderRadius: 9999, padding: '3px 8px',
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    {colours.label}
                  </span>
                </motion.div>
              )
            })}
          </div>
        )}

        <button onClick={() => navigate('/timeline')} style={{
          width: '100%', marginTop: 16, padding: '14px',
          backgroundColor: '#1A1A1A', color: '#FFFFFF',
          border: 'none', borderRadius: 9999,
          fontSize: 15, fontWeight: 500,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          View full timeline
        </button>
      </div>
    </motion.div>
  )
}
