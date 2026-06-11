import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Clock, Wifi } from 'lucide-react'

// ─── Mock booking system ───────────────────────────────────────────────────────
// Generates available appointment slots relative to today so the demo always
// looks current. Simulates a live feed from City Road Animal Hospital's system.

const SLOT_TIMES = ['9:00 am', '10:30 am', '1:00 pm', '2:30 pm', '4:00 pm']

function generateAvailability(): Record<string, string[]> {
  const result: Record<string, string[]> = {}
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Seed availability: ~3 available days per week for the next 12 weeks
  const patterns = [2, 4, 5, 9, 11, 14, 16, 18, 22, 25, 28, 30, 33, 36, 39, 42,
                    44, 47, 51, 53, 56, 60, 63, 67, 70, 74, 77, 80, 84]

  patterns.forEach(offset => {
    const d = new Date(today)
    d.setDate(d.getDate() + offset)
    // Skip Sundays
    if (d.getDay() === 0) return
    const key = d.toISOString().split('T')[0]
    // Each day gets 2-4 random slots
    const count = 2 + (offset % 3)
    const shuffled = [...SLOT_TIMES].sort(() => (offset * 13 + count) % 3 - 1)
    result[key] = shuffled.slice(0, count).sort()
  })

  return result
}

const AVAILABILITY = generateAvailability()

// ─── Types ─────────────────────────────────────────────────────────────────────

interface CalendarPickerProps {
  value: string          // ISO date string yyyy-mm-dd
  onChange: (date: string, time?: string) => void
  accentColour: string
  accentBg: string
  accentText: string
  clinicName?: string
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function toISO(d: Date): string {
  return d.toISOString().split('T')[0]
}

function today(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate()
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function CalendarPicker({
  value,
  onChange,
  accentColour,
  accentBg,
  accentText,
  clinicName = 'City Road Animal Hospital',
}: CalendarPickerProps) {
  const now = today()

  // Start the calendar on the month of the current value or today
  const initDate = value ? new Date(value + 'T00:00:00') : now
  const [viewYear, setViewYear] = useState(initDate.getFullYear())
  const [viewMonth, setViewMonth] = useState(initDate.getMonth())
  const [selectedDate, setSelectedDate] = useState(value || '')
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Build the grid: 6 rows × 7 cols, starting from the Monday before the 1st
  const grid = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1)
    // 0=Sun → Mon-indexed: (day+6)%7
    const startOffset = (first.getDay() + 6) % 7
    const days: (Date | null)[] = []
    for (let i = 0; i < startOffset; i++) days.push(null)
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(viewYear, viewMonth, d))
    }
    // Pad to complete last row
    while (days.length % 7 !== 0) days.push(null)
    return days
  }, [viewYear, viewMonth])

  const monthLabel = new Date(viewYear, viewMonth, 1)
    .toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  function canGoPrev() {
    // Don't navigate before current month
    return viewYear > now.getFullYear() || viewMonth > now.getMonth()
  }

  function handleDayPress(day: Date) {
    const isPast = day < now && !sameDay(day, now)
    if (isPast) return
    const iso = toISO(day)
    setSelectedDate(iso)
    setSelectedTime(null)
    onChange(iso, undefined)
  }

  function handleTimePress(time: string) {
    setSelectedTime(time)
    onChange(selectedDate, time)
  }

  const slots = selectedDate ? (AVAILABILITY[selectedDate] ?? []) : []
  const hasSlots = slots.length > 0

  return (
    <div>
      {/* Clinic badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        marginBottom: 14, padding: '7px 12px',
        backgroundColor: '#F0FBF6', borderRadius: 10,
        border: '0.5px solid #B8E8D4',
      }}>
        <Wifi size={13} strokeWidth={2} color="#1D9E75" />
        <span style={{ fontSize: 12, fontWeight: 500, color: '#0F6E56', flex: 1 }}>
          Live availability · {clinicName}
        </span>
        <span style={{
          fontSize: 10, fontWeight: 600, color: '#1D9E75',
          backgroundColor: '#D1F0E3', borderRadius: 9999, padding: '2px 7px',
        }}>
          Connected
        </span>
      </div>

      {/* Month header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button
          onClick={prevMonth}
          disabled={!canGoPrev()}
          style={{
            width: 32, height: 32, borderRadius: '50%', border: 'none',
            backgroundColor: canGoPrev() ? '#F5F5F7' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: canGoPrev() ? 'pointer' : 'default',
            opacity: canGoPrev() ? 1 : 0.3,
          }}
        >
          <ChevronLeft size={16} strokeWidth={2} color="#1A1A1A" />
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{monthLabel}</span>
        <button
          onClick={nextMonth}
          style={{
            width: 32, height: 32, borderRadius: '50%', border: 'none',
            backgroundColor: '#F5F5F7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ChevronRight size={16} strokeWidth={2} color="#1A1A1A" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: '#B0B0BF', paddingBottom: 6 }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px 0' }}>
        {grid.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />

          const iso = toISO(day)
          const isPast = day < now && !sameDay(day, now)
          const isToday = sameDay(day, now)
          const isSelected = iso === selectedDate
          const available = !!AVAILABILITY[iso]

          return (
            <div
              key={iso}
              onClick={() => !isPast && handleDayPress(day)}
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                paddingTop: 2, paddingBottom: 4,
                cursor: isPast ? 'default' : 'pointer',
              }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: isSelected ? accentColour : 'transparent',
                border: isToday && !isSelected ? `1.5px solid ${accentColour}` : 'none',
                transition: 'all 150ms ease-out',
              }}>
                <span style={{
                  fontSize: 13, fontWeight: isSelected || isToday ? 700 : 400,
                  color: isSelected ? '#FFFFFF'
                       : isPast ? '#D0D0D8'
                       : isToday ? accentColour
                       : '#1A1A1A',
                }}>
                  {day.getDate()}
                </span>
              </div>
              {/* Availability dot */}
              <div style={{
                width: 4, height: 4, borderRadius: '50%',
                backgroundColor: available && !isPast
                  ? (isSelected ? 'rgba(255,255,255,0.7)' : '#1D9E75')
                  : 'transparent',
                marginTop: 1,
              }} />
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 14, marginTop: 10, justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#1D9E75' }} />
          <span style={{ fontSize: 11, color: '#6B6B6B' }}>Available slots</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: accentColour, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 9, color: 'white', fontWeight: 700 }}>6</span>
          </div>
          <span style={{ fontSize: 11, color: '#6B6B6B' }}>Selected</span>
        </div>
      </div>

      {/* Time slots */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '0.5px solid #F0F0F2' }}>
              {hasSlots ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <Clock size={13} strokeWidth={2} color="#6B6B6B" />
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#6B6B6B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Available times
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {slots.map(time => {
                      const active = selectedTime === time
                      return (
                        <motion.button
                          key={time}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleTimePress(time)}
                          style={{
                            padding: '8px 14px', borderRadius: 9999,
                            border: active ? `1.5px solid ${accentColour}` : '0.5px solid #DEDEDE',
                            backgroundColor: active ? accentBg : '#FFFFFF',
                            fontSize: 13, fontWeight: active ? 600 : 400,
                            color: active ? accentText : '#1A1A1A',
                            cursor: 'pointer', fontFamily: 'inherit',
                            transition: 'all 150ms ease-out',
                          }}
                        >
                          {time}
                        </motion.button>
                      )
                    })}
                  </div>
                  {selectedTime && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ fontSize: 12, color: '#0F6E56', margin: '10px 0 0', fontWeight: 500 }}
                    >
                      ✓ Appointment slot reserved at {clinicName}
                    </motion.p>
                  )}
                </>
              ) : (
                <div style={{
                  padding: '12px 14px', borderRadius: 10,
                  backgroundColor: '#FFF5E0', border: '0.5px solid #F5C870',
                }}>
                  <p style={{ fontSize: 12, color: '#854F0B', margin: 0, fontWeight: 500 }}>
                    No clinic slots on this date — reminder will be set without an appointment booking.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
