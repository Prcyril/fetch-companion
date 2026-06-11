import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { ChevronLeft, ShieldCheck, Calendar, DollarSign, Zap, Heart, Stethoscope, Pill, AlertTriangle } from 'lucide-react'
import CatWithPhone from '../../imports/Component1-5'
import FetchCTAButton from './FetchCTAButton'

const COVER_ITEMS = [
  { icon: Stethoscope, label: 'Vet consultations', detail: 'Covered up to annual limit' },
  { icon: AlertTriangle, label: 'Emergency care', detail: 'Accidents & sudden illness' },
  { icon: Pill, label: 'Medications', detail: 'Prescription drugs included' },
  { icon: Heart, label: 'Specialist referrals', detail: 'Specialist & specialist surgery' },
  { icon: Zap, label: 'Diagnostic testing', detail: 'X-rays, blood panels, imaging' },
]

export default function PolicyScreen() {
  const navigate = useNavigate()

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

      {/* Hero card */}
      <div style={{ padding: '8px 20px 20px' }}>
        <div style={{
          backgroundColor: '#050505',
          borderRadius: 24,
          padding: '24px 22px 0 22px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0px 0px 0px 1.5px rgba(255,255,255,0.08) inset',
          minHeight: 180,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
          <div style={{ paddingBottom: 24, flex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(177,255,158,0.15)', borderRadius: 20, padding: '4px 10px', marginBottom: 14 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#B1FF9E' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#B1FF9E', letterSpacing: '0.05em' }}>ACTIVE POLICY</span>
            </div>
            <h1 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 26, fontWeight: 700, color: '#FFFFFF',
              margin: '0 0 6px', lineHeight: 1.2, letterSpacing: '-0.02em',
            }}>
              Comprehensive<br />Pet Cover
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              Fetch Pet Insurance · Policy #FP-2208841
            </p>
          </div>
          <div style={{ width: 130, height: 120, overflow: 'hidden', position: 'relative', flexShrink: 0, marginRight: -8 }}>
            <div style={{ width: 180, height: 166, position: 'absolute', bottom: -10, right: -10 }}>
              <CatWithPhone />
            </div>
          </div>
        </div>
      </div>

      {/* Key stats */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: 'Annual cover', value: '$30k' },
            { label: 'Excess', value: '$100' },
            { label: 'Reimbursement', value: '80%' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: '#FFFFFF', borderRadius: 14, border: '0.5px solid #DEDEDE', padding: '14px 12px' }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: '#1A1A1A', margin: '0 0 3px' }}>{s.value}</p>
              <p style={{ fontSize: 11, color: '#6B6B6B', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Renewal */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: 16,
          border: '0.5px solid #DEDEDE', padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#F9E0F3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Calendar size={16} strokeWidth={1.5} color="#F279C5" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', margin: '0 0 2px' }}>Renews 1 Aug 2026</p>
            <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>$68.40 / month · Direct debit</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 11, color: '#6B6B6B', margin: '0 0 2px' }}>Next payment</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A', margin: 0 }}>1 Jul 2026</p>
          </div>
        </div>
      </div>

      {/* What's covered */}
      <div style={{ padding: '0 20px 20px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px', paddingLeft: 4 }}>
          What's covered
        </p>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, border: '0.5px solid #DEDEDE', overflow: 'hidden' }}>
          {COVER_ITEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
                borderBottom: i < COVER_ITEMS.length - 1 ? '0.5px solid #F0F0F2' : 'none',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: '#F5F5F7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={15} strokeWidth={1.5} color="#1A1A1A" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A', margin: '0 0 1px' }}>{item.label}</p>
                  <p style={{ fontSize: 11, color: '#6B6B6B', margin: 0 }}>{item.detail}</p>
                </div>
                <ShieldCheck size={14} strokeWidth={1.5} color="#1D9E75" />
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 20px' }}>
        <FetchCTAButton label="Manage on fetchpet.com.au" emoji="↗" size="md" onClick={() => {}} style={{ width: '100%', justifyContent: 'center' }} />
      </div>
    </motion.div>
  )
}
