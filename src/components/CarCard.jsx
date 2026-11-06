import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpLeft, Fuel, Gauge, Settings2 } from 'lucide-react'
import FadeImage from './FadeImage'
import { easeLux } from '../lib/motion'

export default function CarCard({ car, onOpen, index = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      layout
      onClick={() => onOpen(car)}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      viewport={{ once: false, amount: 0.15 }}
      whileHover={
        reduceMotion ? undefined : { y: -2, transition: { duration: 0.2 } }
      }
      whileTap={{ y: 0 }}
      transition={{
        duration: 0.95,
        delay: Math.min(index * 0.1, 0.5),
        ease: easeLux,
        layout: { duration: 0.5 },
      }}
      className="cars-card group relative block w-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface text-right transition-[transform,border-color] duration-200"
      aria-label={`عرض تفاصيل ${car.name}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]">
          <FadeImage
            src={car.image}
            alt={car.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <span className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-muted">
            {car.category}
          </span>
          <span className="rounded-full bg-brand px-3 py-1.5 text-sm font-bold text-[#0b0b0c]">
            {car.badge}
          </span>
        </div>

        <span className="absolute bottom-4 right-4 rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-muted">
          {car.brand} · {car.year}
        </span>
      </div>

      <div className="p-5">
        <h3 className="cars-card-title truncate text-xl font-bold text-ivory">
          {car.name}
        </h3>

        <div className="cars-specs mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-1.5">
            <Gauge size={14} className="text-dim" aria-hidden="true" />
            {car.specs.power}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel size={14} className="text-dim" aria-hidden="true" />
            {car.specs.fuel}
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <Settings2 size={14} className="text-dim" aria-hidden="true" />
            {car.specs.transmission}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
          <div>
            <span className="cars-from block">السعر الاسترشادي</span>
            <span className="cars-price mt-1 block">
              <span dir="ltr" className="bidi-isolate font-latin">
                {car.price}
              </span>{' '}
              <span className="cars-currency">ج.م</span>
            </span>
          </div>
          <span className="flex items-center gap-2 text-[15px] font-semibold text-muted transition-colors group-hover:text-ivory">
            عرض التفاصيل
            <ArrowUpLeft size={15} aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.button>
  )
}
