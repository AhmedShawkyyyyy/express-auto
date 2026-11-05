import { motion } from 'framer-motion'
import { ArrowUpLeft, Fuel, Gauge, Settings2 } from 'lucide-react'

export default function CarCard({ car, onOpen, index = 0 }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="lux-card group relative rounded-2xl transition-all duration-500 hover:border-brand/30 hover:shadow-[0_28px_80px_-35px_rgba(242,227,10,0.22)]"
    >
      <button
        type="button"
        onClick={() => onOpen(car)}
        className="absolute inset-0 z-20 rounded-2xl"
        aria-label={`عرض تفاصيل ${car.name}`}
      />

      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/20" />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between">
          <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[10px] font-bold text-white/80 backdrop-blur-md">
            {car.category}
          </span>
          <span className="rounded-full bg-brand px-3 py-1.5 text-[10px] font-bold text-black">
            {car.badge}
          </span>
        </div>

        <span className="absolute bottom-4 right-4 text-[10px] font-semibold text-white/55">
          {car.brand} · {car.year}
        </span>
      </div>

      <div className="relative -mt-4 px-5 pb-5">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-xl font-bold text-white transition-colors duration-300 group-hover:text-brand">
              {car.name}
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[10px] text-white/38">
              <span className="flex items-center gap-1.5">
                <Gauge size={11} className="text-white/25" />
                {car.specs.power}
              </span>
              <span className="flex items-center gap-1.5">
                <Fuel size={11} className="text-white/25" />
                {car.specs.fuel}
              </span>
              <span className="hidden items-center gap-1.5 sm:flex">
                <Settings2 size={11} className="text-white/25" />
                {car.specs.transmission}
              </span>
            </div>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-black">
            <ArrowUpLeft size={15} />
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-white/[0.07] pt-3.5">
          <div>
            <span className="block text-[8px] text-white/30">السعر الاسترشادي</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-latin text-base font-bold tracking-wide text-white">
                {car.price}
              </span>
              <span className="text-[9px] font-semibold text-brand">ج.م</span>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-white/35 transition-colors group-hover:text-brand">
            عرض التفاصيل
          </span>
        </div>
      </div>
    </motion.article>
  )
}
