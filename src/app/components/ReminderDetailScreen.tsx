import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, Stethoscope, Pill, Shield, Heart, Star, AlertTriangle, Calendar, RefreshCw, Sparkles, Check, X } from 'lucide-react'
import { reminders, pets, events } from './mockData'
import type { Reminder } from './types'
import CalendarPicker from './CalendarPicker'

const EVENT_META: Record<string, { colour: string; bg: string; text: string; label: string; Icon: typeof Stethoscope }> = {
  vet:        { colour: '#1D9E75', bg: '#E1F5EE', text: '#0F6E56', label: 'Vet visit',  Icon: Stethoscope },
  medication: { colour: '#E8A020', bg: '#FFF5E0', text: '#854F0B', label: 'Medication', Icon: Pill },
  insurance:  { colour: '#5B8DEF', bg: '#EEF0F8', text: '#3A4A9A', label: 'Insurance',  Icon: Shield },
  wellness:   { colour: '#9B72CF', bg: '#F3EEFB', text: '#6B3FA0', label: 'Wellness',   Icon: Heart },
  milestone:  { colour: '#F279C5', bg: '#F9E0F3', text: '#A0348A', label: 'Milestone',  Icon: Star },
  emergency:  { colour: '#E05A5A', bg: '#FCEAEA', text: '#A03030', label: 'Emergency',  Icon: AlertTriangle },
}

const RECURRING_LABEL: Record<string, string> = {
  monthly: 'Repeats monthly',
  annually: 'Repeats annually',
  once: 'One-time reminder',
}

function getDaysUntil(dateStr: string): number {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

function getRelatedEvents(reminder: Reminder) {
  return events
    .filter(e => e.petId === reminder.petId && e.type === reminder.type)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
}

export default function ReminderDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [done, setDone] = useState(false)
  const [rescheduleOpen, setRescheduleOpen] = useState(false)
  const [rescheduleDate, setRescheduleDate] = useState('')
  const [rescheduleTime, setRescheduleTime] = useState<string | undefined>(undefined)
  const [rescheduled, setRescheduled] = useState(false)
  const [newDate, setNewDate] = useState<string | null>(null)
  const [newTime, setNewTime] = useState<string | null>(null)

  const reminder = reminders.find(r => r.id === id)

  if (!reminder) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F7' }}>
        <p style={{ fontSize: 14, color: '#6B6B6B' }}>Reminder not found</p>
      </div>
    )
  }

  const meta = EVENT_META[reminder.type]
  const Icon = meta.Icon
  const pet = pets.find(p => p.id === reminder.petId)
  const currentDueDate = newDate ?? reminder.dueDate
  const days = getDaysUntil(currentDueDate)
  const relatedEvents = getRelatedEvents(reminder)
  const formattedDate = new Date(currentDueDate).toLocaleDateString('en-AU', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
  const isOverdue = days < 0
  const isSoon = days >= 0 && days <= 30

  function handleReschedule() {
    if (!rescheduleDate) return
    setNewDate(rescheduleDate)
    setNewTime(rescheduleTime ?? null)
    setRescheduleOpen(false)
    setRescheduled(true)
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#F5F5F7', padding: 32, textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
          style={{
            width: 72, height: 72, borderRadius: '50%',
            backgroundColor: '#E1F5EE',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <Check size={32} strokeWidth={2.5} color="#1D9E75" />
        </motion.div>
        <h2 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 24, fontWeight: 700, color: '#1A1A1A',
          margin: '0 0 8px', letterSpacing: '-0.01em',
        }}>
          Marked as done
        </h2>
        <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 32px' }}>
          {reminder.title} has been logged as complete
        </p>
        <button
          onClick={() => navigate('/reminders')}
          style={{
            width: '100%', padding: '14px',
            backgroundColor: '#1A1A1A', color: '#FFFFFF',
            border: 'none', borderRadius: 9999,
            fontSize: 15, fontWeight: 500,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Back to reminders
        </button>
      </motion.div>
    )
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F7', paddingBottom: 32 }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px 20px', gap: 12 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              backgroundColor: '#1A1A1A', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            <ChevronLeft size={18} strokeWidth={1.5} color="#FFFFFF" />
          </button>
          <span style={{
            fontSize: 12, fontWeight: 500,
            color: meta.text, backgroundColor: meta.bg,
            borderRadius: 9999, padding: '4px 12px',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: meta.colour }} />
            {meta.label}
          </span>
          {rescheduled && (
            <span style={{
              fontSize: 11, fontWeight: 500, color: '#0F6E56', backgroundColor: '#E1F5EE',
              borderRadius: 9999, padding: '4px 10px',
            }}>
              Rescheduled ✓
            </span>
          )}
          {!rescheduled && (isOverdue || isSoon) && (
            <span style={{
              fontSize: 11, fontWeight: 500,
              color: isOverdue ? '#A03030' : '#A0348A',
              backgroundColor: isOverdue ? '#FCEAEA' : '#F9E0F3',
              borderRadius: 9999, padding: '4px 10px',
            }}>
              {isOverdue ? 'Overdue' : 'Due soon'}
            </span>
          )}
        </div>

        <div style={{ padding: '0 20px' }}>

          {/* Main card */}
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: 16,
            border: '0.5px solid #DEDEDE',
            borderLeft: `4px solid ${meta.colour}`,
            padding: '20px', marginBottom: 12,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              backgroundColor: meta.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 14,
            }}>
              <Icon size={22} strokeWidth={1.5} color={meta.colour} />
            </div>
            <h1 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 24, fontWeight: 700, color: '#1A1A1A',
              margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.2,
            }}>
              {reminder.title}
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Calendar size={16} strokeWidth={1.5} color="#6B6B6B" />
                <span style={{ fontSize: 13, color: '#1A1A1A' }}>
                  {formattedDate}{newTime ? ` · ${newTime}` : ''}
                </span>
              </div>
              {reminder.recurring && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <RefreshCw size={16} strokeWidth={1.5} color="#6B6B6B" />
                  <span style={{ fontSize: 13, color: '#1A1A1A' }}>{RECURRING_LABEL[reminder.recurring]}</span>
                </div>
              )}
              {pet && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{pet.emoji}</span>
                  <span style={{ fontSize: 13, color: '#1A1A1A' }}>{pet.name} · {pet.breed}</span>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {reminder.notes && (
            <div style={{
              backgroundColor: '#FFFFFF', borderRadius: 16,
              border: '0.5px solid #DEDEDE', padding: '16px 20px', marginBottom: 12,
            }}>
              <p style={{
                fontSize: 11, fontWeight: 600, color: '#6B6B6B',
                textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px',
              }}>
                Notes
              </p>
              <p style={{ fontSize: 14, color: '#1A1A1A', margin: 0, lineHeight: 1.6 }}>
                {reminder.notes}
              </p>
            </div>
          )}

          {/* Related past events */}
          {relatedEvents.length > 0 && (
            <div style={{
              backgroundColor: '#FFFFFF', borderRadius: 16,
              border: '0.5px solid #DEDEDE', padding: '16px 20px', marginBottom: 20,
            }}>
              <p style={{
                fontSize: 11, fontWeight: 600, color: '#6B6B6B',
                textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px',
              }}>
                Past history
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {relatedEvents.map((event, i) => (
                  <div
                    key={event.id}
                    onClick={() => navigate(`/event/${event.id}`)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      paddingTop: i > 0 ? 10 : 0,
                      paddingBottom: i < relatedEvents.length - 1 ? 10 : 0,
                      borderBottom: i < relatedEvents.length - 1 ? '0.5px solid #F0F0F2' : 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: meta.colour, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A', margin: '0 0 1px' }}>{event.title}</p>
                      <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>
                        {new Date(event.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {event.clinic ? ` · ${event.clinic}` : ''}
                      </p>
                    </div>
                    <ChevronLeft size={14} strokeWidth={1.5} color="#B0B0BF" style={{ transform: 'rotate(180deg)' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <button
            onClick={() => setDone(true)}
            style={{
              width: '100%', marginBottom: 10, padding: '14px',
              backgroundColor: '#1A1A1A', color: '#FFFFFF',
              border: 'none', borderRadius: 9999,
              fontSize: 15, fontWeight: 500,
              cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Check size={16} strokeWidth={2.5} color="white" />
            Mark as done
          </button>

          <button
            onClick={() => {
              setRescheduleDate('')
              setRescheduleTime(undefined)
              setRescheduleOpen(true)
            }}
            style={{
              width: '100%', marginBottom: 10, padding: '14px',
              backgroundColor: 'transparent', color: '#1A1A1A',
              border: '1px solid #DEDEDE', borderRadius: 9999,
              fontSize: 15, fontWeight: 500,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Reschedule
          </button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const q = `Tell me about ${pet?.name ?? 'Bruno'}'s upcoming ${reminder.title.toLowerCase()} reminder`
              navigate('/insights', { state: { prefilledQuestion: q } })
            }}
            style={{
              width: '100%', padding: '14px',
              backgroundColor: 'transparent', color: '#1A1A1A',
              border: '1px solid #DEDEDE', borderRadius: 9999,
              fontSize: 15, fontWeight: 500,
              cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Sparkles size={16} strokeWidth={1.5} color="#F279C5" />
            Ask AI about this
          </motion.button>
        </div>
      </motion.div>

      {/* Reschedule sheet backdrop */}
      <AnimatePresence>
        {rescheduleOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setRescheduleOpen(false)}
            style={{
              position: 'absolute', inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 10,
            }}
          />
        )}
      </AnimatePresence>

      {/* Reschedule sheet */}
      <AnimatePresence>
        {rescheduleOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            style={{
              position: 'absolute', left: 0, right: 0, bottom: 0,
              backgroundColor: '#FFFFFF',
              borderRadius: '20px 20px 0 0',
              padding: '12px 20px 28px',
              zIndex: 20,
            }}
          >
            {/* Sheet drag handle */}
            <div style={{ width: 36, height: 4, borderRadius: 9999, backgroundColor: '#DEDEDE', margin: '0 auto 16px' }} />

            {/* Sheet header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <p style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 18, fontWeight: 700, color: '#1A1A1A',
                margin: 0, letterSpacing: '-0.01em',
              }}>
                Reschedule
              </p>
              <button
                onClick={() => setRescheduleOpen(false)}
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  backgroundColor: '#F5F5F7', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={14} strokeWidth={2} color="#6B6B6B" />
              </button>
            </div>

            {/* Calendar */}
            <CalendarPicker
              value={rescheduleDate}
              onChange={(date, time) => {
                setRescheduleDate(date)
                setRescheduleTime(time)
              }}
              accentColour={meta.colour}
              accentBg={meta.bg}
              accentText={meta.text}
              clinicName={pet?.id === 'mochi' ? 'Newtown Cat Clinic' : 'City Road Animal Hospital'}
            />

            {/* Confirm button */}
            <button
              onClick={handleReschedule}
              disabled={!rescheduleDate}
              style={{
                width: '100%', marginTop: 16, padding: '14px',
                backgroundColor: rescheduleDate ? '#1A1A1A' : '#DEDEDE',
                color: rescheduleDate ? '#FFFFFF' : '#B0B0BF',
                border: 'none', borderRadius: 9999,
                fontSize: 15, fontWeight: 500,
                cursor: rescheduleDate ? 'pointer' : 'not-allowed',
                fontFamily: 'inherit',
                transition: 'all 200ms ease-out',
              }}
            >
              {rescheduleTime ? `Confirm · ${rescheduleTime}` : 'Confirm date'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
