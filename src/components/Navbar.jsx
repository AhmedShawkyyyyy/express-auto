import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, PhoneCall, X } from 'lucide-react'
import Logo from './Logo'
import MobileActionBar from './MobileActionBar'
import { PRIMARY_PHONE, formatPhone, telLink } from '../data/contact'
import { useScrollLock } from '../lib/scrollLock'
import '../styles/chrome.css'

const links = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'showroom', label: 'معرض السيارات' },
  { id: 'contact', label: 'تواصل معنا' },
]

export default function Navbar({ page, navigate }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useScrollLock(open)

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
    <>
      <header className="chrome-header">
        <div className="container-lux chrome-header__inner">
          <Logo onClick={() => go('home')} className="h-9 sm:h-10" />

          <nav className="chrome-nav" aria-label="التنقل الرئيسي">
            {links.map((link) => {
              const active = page === link.id
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`chrome-nav-link ${active ? 'is-active' : ''}`}
                >
                  <span>{link.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="chrome-header__actions">
            <a
              href={telLink(PRIMARY_PHONE)}
              dir="ltr"
              className="chrome-cta"
              aria-label={`اتصل على ${formatPhone(PRIMARY_PHONE)}`}
            >
              <PhoneCall size={16} aria-hidden="true" />
              <span>{formatPhone(PRIMARY_PHONE)}</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="chrome-menu-button"
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
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="chrome-mobile-menu"
            >
              <nav className="chrome-mobile-nav" aria-label="قائمة الجوال">
                {links.map((link) => {
                  const active = page === link.id
                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => go(link.id)}
                      aria-current={active ? 'page' : undefined}
                      className={`chrome-mobile-link ${active ? 'is-active' : ''}`}
                    >
                      <span>{link.label}</span>
                    </button>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileActionBar />
    </>
  )
}
