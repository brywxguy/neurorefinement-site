import { ImageResponse } from 'next/og'
import { smallMarkSvg, svgDataUri } from '@/lib/brand-mark'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={svgDataUri(smallMarkSvg)} width={size.width} height={size.height} alt="" />
      </div>
    ),
    size
  )
}
