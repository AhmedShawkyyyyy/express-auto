import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

export default function CarDetailsModal({ car, onClose, onBook }) {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') {
        setActiveImage((index) => (index + 1) % car.gallery.length)
      }
      if (event.key === 'ArrowRight') {
        setActiveImage((index) => (index - 1 + car.gallery.length) % car.gallery.length)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [car, onClose])

  const nextImage = () =>
    setActiveImage((index) => (index + 1) % car.gallery.length)
  const prevImage = () =>
    setActiveImage((index) => (index - 1 + car.gallery.length) % car.gallery.length)

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-y-auto bg-black/85 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      role="presentation"
    >
      <div className="flex min-h-full items-center justify-center px-4 py-5 sm:py-8">
        <button
          type="button"
          onClick={onClose}
          className="icon-button absolute left-4 top-4 z-30 !border-white/15 !bg-black/70 sm:left-6 sm:top-6"
          aria-label="إغلاق تفاصيل السيارة"
        >
          <X size={20} />
        </button>

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="car-modal-title"
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="relative w-full max-w-6xl overflow-hidden rounded-[26px] border border-white/10 bg-[#080808] shadow-[0_50px_140px_-30px_rgba(0,0,0,0.95)]"
        >
          <div className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-l from-brand via-brand/30 to-transparent" />

          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative flex flex-col border-b border-white/[0.07] bg-[#050505] p-3 sm:p-4 lg:border-b-0 lg:border-l">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-[18px] bg-white/[0.03] lg:min-h-[440px] lg:flex-1 lg:aspect-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${car.id}-${activeImage}`}
                    src={car.gallery[activeImage]}
                    alt={`${car.name} — صورة ${activeImage + 1}`}
                    initial={{ opacity: 0, scale: 1.035 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

                <div className="absolute right-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
                    {car.category}
                  </span>
                  <span className="rounded-full bg-brand px-3 py-1.5 text-[10px] font-bold text-black">
                    {car.badge}
                  </span>
                </div>

                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 font-latin text-[10px] font-semibold tracking-widest text-white/80 backdrop-blur-md">
                  {String(activeImage + 1).padStart(2, '0')}
                  <span className="h-px w-3 bg-white/25" />
                  {String(car.gallery.length).padStart(2, '0')}
                </div>

                <button
                  type="button"
                  onClick={prevImage}
                  className="icon-button absolute right-4 top-1/2 z-10 -translate-y-1/2 !h-10 !w-10 !border-white/15 !bg-black/45"
                  aria-label="الصورة السابقة"
                >
                  <ChevronRight size={19} />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="icon-button absolute left-4 top-1/2 z-10 -translate-y-1/2 !h-10 !w-10 !border-white/15 !bg-black/45"
                  aria-label="الصورة التالية"
                >
                  <ChevronLeft size={19} />
                </button>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
                  <div className="flex items-center gap-2">
                    {car.gallery.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`عرض الصورة ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeImage === index
                            ? 'w-7 bg-brand'
                            : 'w-1.5 bg-white/35 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-medium text-white/55">
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
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-brand">
                    {car.brand} · {car.category}
                  </span>
                  <h2
                    id="car-modal-title"
                    className="mt-2 text-[2rem] font-extrabold leading-tight text-white sm:text-[2.5rem]"
                  >
                    {car.name}
                  </h2>
                </div>
                <span className="hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/50 sm:flex">
                  <CalendarDays size={12} className="text-brand" />
                  {car.year}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-white/48">{car.description}</p>

              <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-1 border-y border-white/[0.07] py-4">
                <div>
                  <span className="text-[10px] text-white/35">السعر الاسترشادي</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-latin text-2xl font-bold tracking-wide text-white">
                      {car.price}
                    </span>
                    <span className="text-xs font-semibold text-brand">ج.م</span>
                  </div>
                </div>
                <span className="mb-1 mr-auto text-[10px] text-white/25">
                  * السعر النهائي يؤكد عند الاستفسار
                </span>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-4 bg-brand" />
                  <h3 className="text-xs font-bold text-white/70">المواصفات الأساسية</h3>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {specItems.map(({ key, label, icon: Icon }) => (
                    <div
                      key={key}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3"
                    >
                      <div className="flex items-center gap-2 text-white/30">
                        <Icon size={13} />
                        <span className="text-[9px]">{label}</span>
                      </div>
                      <p className="mt-1.5 text-[12px] font-semibold text-white/80">
                        {car.specs[key]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-4 bg-brand" />
                  <h3 className="text-xs font-bold text-white/70">أبرز المزايا</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[10px] text-white/55"
                    >
                      <Check size={10} className="text-brand" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-2.5">
                <a
                  href={whatsappLink(PRIMARY_PHONE, carInquiryMessage(car))}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary !px-3 text-[12px]"
                >
                  <MessageCircle size={16} />
                  استفسر عبر واتساب
                </a>
                <a
                  href={telLink(PRIMARY_PHONE)}
                  className="btn btn-secondary !px-3 text-[12px]"
                >
                  <PhoneCall size={15} />
                  اتصل بالمستشار
                </a>
              </div>

              {onBook && (
                <button
                  type="button"
                  onClick={onBook}
                  className="mt-2.5 w-full rounded-full py-2.5 text-[11px] font-semibold text-white/35 transition-colors hover:text-brand"
                >
                  أو احجز موعد تجربة قيادة ←
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
