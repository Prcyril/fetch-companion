import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'

import { ChevronLeft, Stethoscope, Pill, Shield, Heart, Star, AlertTriangle } from 'lucide-react'

const EVENT_TYPES = [
  { id: 'vet',        label: 'Vet visit',   icon: Stethoscope,   bg: '#E1F5EE', dot: '#1D9E75', text: '#0F6E56' },
  { id: 'medication', label: 'Medication',  icon: Pill,          bg: '#FFF5E0', dot: '#E8A020', text: '#854F0B' },
  { id: 'insurance',  label: 'Insurance',   icon: Shield,        bg: '#EEF0F8', dot: '#5B8DEF', text: '#3A4A9A' },
  { id: 'wellness',   label: 'Wellness',    icon: Heart,         bg: '#F3EEFB', dot: '#9B72CF', text: '#6B3FA0' },
  { id: 'milestone',  label: 'Milestone',   icon: Star,          bg: '#F9E0F3', dot: '#F279C5', text: '#A0348A' },
  { id: 'emergency',  label: 'Emergency',   icon: AlertTriangle, bg: '#FCEAEA', dot: '#E05A5A', text: '#A03030' },
]

type Step = 'type' | 'details'

export default function AddEventScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('type')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [clinic, setClinic] = useState('')
  const [notes, setNotes] = useState('')

  const selectedMeta = EVENT_TYPES.find(t => t.id === selectedType)

  function handleSubmit() {
    if (!title || !date || !selectedType) return
    const isMilestone = selectedType === 'milestone'
    navigate('/timeline', {
      state: {
        toast: {
          title: title ? `${title} added` : `${selectedMeta?.label} added`,
          subtitle: "Bruno's timeline · just now",
          variant: isMilestone ? 'milestone' : 'default',
        }
      }
    })
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F7', paddingBottom: 32 }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '16px 20px 24px', gap: 12,
      }}>
        <button
          onClick={() => step === 'details' ? setStep('type') : navigate(-1)}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            backgroundColor: '#1A1A1A', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <ChevronLeft size={18} strokeWidth={1.5} color="#FFFFFF" />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, color: '#6B6B6B', margin: '0 0 2px' }}>
            {step === 'type' ? 'Step 1 of 2' : 'Step 2 of 2'}
          </p>
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 22, fontWeight: 700, color: '#1A1A1A',
            margin: 0, letterSpacing: '-0.01em',
          }}>
            {step === 'type' ? 'What happened?' : `${selectedMeta?.label} details`}
          </h1>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ height: 3, backgroundColor: '#DEDEDE', borderRadius: 9999 }}>
          <motion.div
            animate={{ width: step === 'type' ? '50%' : '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ height: '100%', backgroundColor: '#F279C5', borderRadius: 9999 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* Step 1 — event type selector */}
        {step === 'type' && (
          <motion.div
            key="type"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ padding: '0 20px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {EVENT_TYPES.map(type => {
                const Icon = type.icon
                const selected = selectedType === type.id
                return (
                  <motion.button
                    key={type.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedType(type.id)
                      setTimeout(() => setStep('details'), 150)
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 16px',
                      backgroundColor: selected ? type.bg : '#FFFFFF',
                      border: selected ? `1.5px solid ${type.dot}` : '0.5px solid #DEDEDE',
                      borderRadius: 14, cursor: 'pointer',
                      transition: 'all 200ms ease-out',
                      fontFamily: 'inherit', textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      backgroundColor: type.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={20} strokeWidth={1.5} color={type.dot} />
                    </div>
                    <span style={{
                      fontSize: 15, fontWeight: 500,
                      color: selected ? type.text : '#1A1A1A',
                    }}>
                      {type.label}
                    </span>
                    {selected && (
                      <div style={{
                        marginLeft: 'auto',
                        width: 20, height: 20, borderRadius: '50%',
                        backgroundColor: type.dot,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{ color: 'white', fontSize: 11 }}>✓</span>
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2 — details form */}
        {step === 'details' && selectedMeta && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ padding: '0 20px' }}
          >
            <div style={{ marginBottom: 20 }}>
              <span style={{
                fontSize: 12, fontWeight: 500,
                color: selectedMeta.text, backgroundColor: selectedMeta.bg,
                borderRadius: 9999, padding: '4px 12px',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                border: `1px solid ${selectedMeta.dot}33`,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: selectedMeta.dot }} />
                {selectedMeta.label}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: '#6B6B6B', display: 'block', marginBottom: 6 }}>
                  Title
                </label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder={
                    selectedType === 'vet' ? 'e.g. Annual check-up' :
                    selectedType === 'medication' ? 'e.g. Started NexGard' :
                    selectedType === 'milestone' ? 'e.g. First birthday' :
                    'Event title'
                  }
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '12px 14px', borderRadius: 12,
                    border: title ? '1.5px solid #F279C5' : '1px solid #DEDEDE',
                    fontSize: 15, color: '#1A1A1A', backgroundColor: '#FFFFFF',
                    outline: 'none', fontFamily: 'inherit',
                    transition: 'border 200ms ease-out',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: '#6B6B6B', display: 'block', marginBottom: 6 }}>
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '12px 14px', borderRadius: 12,
                    border: '1px solid #DEDEDE',
                    fontSize: 15, color: '#1A1A1A', backgroundColor: '#FFFFFF',
                    outline: 'none', fontFamily: 'inherit',
                  }}
                />
              </div>

              {['vet', 'wellness', 'emergency'].includes(selectedType!) && (
                <div>
                  <label style={{ fontSize: 11, fontWeight: 500, color: '#6B6B6B', display: 'block', marginBottom: 6 }}>
                    Clinic <span style={{ color: '#B0B0BF', fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    value={clinic}
                    onChange={e => setClinic(e.target.value)}
                    placeholder="e.g. City Road Animal Hospital"
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      padding: '12px 14px', borderRadius: 12,
                      border: clinic ? '1.5px solid #F279C5' : '1px solid #DEDEDE',
                      fontSize: 15, color: '#1A1A1A', backgroundColor: '#FFFFFF',
                      outline: 'none', fontFamily: 'inherit',
                      transition: 'border 200ms ease-out',
                    }}
                  />
                </div>
              )}

              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: '#6B6B6B', display: 'block', marginBottom: 6 }}>
                  Notes <span style={{ color: '#B0B0BF', fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="What happened? Any observations, weight, test results..."
                  rows={4}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '12px 14px', borderRadius: 12,
                    border: notes ? '1.5px solid #F279C5' : '1px solid #DEDEDE',
                    fontSize: 14, color: '#1A1A1A', backgroundColor: '#FFFFFF',
                    outline: 'none', fontFamily: 'inherit',
                    resize: 'none', lineHeight: 1.6,
                    transition: 'border 200ms ease-out',
                  }}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!title || !date}
                style={{
                  width: '100%', marginTop: 8,
                  padding: '14px',
                  backgroundColor: title && date ? '#1A1A1A' : '#DEDEDE',
                  color: title && date ? '#FFFFFF' : '#B0B0BF',
                  border: 'none', borderRadius: 9999,
                  fontSize: 15, fontWeight: 500,
                  cursor: title && date ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit',
                  transition: 'all 200ms ease-out',
                }}
              >
                Save event
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
