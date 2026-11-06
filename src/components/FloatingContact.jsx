import { WhatsAppIcon } from './icons/BrandIcons'
import { whatsappLink } from '../data/contact'
import { siteConfig } from '../data/siteConfig'

export default function FloatingContact() {
  if (!siteConfig.whatsappNumber) return null

  return (
    <a
      href={whatsappLink(siteConfig.whatsappNumber)}
      target="_blank"
      rel="noreferrer"
      aria-label="تواصل مع إكسبريس أوتو عبر واتساب"
      className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-[12px] border border-line bg-surface-2 text-ivory transition-colors duration-200 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-night"
    >
      <WhatsAppIcon size={24} />
    </a>
  )
}
