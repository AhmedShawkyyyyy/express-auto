import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Gauge,
  MessageCircle,
  PhoneCall,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react'
import {
  PRIMARY_PHONE,
  carInquiryMessage,
  telLink,
  whatsappLink,
} from '../data/contact'

const specItems = [
  { key: 'engine', label: 'المحرك', icon: Settings2 },
  { key: 'power', label: 'القوة', icon: Gauge },
  { key: 'transmission', label: 'ناقل الحركة', icon: SlidersHorizontal },
  { key: 'fuel', label: 'الوقود', icon: Fuel },
  { key: 'seats', label: 'المقاعد', icon: Users },
  { key: 'acceleration', label: '0–100 كم/س', icon: Zap },
]

export default function CarDetailsModal({ car, onClose }) {
  const [activeImage, setActiveImage] = useState(0)
  const reduceMotion = useReducedMotion()
  const overlayRef = useRef(null)
  const closeRef = useRef(null)
  const restoreFocusRef = useRef(null)

  useEffect(() => {
    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const nodes = overlayRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (!nodes?.length) return

        const first = nodes[0]
        const last = nodes[nodes.length - 1]

        if (!overlayRef.current?.contains(document.activeElement)) {
          event.preventDefault()
          first.focus()
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
        return
      }

      if (event.key === 'ArrowLeft') {
        setActiveImage((index) => (index + 1) % car.gallery.length)
      }
      if (event.key === 'ArrowRight') {
        setActiveImage((index) => (index - 1 + car.gallery.length) % car.gallery.length)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      restoreFocusRef.current?.focus?.()
    }
  }, [car, onClose])

  const nextImage = () =>
    setActiveImage((index) => (index + 1) % car.gallery.length)
  const prevImage = () =>
    setActiveImage((index) => (index - 1 + car.gallery.length) % car.gallery.length)

  return (
    <motion.div
      ref={overlayRef}
      className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-black/90 backdrop-blur-xl"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.45 }}
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="car-modal-title"
        aria-describedby="car-modal-description"
        className="flex min-h-full justify-center px-4 py-5 sm:py-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onClose()
          }}
          className="icon-button fixed left-4 top-4 z-30 !border-white/15 !bg-black/70 shadow-[0_10px_30px_rgba(0,0,0,0.45)] sm:left-6 sm:top-6"
          aria-label="إغلاق تفاصيل السيارة"
        >
          <X size={20} />
        </button>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          onClick={(event) => event.stopPropagation()}
          className="relative my-auto w-full max-w-6xl overflow-hidden rounded-[26px] border border-white/10 bg-[#080808] shadow-[0_50px_140px_-30px_rgba(0,0,0,0.95)]"
        >
          <div className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-l from-brand via-brand/30 to-transparent" />

          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative flex flex-col border-b border-white/[0.07] bg-[#050505] p-3 sm:p-4 lg:border-b-0 lg:border-l">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-[18px] bg-white/[0.03] lg:min-h-[440px] lg:flex-1 lg:aspect-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${car.id}-${activeImage}`}
                    src={car.gallery[activeImage]}
                    alt={`${car.name} — صورة ${activeImage + 1} من ${car.gallery.length}`}
                    initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={
                      activeImage === 0 && car.imagePosition
                        ? { objectPosition: car.imagePosition }
                        : undefined
                    }
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

                <div className="absolute right-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md sm:text-xs">
                    {car.category}
                  </span>
                  <span className="rounded-full bg-brand px-3 py-1.5 text-[11px] font-bold text-black sm:text-xs">
                    {car.badge}
                  </span>
                </div>

                <div className="absolute left-16 top-4 hidden items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 font-latin text-[11px] font-semibold tracking-widest text-white/85 backdrop-blur-md sm:flex xl:left-4">
                  {String(activeImage + 1).padStart(2, '0')}
                  <span className="h-px w-3 bg-white/25" />
                  {String(car.gallery.length).padStart(2, '0')}
                </div>

                <button
                  type="button"
                  onClick={prevImage}
                  className="icon-button absolute right-4 top-1/2 z-10 -translate-y-1/2 !h-11 !w-11 !border-white/20 !bg-black/55"
                  aria-label="الصورة السابقة"
                >
                  <ChevronRight size={19} />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="icon-button absolute left-4 top-1/2 z-10 -translate-y-1/2 !h-11 !w-11 !border-white/20 !bg-black/55"
                  aria-label="الصورة التالية"
                >
                  <ChevronLeft size={19} />
                </button>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
                  <div className="flex items-center">
                    {car.gallery.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`الانتقال إلى الصورة ${index + 1}`}
                        aria-current={activeImage === index ? 'true' : undefined}
                        className="group/dot flex h-6 w-7 items-center justify-center"
                      >
                        <span
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            activeImage === index
                              ? 'w-7 bg-brand'
                              : 'w-1.5 bg-white/35 group-hover/dot:bg-white/60'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white/70 backdrop-blur-sm">
                    <Sparkles size={12} className="text-brand" />
                    صور توضيحية
                  </span>
                </div>
              </div>

              <div
                className={`mt-3 grid gap-3 ${
                  car.gallery.length >= 4
                    ? 'grid-cols-4'
                    : car.gallery.length === 3
                      ? 'grid-cols-3'
                      : 'grid-cols-2'
                }`}
              >
                {car.gallery.map((image, index) => (
                  <button
                    key={`${image}-thumb`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-[16/10] overflow-hidden rounded-xl border transition-all duration-300 ${
                      activeImage === index
                        ? 'border-brand/70 opacity-100'
                        : 'border-white/[0.07] opacity-50 hover:opacity-85'
                    }`}
                    aria-label={`عرض الصورة ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                      style={
                        index === 0 && car.imagePosition
                          ? { objectPosition: car.imagePosition }
                          : undefined
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[13px] font-bold text-brand">
                    {car.brand} · {car.category}
                  </span>
                  <h2
                    id="car-modal-title"
                    className="mt-2 text-[2rem] font-extrabold leading-tight text-white sm:text-[2.5rem]"
                  >
                    {car.name}
                  </h2>
                </div>
                <span className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/65 sm:flex">
                  <CalendarDays size={13} className="text-brand" />
                  {car.year}
                </span>
              </div>

              <p
                id="car-modal-description"
                className="mt-4 text-[15px] leading-7 text-white/65"
              >
                {car.description}
              </p>

              <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-2 border-y border-white/[0.07] py-4">
                <div>
                  <span className="text-xs text-white/50">السعر الاسترشادي</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-latin text-[1.7rem] font-bold tracking-wide text-white">
                      {car.price}
                    </span>
                    <span className="text-sm font-semibold text-brand">ج.م</span>
                  </div>
                </div>
                <span className="mb-1 mr-auto text-[11px] leading-5 text-white/45">
                  * السعر النهائي يُؤكَّد عند الاستفسار
                </span>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-4 bg-brand" />
                  <h3 className="text-[13px] font-bold text-white/80">المواصفات الأساسية</h3>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {specItems.map(({ key, label, icon: Icon }) => (
                    <div
                      key={key}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3"
                    >
                      <div className="flex items-center gap-2 text-white/55">
                        <Icon size={14} />
                        <span className="text-[11px]">{label}</span>
                      </div>
                      <p className="mt-1.5 text-sm font-semibold text-white/90">
                        {car.specs[key]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-4 bg-brand" />
                  <h3 className="text-[13px] font-bold text-white/80">أبرز المزايا</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1.5 text-xs text-white/70"
                    >
                      <Check size={11} className="shrink-0 text-brand" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <a
                  href={whatsappLink(PRIMARY_PHONE, carInquiryMessage(car))}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary !px-4 text-sm"
                >
                  <MessageCircle size={16} />
                  استفسر عبر واتساب
                </a>
                <a
                  href={telLink(PRIMARY_PHONE)}
                  className="btn btn-secondary !px-4 text-sm"
                >
                  <PhoneCall size={15} />
                  اتصل بالمستشار
                </a>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
