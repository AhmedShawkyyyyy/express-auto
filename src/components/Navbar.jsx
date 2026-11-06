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

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onChange = (event) => {
      if (event.matches) setOpen(false)
    }
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
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
              aria-controls="chrome-mobile-drawer"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chrome-drawer-backdrop"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="chrome-drawer-backdrop"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            key="chrome-drawer"
            id="chrome-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقل"
            initial={reduceMotion ? false : { x: '-100%' }}
            animate={{ x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: '-100%' }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="chrome-drawer"
          >
            <div className="chrome-drawer__head">
              <span className="chrome-drawer__title">القائمة</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="chrome-drawer__close"
                aria-label="إغلاق القائمة"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="chrome-drawer__nav" aria-label="قائمة الجوال">
              {links.map((link) => {
                const active = page === link.id
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => go(link.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`chrome-drawer__link ${active ? 'is-active' : ''}`}
                  >
                    <span>{link.label}</span>
                  </button>
                )
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <MobileActionBar />
    </>
  )
}
