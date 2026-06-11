import { useNavigate, useLocation } from 'react-router'
import { motion } from 'motion/react'
import { Home, Clock, Plus, User, Sparkles } from 'lucide-react'

const tabs = [
  { path: '/',         icon: Home,     label: 'Home' },
  { path: '/timeline', icon: Clock,    label: 'Timeline' },
  { path: null,        icon: Plus,     label: 'Add',     isFab: true },
  { path: '/insights', icon: Sparkles, label: 'Insights' },
  { path: '/profile',  icon: User,     label: 'Profile' },
]

interface NavBarProps {
  sheetOpen: boolean
  onToggleSheet: () => void
}

export default function NavBar({ sheetOpen, onToggleSheet }: NavBarProps) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderTop: '0.5px solid #DEDEDE',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 0 10px',
      zIndex: 50,
      flexShrink: 0,
    }}>
      {tabs.map(({ path, icon: Icon, label, isFab }) => {
        const active = path === '/'
          ? location.pathname === '/'
          : path ? location.pathname.startsWith(path) : false
        return (
          <motion.button
            key={label}
            onClick={() => isFab ? onToggleSheet() : navigate(path!)}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 10px',
            }}
          >
            {isFab ? (
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                backgroundColor: sheetOpen ? '#F279C5' : '#1A1A1A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 2,
                transition: 'background-color 200ms ease-out',
              }}>
                <motion.div
                  animate={{ rotate: sheetOpen ? 45 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                >
                  <Icon size={20} strokeWidth={2} color="#FFFFFF" />
                </motion.div>
              </div>
            ) : (
              <div style={{
                width: 40, height: 28, borderRadius: 9999,
                backgroundColor: active ? '#F9E0F3' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background-color 200ms ease-out',
              }}>
                <Icon
                  size={20}
                  strokeWidth={active ? 2 : 1.5}
                  color={active ? '#F279C5' : '#6B6B6B'}
                />
              </div>
            )}
            <span style={{
              fontSize: 10,
              fontWeight: active && !isFab ? 600 : 400,
              color: active && !isFab ? '#F279C5' : '#6B6B6B',
              fontFamily: 'inherit',
            }}>
              {label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
