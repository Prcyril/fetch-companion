import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { pets, events } from './mockData'
import { Shield, Bell, FileText, ChevronRight, Heart, User, HelpCircle, LogOut, Star } from 'lucide-react'
import FetchMascot from './FetchMascot'

interface MenuRow {
  icon: typeof Shield
  label: string
  sub: string
  route?: string
  accent?: boolean
  destructive?: boolean
}

const MENU_SECTIONS: { title: string; items: MenuRow[] }[] = [
  {
    title: 'Insurance',
    items: [
      { icon: Shield,    label: 'View my policy',  sub: 'Fetch · $30k annual cover', route: '/policy' },
      { icon: FileText,  label: 'Claims history',  sub: '1 claim · $840 reimbursed', route: '/claims' },
    ]
  },
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', sub: 'Reminders, updates', route: '/notifications' },
    ]
  },
  {
    title: 'Account',
    items: [
      { icon: User,        label: 'Personal details', sub: 'Name, email, password' },
      { icon: HelpCircle,  label: 'Help & support',   sub: 'FAQs, contact Fetch' },
      { icon: Star,        label: 'Rate Fetch',        sub: 'Leave a review on the App Store' },
      { icon: LogOut,      label: 'Sign out',          sub: '', destructive: true },
    ]
  },
]

export default function ProfileScreen() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F7', paddingBottom: 32 }}
    >
      {/* Hero header */}
      <div style={{
        backgroundColor: '#050505',
        padding: '28px 20px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Mascot watermark */}
        <div style={{ position: 'absolute', right: -16, bottom: -20, opacity: 0.13, pointerEvents: 'none' }}>
          <FetchMascot variant="pink-lg" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18,
            background: 'linear-gradient(135deg, #F279C5 0%, #FDA5FF 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 0 0 2px rgba(255,255,255,0.12)',
          }}>
            <span style={{ fontSize: 24 }}>👤</span>
          </div>
          <div>
            <h1 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 22, fontWeight: 700, color: '#FFFFFF',
              margin: '0 0 3px', letterSpacing: '-0.02em',
            }}>
              Alex Johnson
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              alex@example.com
            </p>
          </div>
        </div>

        {/* Pets pills */}
        <div style={{ display: 'flex', gap: 8 }}>
          {pets.map(pet => (
            <div key={pet.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '0.5px solid rgba(255,255,255,0.12)',
              borderRadius: 20, padding: '5px 10px 5px 7px',
            }}>
              <span style={{ fontSize: 14 }}>{pet.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.75)' }}>{pet.name}</span>
            </div>
          ))}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            backgroundColor: 'rgba(177,255,158,0.12)',
            border: '0.5px solid rgba(177,255,158,0.2)',
            borderRadius: 20, padding: '5px 10px',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#B1FF9E' }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: '#B1FF9E' }}>Insured</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '16px 20px 4px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: 'Events', value: events.length.toString() },
            { label: 'Claims', value: '1' },
            { label: 'Docs', value: `${events.reduce((a, e) => a + (e.attachments || 0), 0)}` },
          ].map(stat => (
            <div key={stat.label} style={{
              backgroundColor: '#FFFFFF', borderRadius: 14,
              border: '0.5px solid #DEDEDE', padding: '14px 12px',
            }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: '#1A1A1A', margin: '0 0 3px' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 11, color: '#6B6B6B', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu sections */}
      {MENU_SECTIONS.map(section => (
        <div key={section.title} style={{ padding: '16px 20px 0' }}>
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
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.98, backgroundColor: '#F5F5F7' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  onClick={() => item.route && navigate(item.route)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '13px 16px', cursor: item.route ? 'pointer' : 'default',
                    borderBottom: i < section.items.length - 1 ? '0.5px solid #F0F0F2' : 'none',
                    background: 'none', border: 'none',
                    borderBottomWidth: i < section.items.length - 1 ? 0.5 : 0,
                    borderBottomStyle: 'solid', borderBottomColor: '#F0F0F2',
                    width: '100%', textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    backgroundColor: item.destructive ? '#FCEAEA' : '#F5F5F7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} strokeWidth={1.5} color={item.destructive ? '#E05A5A' : '#1A1A1A'} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: item.destructive ? '#E05A5A' : '#1A1A1A', margin: item.sub ? '0 0 1px' : 0 }}>
                      {item.label}
                    </p>
                    {item.sub ? (
                      <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>{item.sub}</p>
                    ) : null}
                  </div>
                  {item.route && <ChevronRight size={16} strokeWidth={1.5} color="#B0B0BF" />}
                </motion.button>
              )
            })}
          </div>
        </div>
      ))}

      <div style={{
        padding: '24px 20px 0',
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
