import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { Stethoscope, Pill, Shield, Heart, Star, AlertTriangle, Check } from 'lucide-react'
import { pets, reminders } from './mockData'
import type { Pet, Reminder } from './types'

const EVENT_META: Record<string, { colour: string; bg: string; label: string; Icon: typeof Stethoscope }> = {
  vet:        { colour: '#1D9E75', bg: '#E1F5EE', label: 'Vet visit',   Icon: Stethoscope },
  medication: { colour: '#E8A020', bg: '#FFF5E0', label: 'Medication',  Icon: Pill },
  insurance:  { colour: '#5B8DEF', bg: '#EEF0F8', label: 'Insurance',   Icon: Shield },
  wellness:   { colour: '#9B72CF', bg: '#F3EEFB', label: 'Wellness',    Icon: Heart },
  milestone:  { colour: '#F279C5', bg: '#F9E0F3', label: 'Milestone',   Icon: Star },
  emergency:  { colour: '#E05A5A', bg: '#FCEAEA', label: 'Emergency',   Icon: AlertTriangle },
}

const RECURRING_LABEL: Record<string, string> = {
  monthly: 'Monthly',
  annually: 'Annual',
  once: 'One-time',
}

const FILTERS = ['All', 'This month', 'Upcoming', 'Done']

function getDaysUntil(dateStr: string): number {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

function formatDueDate(dateStr: string): string {
  return 'Due ' + new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

function urgencyLabel(days: number): { text: string; colour: string; bg: string } | null {
  if (days < 0) return { text: 'Overdue', colour: '#A03030', bg: '#FCEAEA' }
  if (days <= 30) return { text: 'Soon', colour: '#A0348A', bg: '#F9E0F3' }
  if (days <= 90) return { text: `${days}d`, colour: '#854F0B', bg: '#FFF5E0' }
  return null
}

function groupByMonth(items: Reminder[]): Record<string, Reminder[]> {
  return items.reduce((acc, r) => {
    const key = new Date(r.dueDate).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
    if (!acc[key]) acc[key] = []
    acc[key].push(r)
    return acc
  }, {} as Record<string, Reminder[]>)
}

export default function RemindersScreen() {
  const navigate = useNavigate()
  const [activePetId, setActivePetId] = useState(pets[0].id)
  const [activeFilter, setActiveFilter] = useState('All')
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set())

  const activePet = pets.find(p => p.id === activePetId) as Pet

  const filtered = reminders
    .filter(r => r.petId === activePetId)
    .filter(r => {
      const days = getDaysUntil(r.dueDate)
      if (activeFilter === 'Done') return doneIds.has(r.id)
      if (doneIds.has(r.id)) return false
      if (activeFilter === 'This month') return days >= 0 && days <= 31
      if (activeFilter === 'Upcoming') return days > 31
      return true
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

  const grouped = groupByMonth(filtered)
  const months = Object.keys(grouped)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F7', paddingBottom: 32 }}
    >
      {/* Header */}
      <div style={{ padding: '16px 20px 16px' }}>
        <p style={{ fontSize: 13, color: '#6B6B6B', margin: '0 0 4px' }}>Health schedule</p>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 28, fontWeight: 700, color: '#1A1A1A',
          margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2,
        }}>
          Reminders
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
              cursor: 'pointer', transition: 'all 200ms ease-out', fontFamily: 'inherit',
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
        {FILTERS.map(f => {
          const active = f === activeFilter
          return (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '6px 14px', borderRadius: 9999, whiteSpace: 'nowrap',
              border: active ? '1.5px solid #1A1A1A' : '0.5px solid #DEDEDE',
              backgroundColor: active ? '#1A1A1A' : '#FFFFFF',
              color: active ? '#FFFFFF' : '#6B6B6B',
              fontSize: 13, fontWeight: active ? 500 : 400,
              cursor: 'pointer', transition: 'all 200ms ease-out', fontFamily: 'inherit',
            }}>
              {f}
            </button>
          )
        })}
      </div>

      {/* Empty state */}
      {months.length === 0 && (
        <div style={{ padding: '48px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: 32, margin: '0 0 12px' }}>🐾</p>
          <p style={{ fontSize: 15, fontWeight: 500, color: '#1A1A1A', margin: '0 0 6px' }}>
            {activeFilter === 'Done' ? 'Nothing marked done yet' : 'No reminders'}
          </p>
          <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>
            {activeFilter === 'Done'
              ? 'Tap the checkmark on a reminder to mark it complete'
              : `No upcoming reminders for ${activePet.name}`}
          </p>
        </div>
      )}

      {/* Grouped reminder list */}
      <div style={{ padding: '0 20px' }}>
        {months.map(month => (
          <div key={month} style={{ marginBottom: 20 }}>
            <p style={{
              fontSize: 11, fontWeight: 600, color: '#1D9E75',
              textTransform: 'uppercase', letterSpacing: '0.06em',
              margin: '0 0 10px',
            }}>
              {month}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {grouped[month].map((reminder, i) => {
                const meta = EVENT_META[reminder.type]
                const Icon = meta.Icon
                const days = getDaysUntil(reminder.dueDate)
                const badge = urgencyLabel(days)
                const isDone = doneIds.has(reminder.id)

                return (
                  <motion.div
                    key={reminder.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05, ease: 'easeOut' }}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 12,
                      border: '0.5px solid #DEDEDE',
                      borderLeft: `4px solid ${isDone ? '#DEDEDE' : meta.colour}`,
                      padding: '13px 14px',
                      display: 'flex', alignItems: 'center', gap: 12,
                      opacity: isDone ? 0.5 : 1,
                      cursor: 'pointer',
                      transition: 'opacity 200ms ease-out',
                    }}
                    onClick={() => navigate(`/reminder/${reminder.id}`)}
                  >
                    {/* Icon */}
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      backgroundColor: isDone ? '#F0F0F2' : meta.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={17} strokeWidth={1.5} color={isDone ? '#B0B0BF' : meta.colour} />
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <p style={{
                          fontSize: 14, fontWeight: 500,
                          color: isDone ? '#B0B0BF' : '#1A1A1A',
                          margin: 0,
                          textDecoration: isDone ? 'line-through' : 'none',
                        }}>
                          {reminder.title}
                        </p>
                        {badge && !isDone && (
                          <span style={{
                            fontSize: 10, fontWeight: 500,
                            color: badge.colour, backgroundColor: badge.bg,
                            borderRadius: 9999, padding: '2px 7px', flexShrink: 0,
                          }}>
                            {badge.text}
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>
                          {formatDueDate(reminder.dueDate)}
                        </p>
                        {reminder.recurring && (
                          <span style={{
                            fontSize: 10, color: '#B0B0BF',
                            backgroundColor: '#F5F5F7',
                            borderRadius: 9999, padding: '1px 6px',
                          }}>
                            {RECURRING_LABEL[reminder.recurring]}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Done toggle */}
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        setDoneIds(prev => {
                          const next = new Set(prev)
                          next.has(reminder.id) ? next.delete(reminder.id) : next.add(reminder.id)
                          return next
                        })
                      }}
                      style={{
                        width: 28, height: 28, borderRadius: '50%',
                        backgroundColor: isDone ? '#F279C5' : 'transparent',
                        border: isDone ? 'none' : '1.5px solid #DEDEDE',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', flexShrink: 0,
                        transition: 'all 200ms ease-out',
                      }}
                    >
                      <Check size={13} strokeWidth={2.5} color={isDone ? 'white' : '#DEDEDE'} />
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
