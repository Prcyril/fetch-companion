import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { ChevronLeft, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import FetchCTAButton from './FetchCTAButton'
import FlyingMoney from '../../imports/Component1-3'

const CLAIMS = [
  {
    id: 'cl1',
    title: 'Emergency — swallowed sock',
    date: '3 Nov 2022',
    resolvedDate: '10 Nov 2022',
    pet: 'Bruno',
    amount: 1050,
    reimbursed: 840,
    status: 'approved',
    clinic: 'Sydney Animal Emergency',
    description: 'Emergency induced vomiting and overnight monitoring after Bruno swallowed a sock. Claim processed within 7 days.',
  },
]

const STATUS_CONFIG = {
  approved: { label: 'Approved', color: '#1D9E75', bg: '#E1F5EE', icon: CheckCircle },
  pending:  { label: 'In review', color: '#E8A020', bg: '#FFF5E0', icon: Clock },
  rejected: { label: 'Not covered', color: '#E05A5A', bg: '#FCEAEA', icon: AlertCircle },
}

export default function ClaimsScreen() {
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

      <div style={{ padding: '8px 20px 24px' }}>
        <p style={{ fontSize: 13, color: '#6B6B6B', margin: '0 0 4px' }}>Insurance</p>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 28, fontWeight: 700, color: '#1A1A1A',
          margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2,
        }}>
          Claims history
        </h1>
      </div>

      {/* Summary stats */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          backgroundColor: '#050505', borderRadius: 20,
          padding: '18px 18px 0 18px',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          overflow: 'hidden', position: 'relative',
          boxShadow: '0px 0px 0px 1.5px rgba(255,255,255,0.08) inset',
        }}>
          <div style={{ paddingBottom: 18 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#B1FF9E', margin: '0 0 10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Claims summary
            </p>
            <div style={{ display: 'flex', gap: 24 }}>
              <div>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: '#FFFFFF', margin: '0 0 2px' }}>1</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Total claims</p>
              </div>
              <div>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: '#B1FF9E', margin: '0 0 2px' }}>$840</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>Reimbursed</p>
              </div>
            </div>
          </div>
          <div style={{ width: 100, height: 70, position: 'relative', flexShrink: 0, marginRight: -6 }}>
            <div style={{ width: 130, height: 90, position: 'absolute', bottom: -6, right: -8 }}>
              <FlyingMoney />
            </div>
          </div>
        </div>
      </div>

      {/* Claims list */}
      <div style={{ padding: '0 20px 20px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px', paddingLeft: 4 }}>
          Your claims
        </p>
        {CLAIMS.map(claim => {
          const status = STATUS_CONFIG[claim.status as keyof typeof STATUS_CONFIG]
          const StatusIcon = status.icon
          return (
            <div key={claim.id} style={{
              backgroundColor: '#FFFFFF', borderRadius: 16,
              border: '0.5px solid #DEDEDE', overflow: 'hidden', marginBottom: 12,
            }}>
              {/* Claim header */}
              <div style={{ padding: '16px 16px 14px', borderBottom: '0.5px solid #F0F0F2' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', margin: '0 0 4px' }}>{claim.title}</p>
                    <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>{claim.clinic} · {claim.date}</p>
                  </div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    backgroundColor: status.bg, borderRadius: 20, padding: '4px 10px', flexShrink: 0,
                  }}>
                    <StatusIcon size={11} strokeWidth={2} color={status.color} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: status.color }}>{status.label}</span>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0, lineHeight: 1.5 }}>{claim.description}</p>
              </div>

              {/* Amount breakdown */}
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>Vet invoice</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#1A1A1A', margin: 0 }}>${claim.amount.toLocaleString()}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>Excess applied</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#1A1A1A', margin: 0 }}>−$100</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '0.5px solid #F0F0F2' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', margin: 0 }}>You received</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#1D9E75', margin: 0 }}>${claim.reimbursed.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* New claim CTA */}
      <div style={{ padding: '0 20px' }}>
        <p style={{ fontSize: 12, color: '#6B6B6B', textAlign: 'center', margin: '0 0 14px' }}>
          Had a recent vet visit? Lodge a new claim in minutes.
        </p>
        <FetchCTAButton label="Lodge a claim" emoji="📋" size="md" onClick={() => {}} style={{ width: '100%', justifyContent: 'center' }} />
      </div>
    </motion.div>
  )
}
