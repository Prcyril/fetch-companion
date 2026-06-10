import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Clock, Plus, User } from 'lucide-react'

const tabs = [
  { path: '/',        icon: Home,  label: 'Home' },
  { path: '/timeline', icon: Clock, label: 'Timeline' },
  { path: '/add',     icon: Plus,  label: 'Add' },
  { path: '/profile', icon: User,  label: 'Profile' },
]

export default function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isDetail = location.pathname.startsWith('/event/')

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderTop: '0.5px solid #DEDEDE',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 0 24px',
      zIndex: 50,
      flexShrink: 0,
    }}>
      {tabs.map(({ path, icon: Icon, label }) => {
        const active = path === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(path)
        const isAdd = path === '/add'
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 20px',
              position: 'relative',
            }}
          >
            {isAdd ? (
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                backgroundColor: '#1A1A1A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 2,
              }}>
                <Icon size={20} strokeWidth={2} color="#FFFFFF" />
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
              fontWeight: active ? 600 : 400,
              color: active ? '#F279C5' : '#6B6B6B',
              fontFamily: 'inherit',
            }}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
