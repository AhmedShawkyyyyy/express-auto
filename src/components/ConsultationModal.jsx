import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpLeft,
  CheckCircle2,
  MessageCircle,
  PhoneCall,
  Sparkles,
  X,
} from 'lucide-react'
import { cars } from '../data/cars'
import {
  PRIMARY_PHONE,
  formatPhone,
  telLink,
  whatsappLink,
} from '../data/contact'

export default function ConsultationModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    car: '',
    note: '',
  })

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = [
      'مرحبًا إكسبريس أوتو، أرغب في حجز تجربة قيادة.',
      form.name ? `الاسم: ${form.name}` : '',
      form.phone ? `رقم التواصل: ${form.phone}` : '',
      form.car ? `السيارة المهتم بها: ${form.car}` : '',
      form.note ? `ملاحظات: ${form.note}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    window.open(whatsappLink(PRIMARY_PHONE, message), '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-xl overflow-hidden rounded-[26px] border border-white/10 bg-[#080808] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
      >
        <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-brand/[0.09] blur-[80px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-brand via-brand/30 to-transparent" />

        <button
          type="button"
          onClick={onClose}
          className="icon-button absolute left-4 top-4 z-10 !h-9 !w-9 !border-white/10 !bg-white/5"
          aria-label="إغلاق النافذة"
        >
          <X size={17} />
        </button>

        <div className="relative max-h-[calc(100svh-3rem)] overflow-y-auto p-6 sm:p-9">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-8 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-brand/20 bg-brand/[0.08]">
                  <CheckCircle2 size={36} className="text-brand" />
                </div>
                <h2 id="consultation-title" className="mt-6 text-3xl font-extrabold text-white">
                  تم تجهيز طلبك
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-white/50">
                  أكمل إرسال الرسالة من نافذة واتساب، وسيتواصل معك أحد مستشارينا في
                  أقرب وقت.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <a href={telLink(PRIMARY_PHONE)} className="btn btn-primary">
                    <PhoneCall size={17} />
                    اتصل الآن
                  </a>
                  <button type="button" onClick={onClose} className="btn btn-secondary">
                    العودة للمعرض
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-7 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-black">
                    <Sparkles size={19} />
                  </span>
                  <span className="eyebrow eyebrow-ar">تجربة قيادة</span>
                </div>

                <h2 id="consultation-title" className="text-3xl font-extrabold leading-tight text-white sm:text-[2.5rem]">
                  احجز تجربة قيادة
                </h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/45">
                  أخبرنا بالسيارة التي ترغب في تجربتها، وسنتواصل معك لتأكيد
                  الموعد.
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="consult-name" className="mb-2 block text-xs font-semibold text-white/60">
                        الاسم بالكامل
                      </label>
                      <input
                        id="consult-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={update('name')}
                        placeholder="اسمك الكريم"
                        className="input-lux"
                      />
                    </div>
                    <div>
                      <label htmlFor="consult-phone" className="mb-2 block text-xs font-semibold text-white/60">
                        رقم الموبايل
                      </label>
                      <input
                        id="consult-phone"
                        type="tel"
                        required
                        inputMode="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        placeholder="01xxxxxxxxx"
                        className="input-lux font-latin"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="consult-car" className="mb-2 block text-xs font-semibold text-white/60">
                      السيارة التي تهمك
                    </label>
                    <select
                      id="consult-car"
                      value={form.car}
                      onChange={update('car')}
                      className="input-lux appearance-none"
                    >
                      <option value="">لم أحدد بعد — أريد ترشيحًا</option>
                      {cars.map((car) => (
                        <option key={car.id} value={`${car.name} — ${car.year}`}>
                          {car.name} — {car.year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="consult-note" className="mb-2 block text-xs font-semibold text-white/60">
                      ملاحظات إضافية <span className="font-normal text-white/25">(اختياري)</span>
                    </label>
                    <textarea
                      id="consult-note"
                      rows="3"
                      value={form.note}
                      onChange={update('note')}
                      placeholder="أخبرنا عن ميزانيتك أو تفضيلاتك..."
                      className="input-lux resize-none"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary mt-2 w-full !py-4">
                    <MessageCircle size={18} />
                    إرسال الطلب عبر واتساب
                    <ArrowUpLeft size={16} className="mr-auto" />
                  </button>

                  <p className="text-center text-[10px] leading-5 text-white/25">
                    عند الإرسال سيتم فتح واتساب برسالة جاهزة. بياناتك لا تُحفظ على الموقع.
                  </p>
                </form>

                <div className="mt-6 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                  <span className="text-xs text-white/40">تفضل الاتصال المباشر؟</span>
                  <a
                    href={telLink(PRIMARY_PHONE)}
                    dir="ltr"
                    className="flex items-center gap-2 font-latin text-xs font-semibold tracking-wider text-white transition-colors hover:text-brand"
                  >
                    <PhoneCall size={13} className="text-brand" />
                    {formatPhone(PRIMARY_PHONE)}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
