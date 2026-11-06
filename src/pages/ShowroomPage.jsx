import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  MessageCircle,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import CarCard from '../components/CarCard'
import Reveal from '../components/Reveal'
import { brands, cars, categories } from '../data/cars'
import { whatsappLink } from '../data/contact'

export default function ShowroomPage({ onOpenCar, navigate }) {
  const [activeBrand, setActiveBrand] = useState(() => {
    const savedBrand = window.sessionStorage.getItem('express:brand')
    return brands.includes(savedBrand) ? savedBrand : 'الكل'
  })
  const [activeCategory, setActiveCategory] = useState('الكل')

  useEffect(() => {
    window.sessionStorage.removeItem('express:brand')
  }, [])

  const filteredCars = useMemo(
    () =>
      cars.filter(
        (car) =>
          (activeBrand === 'الكل' || car.brand === activeBrand) &&
          (activeCategory === 'الكل' || car.category === activeCategory),
      ),
    [activeBrand, activeCategory],
  )

  const hasFilters = activeBrand !== 'الكل' || activeCategory !== 'الكل'

  const resetFilters = () => {
    setActiveBrand('الكل')
    setActiveCategory('الكل')
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.07] bg-black pb-14 pt-36 sm:pb-16 sm:pt-44">
        <div className="absolute inset-0">
          <img
            src={cars.find((car) => car.id === 'peugeot-3008-gt')?.image || cars[0].image}
            alt="سيارة بيجو 3008 GT داخل معرض إكسبريس أوتو"
            className="h-full w-full object-cover object-center opacity-[0.14]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/60 to-black/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
          <div className="grid-surface absolute inset-0 opacity-60" />
        </div>

        <div className="container-lux relative">
          <Reveal>
            <div className="flex items-center gap-2 text-[10px] text-white/30">
              <button
                type="button"
                onClick={() => navigate('home')}
                className="transition-colors hover:text-white/60"
              >
                الرئيسية
              </button>
              <span className="text-white/15">/</span>
              <span className="text-brand">معرض السيارات</span>
            </div>
          </Reveal>

          <div className="mt-7 grid items-end gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-8" delay={0.05}>
              <span className="eyebrow eyebrow-ar">معرض إكسبريس أوتو</span>
              <h1 className="mt-4 text-[clamp(3rem,7vw,6.5rem)] font-extrabold leading-[1.03] tracking-[-0.04em] text-white">
                اختر سيارتك.
                <br />
                <span className="text-brand">بثقة.</span>
              </h1>
            </Reveal>

            <Reveal className="lg:col-span-4 lg:pb-2" delay={0.12}>
              <p className="max-w-sm text-sm leading-7 text-white/45">
                مجموعة منتقاة من السيارات الجديدة لعام 2025، بمواصفات كاملة وأسعار
                واضحة. اضغط على أي سيارة لاستكشافها بالتفصيل.
              </p>
              <div className="mt-6 flex items-center gap-5 text-[10px] text-white/35">
                <span>
                  <strong className="font-latin text-base font-bold text-white">
                    {String(cars.length).padStart(2, '0')}
                  </strong>{' '}
                  سيارة متاحة
                </span>
                <span className="h-4 w-px bg-white/10" />
                <span>
                  <strong className="font-latin text-base font-bold text-white">
                    {String(brands.length - 1).padStart(2, '0')}
                  </strong>{' '}
                  علامة عالمية
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] pb-24 pt-10 sm:pb-32 sm:pt-12">
        <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-brand/[0.05] blur-[140px]" />
        <div className="pointer-events-none absolute bottom-20 right-0 h-80 w-80 rounded-full bg-brand/[0.035] blur-[120px]" />
        <div className="container-lux relative">
          <Reveal>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a0a] p-4 sm:p-5">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="ml-1 flex items-center gap-2 text-[10px] font-semibold text-white/35">
                      <SlidersHorizontal size={13} />
                      العلامة
                    </span>
                    {brands.map((brand) => {
                      const active = activeBrand === brand
                      return (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => setActiveBrand(brand)}
                          className={`rounded-full border px-3.5 py-2 text-[11px] font-semibold transition-all duration-300 ${
                            active
                              ? 'border-brand bg-brand text-black'
                              : 'border-white/10 bg-white/[0.025] text-white/55 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          {brand}
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="ml-1 flex items-center gap-2 text-[10px] font-semibold text-white/35">
                      <Sparkles size={12} />
                      الفئة
                    </span>
                    {categories.map((category) => {
                      const active = activeCategory === category
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setActiveCategory(category)}
                          className={`rounded-full border px-3.5 py-2 text-[11px] font-semibold transition-all duration-300 ${
                            active
                              ? 'border-brand/60 bg-brand/[0.08] text-brand'
                              : 'border-white/10 bg-white/[0.025] text-white/55 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          {category}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] pt-4 xl:border-t-0 xl:pt-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white/30">النتائج</span>
                    <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-white/[0.06] px-2.5 font-latin text-xs font-bold text-white">
                      {String(filteredCars.length).padStart(2, '0')}
                    </span>
                  </div>

                  <AnimatePresence>
                    {hasFilters && (
                      <motion.button
                        type="button"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={resetFilters}
                        className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/45 transition-colors hover:border-brand/30 hover:text-brand"
                      >
                        <X size={11} />
                        مسح الفلاتر
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-xs text-white/35">
              {hasFilters ? 'نتائج البحث المخصصة' : 'جميع السيارات المتاحة'}
              <span className="mr-2 text-white/18">
                ({activeBrand !== 'الكل' ? activeBrand : 'كل العلامات'} ·{' '}
                {activeCategory !== 'الكل' ? activeCategory : 'كل الفئات'})
              </span>
            </p>
            <span className="hidden text-[10px] font-semibold text-white/20 sm:block">
              اضغط على السيارة لاستكشافها
            </span>
          </div>

          <motion.div layout className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} onOpen={onOpenCar} />
              ))}
            </AnimatePresence>
          </motion.div>

          <Reveal className="mt-14">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-[#0a0a0a] p-6 text-center sm:flex-row sm:p-7 sm:text-right">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand/20 bg-brand/[0.06] text-brand">
                  <MessageCircle size={20} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    لم تجد السيارة التي تناسبك؟
                  </h3>
                  <p className="mt-1 text-xs leading-6 text-white/35">
                    أخبرنا بما تبحث عنه، وسنوفره لك من شبكة وكلائنا.
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
                <a
                  href={whatsappLink(
                    undefined,
                    'مرحبًا إكسبريس أوتو، أبحث عن سيارة محددة وأود المساعدة.',
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary !px-5 text-[11px]"
                >
                  <MessageCircle size={15} />
                  اسأل مستشارًا
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
