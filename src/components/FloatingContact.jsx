import { useEffect, useState } from 'react'
import { WhatsAppIcon } from './icons/BrandIcons'
import { whatsappLink } from '../data/contact'

export default function FloatingContact() {
  const [visible, setVisible] = useState(() => window.scrollY > 520)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="تواصل مع إكسبريس أوتو عبر واتساب"
      className="fixed bottom-6 end-6 z-40 flex h-14 w-14 items-center justify-center rounded-[12px] border border-line bg-surface-2 text-ivory transition-colors duration-200 hover:border-white/20"
    >
      <WhatsAppIcon size={24} />
    </a>
  )
}
