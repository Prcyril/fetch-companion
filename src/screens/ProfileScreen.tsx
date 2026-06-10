import { motion } from 'framer-motion'
import { pets, events } from '../data/mockData'
import { Shield, Bell, FileText, ChevronRight, Heart } from 'lucide-react'

const MENU_SECTIONS = [
  {
    title: 'Insurance',
    items: [
      { icon: Shield, label: 'View my policy', sub: 'Fetch · $30k annual cover' },
      { icon: FileText, label: 'Claims history', sub: '1 claim submitted' },
    ]
  },
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', sub: 'Reminders, updates' },
    ]
  },
]

export default function ProfileScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F7', paddingBottom: 32 }}
    >

      {/* Header */}
      <div style={{ padding: '56px 20px 24px' }}>
        <p style={{ fontSize: 13, color: '#6B6B6B', margin: '0 0 4px' }}>Your account</p>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 28, fontWeight: 700, color: '#1A1A1A',
          margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2,
        }}>
          Profile
        </h1>
      </div>

      {/* Pets summary card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: 16,
          border: '0.5px solid #DEDEDE', overflow: 'hidden',
        }}>
          <div style={{
            padding: '12px 16px 10px',
            borderBottom: '0.5px solid #F0F0F2',
          }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Your pets
            </p>
          </div>
          {pets.map((pet, i) => {
            const petEvents = events.filter(e => e.petId === pet.id)
            const lastEvent = petEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
            return (
              <div key={pet.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                borderBottom: i < pets.length - 1 ? '0.5px solid #F0F0F2' : 'none',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  backgroundColor: pet.colour,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}>
                  {pet.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', margin: '0 0 2px' }}>
                    {pet.name}
                  </p>
                  <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>
                    {pet.breed} · {petEvents.length} events recorded
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 11, color: '#6B6B6B', margin: '0 0 2px' }}>Last event</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#1A1A1A', margin: 0 }}>
                    {lastEvent ? new Date(lastEvent.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }) : '—'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Total events', value: events.length.toString() },
            { label: 'Pets insured', value: '2' },
            { label: 'Claims made', value: '1' },
            { label: 'Documents', value: `${events.reduce((acc, e) => acc + (e.attachments || 0), 0)}` },
          ].map(stat => (
            <div key={stat.label} style={{
              backgroundColor: '#FFFFFF', borderRadius: 12,
              border: '0.5px solid #DEDEDE', padding: '14px 16px',
            }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', margin: '0 0 2px', fontFamily: "'Fraunces', serif" }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu sections */}
      {MENU_SECTIONS.map(section => (
        <div key={section.title} style={{ padding: '0 20px 16px' }}>
          <p style={{
            fontSize: 11, fontWeight: 600, color: '#6B6B6B',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            margin: '0 0 8px', paddingLeft: 4,
          }}>
            {section.title}
          </p>
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: 16,
            border: '0.5px solid #DEDEDE', overflow: 'hidden',
          }}>
            {section.items.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '13px 16px', cursor: 'pointer',
                  borderBottom: i < section.items.length - 1 ? '0.5px solid #F0F0F2' : 'none',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    backgroundColor: '#F5F5F7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} strokeWidth={1.5} color="#1A1A1A" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A', margin: '0 0 1px' }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>
                      {item.sub}
                    </p>
                  </div>
                  <ChevronRight size={16} strokeWidth={1.5} color="#B0B0BF" />
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Built with love footer */}
      <div style={{
        padding: '8px 20px 0',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      }}>
        <Heart size={12} strokeWidth={1.5} color="#F279C5" />
        <p style={{ fontSize: 12, color: '#B0B0BF', margin: 0 }}>
          Built for Fetch · Fetch Companion concept
        </p>
      </div>

    </motion.div>
  )
}
