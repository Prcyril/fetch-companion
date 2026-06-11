import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles, Stethoscope, Pill, Shield, Heart, Star, AlertTriangle } from 'lucide-react'
import { pets, events, reminders } from './mockData'
import type { Pet } from './types'
import FetchMascot from './FetchMascot'
import FetchCTAButton from './FetchCTAButton'
import BlueDog from '../../imports/Component1-8'
import PinkCat from '../../imports/DivFramer1532En3'
import FlyingDog from '../../imports/Component1-2'

const REMINDER_ICONS: Record<string, typeof Stethoscope> = {
  vet: Stethoscope,
  medication: Pill,
  insurance: Shield,
  wellness: Heart,
  milestone: Star,
  emergency: AlertTriangle,
}

const REMINDER_COLOURS: Record<string, { colour: string; bg: string }> = {
  vet:        { colour: '#1D9E75', bg: '#E1F5EE' },
  medication: { colour: '#E8A020', bg: '#FFF5E0' },
  insurance:  { colour: '#5B8DEF', bg: '#EEF0F8' },
  wellness:   { colour: '#9B72CF', bg: '#F3EEFB' },
  milestone:  { colour: '#F279C5', bg: '#F9E0F3' },
  emergency:  { colour: '#E05A5A', bg: '#FCEAEA' },
}

function isDueSoon(dateStr: string): boolean {
  const ms = new Date(dateStr).getTime() - Date.now()
  return ms > 0 && ms <= 30 * 24 * 60 * 60 * 1000
}

function formatDueDate(dateStr: string): string {
  return 'Due ' + new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

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
      <div style={{ padding: '16px 20px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 13, color: '#6B6B6B', margin: '0 0 4px' }}>Good morning 👋</p>
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 28, fontWeight: 700, color: '#1A1A1A',
            margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2,
          }}>Your pets</h1>
        </div>
        <FetchMascot variant="pink-tall" style={{ marginTop: -4, marginRight: -4, opacity: 0.9 }} />
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
              fontFamily: 'inherit',
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
            <motion.div
              key={activePetId}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 14 }}
              style={{
                position: 'absolute', right: -8, bottom: -10,
                pointerEvents: 'none', userSelect: 'none',
                transformOrigin: 'bottom right',
              }}
            >
              {activePet.species === 'dog' ? (
                // BlueDog is size-full responsive — wrapper controls dimensions
                <div style={{ width: 140, height: 170, opacity: 0.2, marginTop: 48 }}>
                  <BlueDog />
                </div>
              ) : (
                // PinkCat has a hardcoded 358×416 inner Group — use CSS scale to shrink it
                <div style={{ width: 132, height: 153, overflow: 'hidden', position: 'relative', opacity: 0.32 }}>
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: 358, height: 416,
                    transform: 'scale(0.369)',
                    transformOrigin: 'top right',
                  }}>
                    <PinkCat />
                  </div>
                </div>
              )}
            </motion.div>

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

            <div style={{ display: 'flex', paddingTop: 14, borderTop: '0.5px solid #F0F0F2' }}>
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

      {/* Coming up strip */}
      <div style={{ paddingBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', margin: 0 }}>Coming up</h3>
          <button
            onClick={() => navigate('/reminders')}
            style={{
              fontSize: 13, color: '#F279C5', fontWeight: 500,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontFamily: 'inherit',
            }}>
            See all →
          </button>
        </div>
        <div style={{
          display: 'flex', gap: 10,
          paddingLeft: 20, paddingRight: 20,
          overflowX: 'auto', scrollbarWidth: 'none',
        }}>
          {reminders
            .filter(r => r.petId === activePetId)
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .slice(0, 3)
            .map((reminder, i) => {
              const soon = isDueSoon(reminder.dueDate)
              const colours = REMINDER_COLOURS[reminder.type]
              const Icon = REMINDER_ICONS[reminder.type]
              return (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.06, ease: 'easeOut' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/reminder/${reminder.id}`)}
                  style={{
                    width: 160, flexShrink: 0,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    border: '0.5px solid #DEDEDE',
                    borderLeft: `4px solid ${colours.colour}`,
                    padding: 14,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    backgroundColor: colours.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                    <Icon size={16} strokeWidth={1.5} color={colours.colour} />
                  </div>

                  <p style={{
                    fontSize: 13, fontWeight: 500, color: '#1A1A1A',
                    margin: '0 0 4px', lineHeight: 1.3,
                  }}>
                    {reminder.title}
                  </p>

                  <p style={{ fontSize: 12, color: '#6B6B6B', margin: '0 0 8px' }}>
                    {formatDueDate(reminder.dueDate)}
                  </p>

                  {soon && (
                    <span style={{
                      display: 'inline-block',
                      fontSize: 10, fontWeight: 500,
                      color: '#A0348A', backgroundColor: '#F9E0F3',
                      borderRadius: 9999, padding: '2px 8px',
                    }}>
                      Soon
                    </span>
                  )}
                </motion.div>
              )
            })}
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', margin: 0 }}>Recent events</h3>
          <button onClick={() => navigate('/timeline')} style={{
            fontSize: 13, color: '#F279C5', fontWeight: 500,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontFamily: 'inherit',
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

        {/* AI banner — shown when >3 events logged */}
        {recentEvents.length > 0 && (
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/insights')}
            style={{
              marginTop: 12,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #1A1A1A 0%, #2a2a2a 100%)',
              padding: '13px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
              cursor: 'pointer', position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', right: -10, top: -10,
              width: 80, height: 80, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(242,121,197,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #F279C5, #c94fa0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Sparkles size={15} strokeWidth={2} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'white', margin: '0 0 1px' }}>
                {activePet.name}'s health looks good
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                Ask AI for a full summary →
              </p>
            </div>
          </motion.div>
        )}

        {/* Fetch insurance CTA */}
        <div style={{
          marginTop: 16,
          backgroundColor: '#050505',
          borderRadius: 24,
          padding: '20px 18px 0 18px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 12,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0px 0px 0px 1.5px rgba(255,255,255,0.08) inset',
        }}>
          {/* lime dot accent */}
          <div style={{
            position: 'absolute', top: 20, left: 18,
            width: 8, height: 8, borderRadius: '50%',
            backgroundColor: '#B1FF9E',
          }} />
          <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
            <p style={{ fontSize: 11, color: '#B1FF9E', margin: '0 0 10px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', paddingLeft: 14 }}>
              Fetch Pet Insurance
            </p>
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 22, fontWeight: 700, color: '#FFFFFF',
              margin: '0 0 16px', lineHeight: 1.2, letterSpacing: '-0.02em',
            }}>
              2 mins to get{'\n'}a quote ☂️
            </p>
            <FetchCTAButton
              label="Get cover now"
              emoji="👉"
              size="sm"
              onClick={() => {}}
              style={{ marginBottom: 20 }}
            />
          </div>
          <div style={{
            flexShrink: 0,
            width: 190,
            height: 150,
            overflow: 'hidden',
            position: 'relative',
            marginBottom: -2,
            marginRight: -8,
          }}>
            <div style={{ width: 260, height: 205, position: 'absolute', bottom: -10, right: -20 }}>
              <FlyingDog />
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  )
}
