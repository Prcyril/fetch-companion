import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, Stethoscope, Pill, Shield, Heart, Star, AlertTriangle, Check } from 'lucide-react'
import { pets } from './mockData'

const REMINDER_TYPES = [
  { id: 'vet',        label: 'Vet visit',   icon: Stethoscope,   bg: '#E1F5EE', colour: '#1D9E75', text: '#0F6E56' },
  { id: 'medication', label: 'Medication',  icon: Pill,          bg: '#FFF5E0', colour: '#E8A020', text: '#854F0B' },
  { id: 'insurance',  label: 'Insurance',   icon: Shield,        bg: '#EEF0F8', colour: '#5B8DEF', text: '#3A4A9A' },
  { id: 'wellness',   label: 'Wellness',    icon: Heart,         bg: '#F3EEFB', colour: '#9B72CF', text: '#6B3FA0' },
  { id: 'milestone',  label: 'Milestone',   icon: Star,          bg: '#F9E0F3', colour: '#F279C5', text: '#A0348A' },
  { id: 'emergency',  label: 'Emergency',   icon: AlertTriangle, bg: '#FCEAEA', colour: '#E05A5A', text: '#A03030' },
]

const RECURRING_OPTIONS = [
  { id: 'once',     label: 'One-time' },
  { id: 'monthly',  label: 'Monthly' },
  { id: 'annually', label: 'Annually' },
]

type Step = 'type' | 'details'

export default function AddReminderScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('type')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedPetId, setSelectedPetId] = useState(pets[0].id)
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [recurring, setRecurring] = useState('once')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const meta = REMINDER_TYPES.find(t => t.id === selectedType)
  const canSubmit = title.trim() && dueDate && selectedType

  function handleSubmit() {
    if (!canSubmit) return
    setSubmitted(true)
    setTimeout(() => navigate('/reminders'), 1800)
  }

  if (submitted) {
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
            backgroundColor: '#F9E0F3',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <Check size={32} strokeWidth={2.5} color="#F279C5" />
        </motion.div>
        <h2 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 24, fontWeight: 700, color: '#1A1A1A',
          margin: '0 0 8px', letterSpacing: '-0.01em',
        }}>
          Reminder set
        </h2>
        <p style={{ fontSize: 14, color: '#6B6B6B', margin: 0 }}>
          {title} added to {pets.find(p => p.id === selectedPetId)?.name}'s schedule
        </p>
      </motion.div>
    )
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#F5F5F7', paddingBottom: 32 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px 24px', gap: 12 }}>
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
            {step === 'type' ? 'What type of reminder?' : 'Reminder details'}
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

        {/* Step 1 — type selector */}
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
              {REMINDER_TYPES.map(type => {
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
                      border: selected ? `1.5px solid ${type.colour}` : '0.5px solid #DEDEDE',
                      borderRadius: 14, cursor: 'pointer',
                      transition: 'all 200ms ease-out',
                      fontFamily: 'inherit', textAlign: 'left', width: '100%',
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      backgroundColor: type.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={20} strokeWidth={1.5} color={type.colour} />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 500, color: selected ? type.text : '#1A1A1A' }}>
                      {type.label}
                    </span>
                    {selected && (
                      <div style={{
                        marginLeft: 'auto',
                        width: 20, height: 20, borderRadius: '50%',
                        backgroundColor: type.colour,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Check size={11} strokeWidth={3} color="white" />
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2 — details */}
        {step === 'details' && meta && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ padding: '0 20px' }}
          >
            {/* Type badge */}
            <div style={{ marginBottom: 20 }}>
              <span style={{
                fontSize: 12, fontWeight: 500,
                color: meta.text, backgroundColor: meta.bg,
                borderRadius: 9999, padding: '4px 12px',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                border: `1px solid ${meta.colour}33`,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: meta.colour }} />
                {meta.label}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              {/* Pet */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: '#6B6B6B', display: 'block', marginBottom: 6 }}>
                  For
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {pets.map(pet => {
                    const active = pet.id === selectedPetId
                    return (
                      <button
                        key={pet.id}
                        onClick={() => setSelectedPetId(pet.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '8px 14px', borderRadius: 9999,
                          border: active ? `1.5px solid ${meta.colour}` : '0.5px solid #DEDEDE',
                          backgroundColor: active ? meta.bg : '#FFFFFF',
                          cursor: 'pointer', fontFamily: 'inherit',
                          transition: 'all 200ms ease-out',
                        }}
                      >
                        <span style={{ fontSize: 15 }}>{pet.emoji}</span>
                        <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? meta.text : '#1A1A1A' }}>
                          {pet.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Title */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: '#6B6B6B', display: 'block', marginBottom: 6 }}>
                  Title
                </label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder={
                    selectedType === 'vet' ? 'e.g. Annual vaccination' :
                    selectedType === 'medication' ? 'e.g. Flea & tick treatment' :
                    selectedType === 'insurance' ? 'e.g. Policy renewal' :
                    'Reminder title'
                  }
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '12px 14px', borderRadius: 12,
                    border: title ? `1.5px solid ${meta.colour}` : '1px solid #DEDEDE',
                    fontSize: 15, color: '#1A1A1A', backgroundColor: '#FFFFFF',
                    outline: 'none', fontFamily: 'inherit',
                    transition: 'border 200ms ease-out',
                  }}
                />
              </div>

              {/* Due date */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: '#6B6B6B', display: 'block', marginBottom: 6 }}>
                  Due date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '12px 14px', borderRadius: 12,
                    border: dueDate ? `1.5px solid ${meta.colour}` : '1px solid #DEDEDE',
                    fontSize: 15, color: '#1A1A1A', backgroundColor: '#FFFFFF',
                    outline: 'none', fontFamily: 'inherit',
                    transition: 'border 200ms ease-out',
                  }}
                />
              </div>

              {/* Recurring */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: '#6B6B6B', display: 'block', marginBottom: 6 }}>
                  Repeats
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {RECURRING_OPTIONS.map(opt => {
                    const active = recurring === opt.id
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setRecurring(opt.id)}
                        style={{
                          padding: '7px 14px', borderRadius: 9999,
                          border: active ? `1.5px solid ${meta.colour}` : '0.5px solid #DEDEDE',
                          backgroundColor: active ? meta.bg : '#FFFFFF',
                          fontSize: 13, fontWeight: active ? 600 : 400,
                          color: active ? meta.text : '#6B6B6B',
                          cursor: 'pointer', fontFamily: 'inherit',
                          transition: 'all 200ms ease-out',
                        }}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: '#6B6B6B', display: 'block', marginBottom: 6 }}>
                  Notes <span style={{ color: '#B0B0BF', fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Any extra details, clinic name, instructions..."
                  rows={3}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '12px 14px', borderRadius: 12,
                    border: notes ? `1.5px solid ${meta.colour}` : '1px solid #DEDEDE',
                    fontSize: 14, color: '#1A1A1A', backgroundColor: '#FFFFFF',
                    outline: 'none', fontFamily: 'inherit',
                    resize: 'none', lineHeight: 1.6,
                    transition: 'border 200ms ease-out',
                  }}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                style={{
                  width: '100%', marginTop: 8, padding: '14px',
                  backgroundColor: canSubmit ? '#1A1A1A' : '#DEDEDE',
                  color: canSubmit ? '#FFFFFF' : '#B0B0BF',
                  border: 'none', borderRadius: 9999,
                  fontSize: 15, fontWeight: 500,
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit',
                  transition: 'all 200ms ease-out',
                }}
              >
                Save reminder
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
