import { Clock, CreditCard, MapPin } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { Card } from '@/components/ui'
import { cn } from '@/lib/utils'

export function VisitDetails({ className }: { className?: string }) {
  const { location, hours, payment } = siteConfig
  const items = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Location',
      lines: [`${location.studio} ${location.addressNote}`, location.formats, location.travel],
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Hours',
      lines: [`${hours.days}, ${hours.time}`, hours.closed, hours.byRequest],
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Payment',
      lines: [payment.note],
    },
  ]

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-6', className)}>
      {items.map((item) => (
        <Card key={item.title} hover={false}>
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
            {item.icon}
          </div>
          <h3 className="font-display text-lg text-brand-800 mb-2">{item.title}</h3>
          <div className="space-y-2 text-sm text-brand-600 leading-relaxed">
            {item.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
