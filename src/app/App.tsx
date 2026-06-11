import React, { useState, useCallback, useEffect } from 'react'
import { MemoryRouter, Routes, Route, useLocation, useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { X, CalendarPlus, ClipboardList } from 'lucide-react'
import MobileShell from './components/MobileShell'
import NavBar from './components/NavBar'
import HomeScreen from './components/HomeScreen'
import TimelineScreen from './components/TimelineScreen'
import EventDetailScreen from './components/EventDetailScreen'
import AddEventScreen from './components/AddEventScreen'
import ProfileScreen from './components/ProfileScreen'
import InsightsScreen from './components/InsightsScreen'
import RemindersScreen from './components/RemindersScreen'
import ReminderDetailScreen from './components/ReminderDetailScreen'
import AddReminderScreen from './components/AddReminderScreen'
import PolicyScreen from './components/PolicyScreen'
import ClaimsScreen from './components/ClaimsScreen'
import NotificationsScreen from './components/NotificationsScreen'
import EventConfirmationToast, { ToastData } from './components/EventConfirmationToast'

// Approximate NavBar height so the toast anchors above it
const NAV_HEIGHT = 64

function ToastAnchor({ navHeight, children }: { navHeight: number; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'absolute',
      left: 0, right: 0,
      bottom: navHeight + 16,
      zIndex: 80,
      pointerEvents: 'none',
    }}>
      <div style={{ pointerEvents: 'auto' }}>{children}</div>
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/timeline" element={<TimelineScreen />} />
        <Route path="/event/:id" element={<EventDetailScreen />} />
        <Route path="/add" element={<AddEventScreen />} />
        <Route path="/insights" element={<InsightsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/reminders" element={<RemindersScreen />} />
        <Route path="/reminder/:id" element={<ReminderDetailScreen />} />
        <Route path="/add-reminder" element={<AddReminderScreen />} />
        <Route path="/policy" element={<PolicyScreen />} />
        <Route path="/claims" element={<ClaimsScreen />} />
        <Route path="/notifications" element={<NotificationsScreen />} />
      </Routes>
    </AnimatePresence>
  )
}

function AppShell() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [activeToast, setActiveToast] = useState<ToastData | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Pick up toast payload delivered via location state
  useEffect(() => {
    const state = location.state as { toast?: ToastData } | null
    if (state?.toast) {
      setActiveToast(state.toast)
      // Clear the state so revisiting doesn't re-trigger
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.key])

  const dismissToast = useCallback(() => setActiveToast(null), [])

  function go(path: string) {
    setSheetOpen(false)
    navigate(path)
  }

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Backdrop */}
      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setSheetOpen(false)}
            style={{
              position: 'absolute', inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 60,
              borderRadius: 'inherit',
            }}
          />
        )}
      </AnimatePresence>

      {/* Bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            style={{
              position: 'absolute', left: 0, right: 0, bottom: 0,
              backgroundColor: '#FFFFFF',
              borderRadius: '20px 20px 0 0',
              padding: '12px 20px 24px',
              zIndex: 70,
            }}
          >
            <div style={{
              width: 36, height: 4, borderRadius: 9999,
              backgroundColor: '#DEDEDE',
              margin: '0 auto 16px',
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <p style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 18, fontWeight: 700, color: '#1A1A1A',
                margin: 0, letterSpacing: '-0.01em',
              }}>
                Add new
              </p>
              <button
                onClick={() => setSheetOpen(false)}
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  backgroundColor: '#F5F5F7', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={14} strokeWidth={2} color="#6B6B6B" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => go('/add')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px',
                  backgroundColor: '#F5F5F7', border: 'none', borderRadius: 14,
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  width: '100%',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  backgroundColor: '#E1F5EE',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <CalendarPlus size={18} strokeWidth={1.5} color="#1D9E75" />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', margin: '0 0 2px' }}>
                    Log an event
                  </p>
                  <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>
                    Vet visit, medication, milestone & more
                  </p>
                </div>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => go('/add-reminder')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px',
                  backgroundColor: '#F5F5F7', border: 'none', borderRadius: 14,
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  width: '100%',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  backgroundColor: '#F9E0F3',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <ClipboardList size={18} strokeWidth={1.5} color="#A0348A" />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', margin: '0 0 2px' }}>
                    Set a reminder
                  </p>
                  <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0 }}>
                    Upcoming appointments, treatments & renewals
                  </p>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AppRoutes />
      <NavBar sheetOpen={sheetOpen} onToggleSheet={() => setSheetOpen(prev => !prev)} />

      {/* Toast floats above nav bar — uses AppShell as the absolute containing block */}
      <ToastAnchor navHeight={NAV_HEIGHT}>
        <EventConfirmationToast toast={activeToast} onDismiss={dismissToast} />
      </ToastAnchor>
    </div>
  )
}

export default function App() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <MobileShell>
        <AppShell />
      </MobileShell>
    </MemoryRouter>
  )
}
