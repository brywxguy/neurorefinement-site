import { ImageResponse } from 'next/og'
import { CREAM, fullMarkSvg, svgDataUri } from '@/lib/brand-mark'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={svgDataUri(fullMarkSvg(CREAM))} width={size.width} height={size.height} alt="" />
      </div>
    ),
    size
  )
}
