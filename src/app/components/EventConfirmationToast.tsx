import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'

export type ToastVariant = 'default' | 'milestone'

export interface ToastData {
  title: string
  subtitle?: string
  variant?: ToastVariant
}

interface EventConfirmationToastProps {
  toast: ToastData | null
  onDismiss: () => void
}

export default function EventConfirmationToast({ toast, onDismiss }: EventConfirmationToastProps) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onDismiss, 3500)
    return () => clearTimeout(t)
  }, [toast, onDismiss])

  const isMilestone = toast?.variant === 'milestone'

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key="toast"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          style={{
            margin: '0 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: 14,
            border: '0.5px solid #DEDEDE',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {/* Animated checkmark circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ flexShrink: 0, width: 28, height: 28 }}
          >
            {isMilestone ? (
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                backgroundColor: '#F9E0F3',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14,
              }}>
                <span style={{ color: '#F279C5', lineHeight: 1 }}>⭐</span>
              </div>
            ) : (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <motion.circle
                  cx="14" cy="14" r="13"
                  fill="#E1F5EE"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ transformOrigin: '14px 14px' }}
                />
                <motion.path
                  d="M8.5 14.5 L12.5 18.5 L19.5 10.5"
                  stroke="#1D9E75"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ pathLength: { delay: 0.15, duration: 0.35, ease: 'easeOut' }, opacity: { delay: 0.15, duration: 0.1 } }}
                />
              </svg>
            )}
          </motion.div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.3 }}>
              {toast.title}
            </p>
            <p style={{ margin: '2px 0 0', fontSize: 11, color: '#6B6B6B', lineHeight: 1.3 }}>
              {toast.subtitle ?? "Bruno's timeline · just now"}
            </p>
          </div>

          {/* Dismiss */}
          <button
            onClick={onDismiss}
            style={{
              background: 'none',
              border: 'none',
              padding: 4,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: '#B0B0BF',
            }}
          >
            <X size={14} strokeWidth={2} color="#B0B0BF" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
