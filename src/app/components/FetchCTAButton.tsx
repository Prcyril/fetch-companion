/**
 * "Check my price" style button pulled from the Fetch DivNav + EndOfBodyStart-1 frames.
 * Green pill with thick black border and offset shadow.
 * On press: physically sinks into the shadow by translating x/y to match the offset
 * and collapsing the box-shadow to zero — mimicking a real physical button press.
 */
import type { CSSProperties } from 'react'
import { motion, useAnimationControls } from 'motion/react'

interface FetchCTAButtonProps {
  label?: string
  emoji?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  style?: CSSProperties
}

export default function FetchCTAButton({
  label = 'Check my price',
  emoji = '👉',
  onClick,
  size = 'md',
  style,
}: FetchCTAButtonProps) {
  const px = size === 'sm' ? 12 : size === 'lg' ? 28 : 16
  const py = size === 'sm' ? 7 : size === 'lg' ? 14 : 10
  const fontSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16
  const borderWidth = size === 'lg' ? 3 : 2
  const shadowOffset = size === 'lg' ? 3 : 2

  const controls = useAnimationControls()

  async function handlePress() {
    // Sink down into the shadow
    await controls.start({
      x: shadowOffset,
      y: shadowOffset,
      boxShadow: '0px 0px 0px 0px #1B1B1C',
      transition: { duration: 0.08, ease: 'easeOut' },
    })
    // Spring back up
    await controls.start({
      x: 0,
      y: 0,
      boxShadow: `${shadowOffset}px ${shadowOffset}px 0px 0px #1B1B1C`,
      transition: { type: 'spring', stiffness: 500, damping: 22 },
    })
    onClick?.()
  }

  return (
    <motion.button
      animate={controls}
      onTapStart={handlePress}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${py}px ${px}px`,
        backgroundColor: '#B1FF9E',
        border: `${borderWidth}px solid #222222`,
        borderRadius: 9999,
        boxShadow: `${shadowOffset}px ${shadowOffset}px 0px 0px #1B1B1C`,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontWeight: 500,
        fontSize,
        color: '#1B1B1C',
        letterSpacing: '-0.02em',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {label} {emoji}
    </motion.button>
  )
}
