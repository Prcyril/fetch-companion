import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { ChevronLeft, Bell, Calendar, Shield, Heart, Zap } from 'lucide-react'

interface ToggleProps { on: boolean; onChange: () => void }
function Toggle({ on, onChange }: ToggleProps) {
  return (
    <motion.button
      onClick={onChange}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
      style={{
        width: 44, height: 26, borderRadius: 13,
        backgroundColor: on ? '#F279C5' : '#D1D1D6',
        border: 'none', cursor: 'pointer', padding: 3,
        display: 'flex', alignItems: 'center',
        justifyContent: on ? 'flex-end' : 'flex-start',
        flexShrink: 0,
        transition: 'background-color 200ms ease',
      }}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
      />
    </motion.button>
  )
}

const SECTIONS = [
  {
    title: 'Reminders',
    items: [
      { id: 'vet', icon: Calendar, label: 'Vet & health reminders', sub: 'Upcoming appointments & checkups', defaultOn: true },
      { id: 'med', icon: Heart, label: 'Medication reminders', sub: 'Daily & recurring medications', defaultOn: true },
      { id: 'insurance', icon: Shield, label: 'Insurance reminders', sub: 'Renewal dates & policy updates', defaultOn: true },
    ]
  },
  {
    title: 'Updates',
    items: [
      { id: 'claims', icon: Zap, label: 'Claims status updates', sub: 'When your claim is processed', defaultOn: true },
      { id: 'tips', icon: Bell, label: 'Health tips & insights', sub: 'Personalised advice for your pets', defaultOn: false },
      { id: 'promo', icon: Bell, label: 'Fetch offers & news', sub: 'Promotions and product updates', defaultOn: false },
    ]
  },
]

export default function NotificationsScreen() {
  const navigate = useNavigate()
  const [prefs, setPrefs] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    SECTIONS.forEach(s => s.items.forEach(item => { init[item.id] = item.defaultOn }))
    return init
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 32 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F7', paddingBottom: 32 }}
    >
      {/* Header */}
      <div style={{ padding: '16px 20px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <motion.button
          whileTap={{ scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          onClick={() => navigate('/profile')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#F279C5' }}
        >
          <ChevronLeft size={20} strokeWidth={2} />
          <span style={{ fontSize: 14, fontWeight: 500 }}>Profile</span>
        </motion.button>
      </div>

      <div style={{ padding: '8px 20px 24px' }}>
        <p style={{ fontSize: 13, color: '#6B6B6B', margin: '0 0 4px' }}>Preferences</p>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 28, fontWeight: 700, color: '#1A1A1A',
          margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2,
        }}>
          Notifications
        </h1>
      </div>

      {SECTIONS.map(section => (
        <div key={section.title} style={{ padding: '0 20px 20px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px', paddingLeft: 4 }}>
            {section.title}
          </p>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, border: '0.5px solid #DEDEDE', overflow: 'hidden' }}>
            {section.items.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={item.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                  borderBottom: i < section.items.length - 1 ? '0.5px solid #F0F0F2' : 'none',
                }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: '#F5F5F7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} strokeWidth={1.5} color="#1A1A1A" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A', margin: '0 0 2px' }}>{item.label}</p>
                    <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>{item.sub}</p>
                  </div>
                  <Toggle on={prefs[item.id]} onChange={() => setPrefs(p => ({ ...p, [item.id]: !p[item.id] }))} />
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </motion.div>
  )
}
