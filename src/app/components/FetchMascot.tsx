/**
 * Fetch brand mascot illustrations pulled from imported Figma frames:
 *  - pink-sm  (61×71)   : DivFramer1Ufq011 variant 3
 *  - pink-md  (143×151) : DivFramer1Ufq011 variant 22
 *  - pink-tall(80×104)  : EndOfBodyStart Group75
 *  - pink-lg  (200×233) : EndOfBodyStart-1 Group76
 *  - blue-lg  (220×268) : EndOfBodyStart-1 Group77
 */
import React, { type CSSProperties } from 'react'
import svgBase from '../../imports/DivFramer1Ufq011/svg-m5ahhp4ti'
import svgEob from '../../imports/EndOfBodyStart/svg-1hwksewwks'
import svgEob1 from '../../imports/EndOfBodyStart-1/svg-qovq3tz5pj'

type MascotVariant = 'pink-sm' | 'pink-md' | 'pink-tall' | 'pink-lg' | 'blue-lg'

interface FetchMascotProps {
  variant?: MascotVariant
  className?: string
  style?: CSSProperties
}

function PinkSm() {
  return (
    <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 60.9995 70.6987">
      <g>
        <path d={(svgBase as any).p299e5400} fill="#1B1B1C" />
        <path d={(svgBase as any).p1eb4500} fill="#FCABFD" />
        <path d={(svgBase as any).p2bff0580} fill="#1B1B1C" />
        <path d={(svgBase as any).p84e5a50} fill="#FCABFD" />
        <path d={(svgBase as any).p369f6880} fill="#1B1B1C" />
        <path d={(svgBase as any).p24930600} fill="#FCABFD" />
        <path d={(svgBase as any).p3aa11d50} fill="#1B1B1C" />
        <path d={(svgBase as any).pd84c3f2} fill="#FCABFD" />
        <path d={(svgBase as any).p20198980} fill="#1B1B1C" />
        <path d={(svgBase as any).pd2e4370} fill="#FFEBFF" />
      </g>
    </svg>
  )
}

function PinkMd() {
  return (
    <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 143.001 150.945">
      <g>
        <path d={(svgBase as any).p3b8f9a80} fill="#1D1C1C" />
        <path d={(svgBase as any).p32c2fd00} fill="#E3E8FB" />
        <path d={(svgBase as any).p3e18d380} fill="#1D1C1C" />
        <path d={(svgBase as any).p28e0b700} fill="#E3E8FB" />
        <path d={(svgBase as any).p35144f00} fill="#FB90FB" />
        <path d={(svgBase as any).p24bb3e00} fill="#E3E8FB" />
        <path d={(svgBase as any).p52a1600} fill="white" />
        <path d={(svgBase as any).p64d8000} fill="#E3E8FB" />
        <path d={(svgBase as any).pa4fa770} fill="#E3E8FB" />
        <path d={(svgBase as any).p1f979940} fill="#1D1C1C" />
        <path d={(svgBase as any).p35fde200} fill="#1D1C1C" fillOpacity={0.78} />
        <path d={(svgBase as any).p38309f00} fill="#1F1F1F" fillOpacity={0.969} />
        <path d={(svgBase as any).p31e7b500} fill="#1B1B1B" fillOpacity={0.922} />
      </g>
    </svg>
  )
}

function PinkTall() {
  return (
    <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 80.005 104">
      <g>
        <path d={(svgEob1 as any).p10cb2280} fill="#FEC9FF" />
        <path d={(svgEob1 as any).pe65f300} fill="#1B1B1C" />
        <path d={(svgEob1 as any).p36a42d80} fill="#1B1B1C" />
        <path d={(svgEob1 as any).pf44cd00} fill="#1B1B1C" />
        <path d={(svgEob1 as any).p35275780} fill="#1B1B1C" />
        <path d={(svgEob1 as any).p124035d0} fill="#1B1B1C" />
      </g>
    </svg>
  )
}

function PinkLg() {
  return (
    <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 200 233">
      <g>
        <path d={(svgEob1 as any).p3748fe00} fill="#FEC9FF" />
        <path d={(svgEob1 as any).p3265a0c0} fill="#FEC9FF" />
        <path d={(svgEob1 as any).p2a8dd000} fill="#FEC9FF" />
        <path d={(svgEob1 as any).p368ff000} fill="#1B1B1C" />
        <path d={(svgEob1 as any).p215b1900} fill="#1B1B1C" />
        <path d={(svgEob1 as any).p3a8b9400} fill="#1B1B1C" />
        <path d={(svgEob1 as any).p3827d400} fill="#1B1B1C" />
        <path d={(svgEob1 as any).p5da9000} fill="#1B1B1C" />
        <path d={(svgEob1 as any).p219fca00} fill="#1B1B1C" />
      </g>
    </svg>
  )
}

function BlueLg() {
  return (
    <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 220 268">
      <g>
        <path d={(svgEob1 as any).p134cb900} fill="#E5EBFF" />
        <path d={(svgEob1 as any).pae91e70} fill="#E5EBFF" stroke="#AAAAAA" strokeWidth={0.26} />
        <path d={(svgEob1 as any).p303f8500} fill="#E5EBFF" />
        <path d={(svgEob1 as any).p14328900} fill="#1B1B1C" />
        <path d={(svgEob1 as any).p31cec900} fill="#1B1B1C" />
        <path d={(svgEob1 as any).p15f81030} fill="#1B1B1C" />
        <path d={(svgEob1 as any).p29188100} fill="#1B1B1C" />
        <path d={(svgEob1 as any).pb58e580} fill="#1B1B1C" />
        <path d={(svgEob1 as any).p2ebd8b70} fill="#1B1B1C" />
        <path d={(svgEob1 as any).p847c000} fill="#1B1B1C" />
      </g>
    </svg>
  )
}

const SIZES: Record<MascotVariant, { w: number; h: number }> = {
  'pink-sm':   { w: 61,  h: 71  },
  'pink-md':   { w: 143, h: 151 },
  'pink-tall': { w: 80,  h: 104 },
  'pink-lg':   { w: 200, h: 233 },
  'blue-lg':   { w: 220, h: 268 },
}

const SVG_MAP: Record<MascotVariant, () => React.ReactElement> = {
  'pink-sm':   PinkSm,
  'pink-md':   PinkMd,
  'pink-tall': PinkTall,
  'pink-lg':   PinkLg,
  'blue-lg':   BlueLg,
}

export default function FetchMascot({ variant = 'pink-sm', className, style }: FetchMascotProps) {
  const { w, h } = SIZES[variant]
  const Svg = SVG_MAP[variant]
  return (
    <div
      className={className}
      style={{ width: w, height: h, flexShrink: 0, ...style }}
    >
      <Svg />
    </div>
  )
}
