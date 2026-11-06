import { MapPin, PhoneCall } from 'lucide-react'
import { WhatsAppIcon } from './icons/BrandIcons'
import {
  MAPS_SHORT_LINK,
  PRIMARY_PHONE,
  formatPhone,
  telLink,
  whatsappLink,
} from '../data/contact'
import { siteConfig } from '../data/siteConfig'

export default function MobileActionBar() {
  const whatsappNumber = siteConfig.whatsappNumber
  const hasWhatsApp = Boolean(whatsappNumber)

  return (
    <nav
      className={`chrome-mobile-bar ${hasWhatsApp ? 'chrome-mobile-bar--three' : ''}`}
      aria-label="إجراءات سريعة"
    >
      <a
        href={telLink(PRIMARY_PHONE)}
        aria-label={`اتصل على ${formatPhone(PRIMARY_PHONE)}`}
        className="chrome-mobile-action chrome-mobile-action--primary"
      >
        <PhoneCall size={17} aria-hidden="true" />
        <span>اتصل</span>
      </a>

      <a
        href={MAPS_SHORT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="الموقع على خرائط جوجل"
        className="chrome-mobile-action"
      >
        <MapPin size={17} aria-hidden="true" />
        <span>الموقع</span>
      </a>

      {hasWhatsApp && (
        <a
          href={whatsappLink(
            whatsappNumber,
            'مرحبًا إكسبريس أوتو، أرغب في الاستفسار عن السيارات المتاحة.',
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل عبر واتساب"
          className="chrome-mobile-action"
        >
          <WhatsAppIcon size={17} />
          <span>واتساب</span>
        </a>
      )}
    </nav>
  )
}
