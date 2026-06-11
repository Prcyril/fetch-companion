import { ReactNode } from 'react'

export default function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: '#1A1A1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {/* iPhone 15 Pro frame */}
      <div style={{
        position: 'relative',
        width: 393,
        flexShrink: 0,
      }}>
        {/* Outer shell */}
        <div style={{
          position: 'relative',
          borderRadius: 54,
          background: 'linear-gradient(145deg, #3a3a3c, #1c1c1e)',
          padding: 10,
          boxShadow: `
            0 0 0 1px #4a4a4c,
            0 30px 80px rgba(0,0,0,0.8),
            0 10px 30px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.08)
          `,
        }}>

          {/* Side buttons — volume up */}
          <div style={{
            position: 'absolute', left: -3, top: 120,
            width: 3, height: 36, borderRadius: '2px 0 0 2px',
            background: 'linear-gradient(180deg, #3a3a3c, #2a2a2c)',
            boxShadow: '-1px 0 0 #555',
          }} />
          <div style={{
            position: 'absolute', left: -3, top: 166,
            width: 3, height: 36, borderRadius: '2px 0 0 2px',
            background: 'linear-gradient(180deg, #3a3a3c, #2a2a2c)',
            boxShadow: '-1px 0 0 #555',
          }} />
          {/* Mute switch */}
          <div style={{
            position: 'absolute', left: -3, top: 80,
            width: 3, height: 28, borderRadius: '2px 0 0 2px',
            background: 'linear-gradient(180deg, #3a3a3c, #2a2a2c)',
            boxShadow: '-1px 0 0 #555',
          }} />
          {/* Power button */}
          <div style={{
            position: 'absolute', right: -3, top: 140,
            width: 3, height: 64, borderRadius: '0 2px 2px 0',
            background: 'linear-gradient(180deg, #3a3a3c, #2a2a2c)',
            boxShadow: '1px 0 0 #555',
          }} />

          {/* Screen bezel */}
          <div style={{
            borderRadius: 46,
            overflow: 'hidden',
            background: '#000',
            position: 'relative',
          }}>
            {/* Status bar */}
            <div style={{
              height: 54,
              backgroundColor: '#F5F5F7',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: '0 28px 8px',
              position: 'relative',
              zIndex: 10,
              flexShrink: 0,
            }}>
              {/* Dynamic Island */}
              <div style={{
                position: 'absolute',
                top: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 120,
                height: 36,
                backgroundColor: '#000',
                borderRadius: 20,
              }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', zIndex: 1 }}>9:41</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, zIndex: 1 }}>
                {/* Signal */}
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <rect x="0" y="8" width="3" height="4" rx="1" fill="#1A1A1A"/>
                  <rect x="4.5" y="5.5" width="3" height="6.5" rx="1" fill="#1A1A1A"/>
                  <rect x="9" y="3" width="3" height="9" rx="1" fill="#1A1A1A"/>
                  <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1A1A1A"/>
                </svg>
                {/* WiFi */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="#1A1A1A"/>
                  <path d="M3.5 6.5C5 5 6.4 4.2 8 4.2s3 .8 4.5 2.3" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M1 4C3.2 1.8 5.5.8 8 .8s4.8 1 7 3.2" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {/* Battery */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <div style={{
                    width: 25, height: 12, borderRadius: 3,
                    border: '1px solid #1A1A1A',
                    padding: 1.5,
                    display: 'flex', alignItems: 'center',
                  }}>
                    <div style={{ width: '80%', height: '100%', backgroundColor: '#1A1A1A', borderRadius: 1.5 }} />
                  </div>
                  <div style={{ width: 2, height: 5, backgroundColor: '#1A1A1A', borderRadius: '0 1px 1px 0' }} />
                </div>
              </div>
            </div>

            {/* App content */}
            <div style={{
              height: 780,
              overflowY: 'auto',
              overflowX: 'hidden',
              backgroundColor: '#F5F5F7',
              display: 'flex',
              flexDirection: 'column',
              scrollbarWidth: 'none',
            }}>
              {children}
            </div>

            {/* Home indicator */}
            <div style={{
              height: 34,
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{
                width: 134, height: 5,
                backgroundColor: '#1A1A1A',
                borderRadius: 3,
                opacity: 0.2,
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
