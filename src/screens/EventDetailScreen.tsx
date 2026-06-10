import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, MapPin, Calendar, FileText, Paperclip, ArrowRight } from 'lucide-react'
import { events, pets } from '../data/mockData'
import type { TimelineEvent } from '../types/index'

const EVENT_META: Record<string, { bg: string; dot: string; text: string; label: string }> = {
  vet:        { bg: '#E1F5EE', dot: '#1D9E75', text: '#0F6E56', label: 'Vet visit' },
  medication: { bg: '#FFF5E0', dot: '#E8A020', text: '#854F0B', label: 'Medication' },
  insurance:  { bg: '#EEF0F8', dot: '#5B8DEF', text: '#3A4A9A', label: 'Insurance' },
  wellness:   { bg: '#F3EEFB', dot: '#9B72CF', text: '#6B3FA0', label: 'Wellness' },
  milestone:  { bg: '#F9E0F3', dot: '#F279C5', text: '#A0348A', label: 'Milestone' },
  emergency:  { bg: '#FCEAEA', dot: '#E05A5A', text: '#A03030', label: 'Emergency' },
}

function formatFullDate(date: string): string {
  return new Date(date).toLocaleDateString('en-AU', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
}

function getRelatedEvents(event: TimelineEvent): TimelineEvent[] {
  return events
    .filter(e => e.petId === event.petId && e.id !== event.id)
    .sort((a, b) =>
      Math.abs(new Date(a.date).getTime() - new Date(event.date).getTime()) -
      Math.abs(new Date(b.date).getTime() - new Date(event.date).getTime())
    )
    .slice(0, 3)
}

export default function EventDetailScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = events.find(e => e.id === id)

  if (!event) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 20 }}>
        <p style={{ fontSize: 32 }}>🐾</p>
        <p style={{ fontSize: 15, fontWeight: 500, color: '#1A1A1A', margin: 0 }}>Event not found</p>
        <button onClick={() => navigate('/timeline')} style={{
          marginTop: 8, padding: '12px 24px', borderRadius: 9999,
          backgroundColor: '#1A1A1A', color: 'white',
          border: 'none', fontSize: 14, fontWeight: 500,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Back to timeline
        </button>
      </div>
    )
  }

  const meta = EVENT_META[event.type]
  const pet = pets.find(p => p.id === event.petId)
  const related = getRelatedEvents(event)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F7', paddingBottom: 32 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: '56px 20px 16px', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{
          width: 36, height: 36, borderRadius: '50%',
          backgroundColor: '#FFFFFF', border: '0.5px solid #DEDEDE',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0,
        }}>
          <ChevronLeft size={18} strokeWidth={1.5} color="#1A1A1A" />
        </button>
        <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>{pet?.name}'s timeline</p>
      </div>

      {/* Hero — white card with coloured left border */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: 16,
          border: '0.5px solid #DEDEDE',
          borderLeft: `4px solid ${meta.dot}`,
          padding: '20px',
        }}>
          <span style={{
            fontSize: 11, fontWeight: 500,
            color: meta.text, backgroundColor: meta.bg,
            borderRadius: 9999, padding: '3px 10px',
            display: 'inline-block', marginBottom: 10,
          }}>
            {meta.label}
          </span>
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 24, fontWeight: 700, color: '#1A1A1A',
            margin: '0 0 8px', letterSpacing: '-0.01em', lineHeight: 1.2,
          }}>
            {event.title}
          </h1>
          <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>
            {formatFullDate(event.date)}
          </p>
        </div>
      </div>

      {/* Details */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, border: '0.5px solid #DEDEDE', overflow: 'hidden' }}>
          {event.clinic && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '0.5px solid #F0F0F2' }}>
              <MapPin size={16} strokeWidth={1.5} color="#6B6B6B" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 11, color: '#6B6B6B', margin: '0 0 2px', fontWeight: 500 }}>Clinic</p>
                <p style={{ fontSize: 14, color: '#1A1A1A', margin: 0, fontWeight: 500 }}>{event.clinic}</p>
              </div>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: event.notes ? '0.5px solid #F0F0F2' : 'none' }}>
            <Calendar size={16} strokeWidth={1.5} color="#6B6B6B" style={{ flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 11, color: '#6B6B6B', margin: '0 0 2px', fontWeight: 500 }}>Date</p>
              <p style={{ fontSize: 14, color: '#1A1A1A', margin: 0, fontWeight: 500 }}>
                {new Date(event.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          {event.notes && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px' }}>
              <FileText size={16} strokeWidth={1.5} color="#6B6B6B" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontSize: 11, color: '#6B6B6B', margin: '0 0 6px', fontWeight: 500 }}>Notes</p>
                <p style={{ fontSize: 14, color: '#1A1A1A', margin: 0, lineHeight: 1.6 }}>{event.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Documents */}
      {event.attachments && (
        <div style={{ padding: '0 20px 16px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', margin: '0 0 10px' }}>Documents</p>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, border: '0.5px solid #DEDEDE', overflow: 'hidden' }}>
            {Array.from({ length: event.attachments }).map((_, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', cursor: 'pointer',
                borderBottom: i < event.attachments! - 1 ? '0.5px solid #F0F0F2' : 'none',
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  backgroundColor: '#F5F5F7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Paperclip size={14} strokeWidth={1.5} color="#6B6B6B" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A', margin: 0 }}>
                    {event.type === 'vet' ? 'Vet report' : 'Document'} {i + 1}.pdf
                  </p>
                  <p style={{ fontSize: 11, color: '#6B6B6B', margin: 0 }}>PDF</p>
                </div>
                <ArrowRight size={14} strokeWidth={1.5} color="#B0B0BF" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nearby events */}
      {related.length > 0 && (
        <div style={{ padding: '0 20px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', margin: '0 0 10px' }}>Nearby events</p>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, border: '0.5px solid #DEDEDE', overflow: 'hidden' }}>
            {related.map((rel, i) => {
              const relMeta = EVENT_META[rel.type]
              return (
                <motion.div
                  key={rel.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/event/${rel.id}`)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px', cursor: 'pointer',
                    borderBottom: i < related.length - 1 ? '0.5px solid #F0F0F2' : 'none',
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: relMeta.dot, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A', margin: '0 0 1px' }}>{rel.title}</p>
                    <p style={{ fontSize: 11, color: '#6B6B6B', margin: 0 }}>
                      {new Date(rel.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 500,
                    color: relMeta.text, backgroundColor: relMeta.bg,
                    borderRadius: 9999, padding: '3px 8px', whiteSpace: 'nowrap',
                  }}>
                    {relMeta.label}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </motion.div>
  )
}
