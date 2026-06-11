import { useParams, useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { ChevronLeft, Paperclip, MapPin, Calendar, Sparkles } from 'lucide-react'
import { events, pets } from './mockData'

const EVENT_META: Record<string, { bg: string; dot: string; text: string; label: string }> = {
  vet:        { bg: '#E1F5EE', dot: '#1D9E75', text: '#0F6E56', label: 'Vet visit' },
  medication: { bg: '#FFF5E0', dot: '#E8A020', text: '#854F0B', label: 'Medication' },
  insurance:  { bg: '#EEF0F8', dot: '#5B8DEF', text: '#3A4A9A', label: 'Insurance' },
  wellness:   { bg: '#F3EEFB', dot: '#9B72CF', text: '#6B3FA0', label: 'Wellness' },
  milestone:  { bg: '#F9E0F3', dot: '#F279C5', text: '#A0348A', label: 'Milestone' },
  emergency:  { bg: '#FCEAEA', dot: '#E05A5A', text: '#A03030', label: 'Emergency' },
}

export default function EventDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const event = events.find(e => e.id === id)

  if (!event) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F7' }}>
        <p style={{ fontSize: 14, color: '#6B6B6B' }}>Event not found</p>
      </div>
    )
  }

  const meta = EVENT_META[event.type]
  const pet = pets.find(p => p.id === event.petId)
  const formattedDate = new Date(event.date).toLocaleDateString('en-AU', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F7', paddingBottom: 32 }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '16px 20px 20px', gap: 12,
      }}>
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
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: meta.dot }} />
          {meta.label}
        </span>
      </div>

      <div style={{ padding: '0 20px' }}>

        {/* Title card */}
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: 16,
          border: '0.5px solid #DEDEDE', padding: '20px',
          marginBottom: 12,
        }}>
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 24, fontWeight: 700, color: '#1A1A1A',
            margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.2,
          }}>
            {event.title}
          </h1>

          {/* Meta rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Calendar size={16} strokeWidth={1.5} color="#6B6B6B" />
              <span style={{ fontSize: 13, color: '#1A1A1A' }}>{formattedDate}</span>
            </div>

            {event.clinic && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <MapPin size={16} strokeWidth={1.5} color="#6B6B6B" />
                <span style={{ fontSize: 13, color: '#1A1A1A' }}>{event.clinic}</span>
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
        {event.notes && (
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: 16,
            border: '0.5px solid #DEDEDE', padding: '16px 20px',
            marginBottom: 12,
          }}>
            <p style={{
              fontSize: 11, fontWeight: 600, color: '#6B6B6B',
              textTransform: 'uppercase', letterSpacing: '0.06em',
              margin: '0 0 10px',
            }}>
              Notes
            </p>
            <p style={{ fontSize: 14, color: '#1A1A1A', margin: 0, lineHeight: 1.6 }}>
              {event.notes}
            </p>
          </div>
        )}

        {/* Attachments */}
        {event.attachments && (
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: 16,
            border: '0.5px solid #DEDEDE', padding: '16px 20px',
            marginBottom: 20,
          }}>
            <p style={{
              fontSize: 11, fontWeight: 600, color: '#6B6B6B',
              textTransform: 'uppercase', letterSpacing: '0.06em',
              margin: '0 0 12px',
            }}>
              Documents
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {Array.from({ length: event.attachments }).map((_, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px',
                  backgroundColor: '#F5F5F7', borderRadius: 10,
                }}>
                  <Paperclip size={14} strokeWidth={1.5} color="#6B6B6B" />
                  <span style={{ fontSize: 13, color: '#1A1A1A', flex: 1 }}>
                    Document {i + 1}.pdf
                  </span>
                  <span style={{ fontSize: 11, color: '#6B6B6B' }}>View</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ask AI button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const dateStr = new Date(event.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
            const questionMap: Record<string, string> = {
              vet: `Summarise Bruno's ${event.title.toLowerCase()} on ${dateStr}`,
              medication: `Tell me about Bruno's ${event.title.toLowerCase()} starting ${dateStr}`,
              insurance: `What happened with Bruno's insurance on ${dateStr}?`,
              wellness: `Tell me about Bruno's ${event.title.toLowerCase()} on ${dateStr}`,
              milestone: `Tell me about Bruno's milestone — ${event.title} on ${dateStr}`,
              emergency: `What happened in Bruno's emergency on ${dateStr}?`,
            }
            const prefilledQuestion = questionMap[event.type] ?? `Tell me about Bruno's ${event.title} on ${dateStr}`
            navigate('/insights', { state: { prefilledQuestion } })
          }}
          style={{
            width: '100%', marginBottom: 10, padding: '14px',
            backgroundColor: 'transparent', color: '#1A1A1A',
            border: '1px solid #DEDEDE', borderRadius: 9999,
            fontSize: 15, fontWeight: 500,
            cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <Sparkles size={16} strokeWidth={1.5} color="#F279C5" />
          Ask AI about this event
        </motion.button>

      </div>
    </motion.div>
  )
}
