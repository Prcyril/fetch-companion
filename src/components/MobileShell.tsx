import { ReactNode } from 'react'

export default function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100dvh',
      backgroundColor: '#E8E8EA',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '390px',
        minHeight: '100dvh',
        backgroundColor: '#F5F5F7',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {children}
      </div>
    </div>
  )
}
