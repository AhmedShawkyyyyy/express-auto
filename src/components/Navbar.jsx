import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Menu, PhoneCall, X } from 'lucide-react'
import Logo from './Logo'
import { PRIMARY_PHONE, formatPhone, telLink } from '../data/contact'
import { useScrollLock } from '../lib/scrollLock'

const links = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'showroom', label: 'معرض السيارات' },
  { id: 'contact', label: 'تواصل معنا' },
]

export default function Navbar({ page, navigate, onBook }) {
  const [open, setOpen] = useState(false)
  const [pastHero, setPastHero] = useState(
    () => window.scrollY > window.innerHeight * 0.7,
  )
  const reduceMotion = useReducedMotion()
  const showCta = page !== 'home' || pastHero

  useScrollLock(open)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const closeMenu = () => setOpen(false)
    window.addEventListener('hashchange', closeMenu)
    return () => window.removeEventListener('hashchange', closeMenu)
  }, [])

  const go = (id) => {
    setOpen(false)
    navigate(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-night">

      <div className="container-lux flex h-[76px] items-center justify-between gap-4">
        <Logo onClick={() => go('home')} className="h-9 sm:h-10" />

        <nav className="pointer-events-none absolute inset-x-0 hidden items-center justify-center gap-2 lg:flex">
          {links.map((link) => {
            const active = page === link.id
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                aria-current={active ? 'page' : undefined}
                className={`pointer-events-auto min-h-11 px-4 text-sm font-semibold transition-colors duration-200 ${
                  active ? 'text-ivory' : 'text-muted hover:text-ivory'
                }`}
              >
                {link.label}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={telLink(PRIMARY_PHONE)}
            className="hidden min-h-11 items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-ivory xl:flex"
            aria-label={`اتصل بنا على ${formatPhone(PRIMARY_PHONE)}`}
          >
            <PhoneCall size={16} />
            <span className="phone-number font-latin tracking-wide">
              {formatPhone(PRIMARY_PHONE)}
            </span>
          </a>

          {showCta && (
            <button
              type="button"
              onClick={onBook}
              className="btn btn-primary hidden sm:inline-flex"
            >
              احجز تجربة قيادة
              <ArrowLeft size={16} />
            </button>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="icon-button lg:hidden"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full h-[calc(100svh-76px)] overflow-y-auto border-t border-line bg-night px-[var(--gutter)] pb-10 pt-8 lg:hidden"
          >
            <div className="mx-auto flex max-w-lg flex-col">
              <div className="flex flex-col">
                {links.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => go(link.id)}
                    className={`min-h-14 border-b border-line py-4 text-right text-2xl font-bold transition-colors duration-200 ${
                      page === link.id ? 'text-ivory' : 'text-muted hover:text-ivory'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  onBook()
                }}
                className="btn btn-primary mt-8 w-full"
              >
                احجز تجربة قيادة
                <ArrowLeft size={17} />
              </button>

              <a
                href={telLink(PRIMARY_PHONE)}
                className="mt-5 flex min-h-11 items-center justify-center gap-3 text-sm text-muted transition-colors hover:text-ivory"
              >
                <PhoneCall size={16} />
                <span className="phone-number font-latin tracking-wide">
                  {formatPhone(PRIMARY_PHONE)}
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
