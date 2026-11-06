import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  MessageCircle,
  SearchX,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import CarCard from '../components/CarCard'
import PageIntro from '../components/PageIntro'
import Reveal from '../components/Reveal'
import { brands, cars, categories } from '../data/cars'
import { whatsappLink } from '../data/contact'

function FilterGroup({ label, icon: Icon, items, active, onSelect }) {
  return (
    <div>
      <span className="flex items-center gap-2 text-sm font-semibold text-dim">
        <Icon size={15} aria-hidden="true" />
        {label}
      </span>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive = active === item
          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              aria-pressed={isActive}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? 'border-brand bg-brand text-ivory'
                  : 'border-line text-muted hover:border-ivory/30 hover:text-ivory'
              }`}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ShowroomStats() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 text-sm font-semibold text-muted">
        <Sparkles size={15} className="text-brand" aria-hidden="true" />
        اختيارات هذا الموسم
      </div>

      <div className="mt-6 grid grid-cols-2 gap-5">
        <div>
          <span className="font-latin text-3xl font-bold text-ivory">
            {String(cars.length).padStart(2, '0')}
          </span>
          <p className="mt-1 text-sm text-muted">سيارة متاحة</p>
        </div>
        <div>
          <span className="font-latin text-3xl font-bold text-ivory">
            {String(brands.length - 1).padStart(2, '0')}
          </span>
          <p className="mt-1 text-sm text-muted">علامة عالمية</p>
        </div>
      </div>

      <p className="mt-6 border-t border-white/10 pt-4 text-sm leading-6 text-dim">
        اضغط على أي سيارة لعرض المواصفات والأسعار بالتفصيل.
      </p>
    </div>
  )
}

export default function ShowroomPage({ onOpenCar, navigate }) {
  const [activeBrand, setActiveBrand] = useState(() => {
    const savedBrand = window.sessionStorage.getItem('express:brand')
    return brands.includes(savedBrand) ? savedBrand : 'الكل'
  })
  const [activeCategory, setActiveCategory] = useState('الكل')

  useEffect(() => {
    window.sessionStorage.removeItem('express:brand')

    const onSelectBrand = (event) => {
      if (!brands.includes(event.detail)) return
      setActiveBrand(event.detail)
      setActiveCategory('الكل')
      window.sessionStorage.removeItem('express:brand')
      window.setTimeout(() => {
        document
          .getElementById('showroom-list')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 0)
    }

    window.addEventListener('express:select-brand', onSelectBrand)
    return () =>
      window.removeEventListener('express:select-brand', onSelectBrand)
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
  const activeBrandHasCars =
    activeBrand === 'الكل' || cars.some((car) => car.brand === activeBrand)

  const resetFilters = () => {
    setActiveBrand('الكل')
    setActiveCategory('الكل')
  }

  const heroImage =
    cars.find((car) => car.id === 'peugeot-3008-gt')?.image || cars[0].image

  const scrollToListing = () => {
    document
      .getElementById('showroom-list')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <PageIntro
        current="معرض السيارات"
        onHome={() => navigate('home')}
        eyebrow="معرض إكسبريس أوتو"
        title="اختر سيارتك."
        accent="بثقة."
        description="مجموعة منتقاة من السيارات الجديدة، بمواصفات كاملة وأسعار واضحة. استخدم الفلاتر للوصول إلى سيارتك بسرعة."
        image={heroImage}
        imageAlt="سيارة بيجو 3008 GT داخل معرض إكسبريس أوتو"
        aside={<ShowroomStats />}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={scrollToListing}
            className="btn btn-primary"
          >
            استعرض السيارات
            <ArrowDown size={16} />
          </button>
          <a
            href={whatsappLink(
              undefined,
              'مرحبًا إكسبريس أوتو، أبحث عن سيارة محددة وأود المساعدة.',
            )}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            <MessageCircle size={16} />
            تواصل واتساب
          </a>
        </div>
      </PageIntro>

      <div className="theme-light">
        <section id="showroom-list" className="home-section scroll-mt-24">
          <div className="container-lux">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="home-section-title text-ivory">تصفح المعرض</h2>
                <p className="home-section-lede mt-3">
                  استخدم الفلاتر للوصول إلى العلامة أو الفئة المناسبة.
                </p>
              </div>
              <span
                aria-live="polite"
                className="rounded-full border border-line bg-surface-2 px-4 py-2 text-sm font-semibold text-ivory"
              >
                <span className="font-latin">
                  {String(filteredCars.length).padStart(2, '0')}
                </span>{' '}
                سيارة
              </span>
            </Reveal>

            <Reveal className="mt-10">
              <div className="rounded-[16px] border border-line bg-surface p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-base font-bold text-ivory">
                    <SlidersHorizontal size={17} aria-hidden="true" />
                    الفلاتر
                  </div>

                  <AnimatePresence>
                    {hasFilters && (
                      <motion.button
                        type="button"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.3 }}
                        onClick={resetFilters}
                        className="btn btn-secondary min-h-11 !px-4 text-sm"
                      >
                        <X size={14} />
                        مسح الفلاتر
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <FilterGroup
                    label="العلامة"
                    icon={SlidersHorizontal}
                    items={brands}
                    active={activeBrand}
                    onSelect={setActiveBrand}
                  />
                  <FilterGroup
                    label="الفئة"
                    icon={Sparkles}
                    items={categories}
                    active={activeCategory}
                    onSelect={setActiveCategory}
                  />
                </div>
              </div>
            </Reveal>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted">
                {hasFilters ? 'نتائج البحث المخصصة' : 'جميع السيارات المتاحة'}
                <span className="mr-2 text-dim">
                  ({activeBrand !== 'الكل' ? activeBrand : 'كل العلامات'} ·{' '}
                  {activeCategory !== 'الكل' ? activeCategory : 'كل الفئات'})
                </span>
              </p>
              <span className="text-sm text-dim">
                اضغط على السيارة لعرض التفاصيل
              </span>
            </div>

            {filteredCars.length === 0 ? (
              <div className="mt-8 flex flex-col items-center rounded-[16px] border border-line bg-surface px-6 py-16 text-center">
                <SearchX size={30} className="text-dim" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold text-ivory">
                  {activeBrandHasCars
                    ? 'لا توجد سيارات مطابقة'
                    : `لا توجد سيارات ${activeBrand} حاليًا`}
                </h3>
                <p className="mt-2 max-w-md text-base leading-7 text-muted">
                  {activeBrandHasCars
                    ? 'جرّب تغيير العلامة أو الفئة لعرض خيارات أخرى.'
                    : 'يمكنك تصفح العلامات المتاحة، أو التواصل معنا لمعرفة المتاح من هذه العلامة.'}
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="btn btn-secondary"
                  >
                    عرض كل السيارات
                  </button>
                  {!activeBrandHasCars && (
                    <button
                      type="button"
                      onClick={() => navigate('contact')}
                      className="btn btn-primary"
                    >
                      تواصل معنا
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <motion.div
                layout
                className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {filteredCars.map((car, index) => (
                    <CarCard
                      key={car.id}
                      car={car}
                      index={index}
                      onOpen={onOpenCar}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            <Reveal className="mt-14">
              <div className="flex flex-col items-start justify-between gap-6 rounded-[16px] border border-line bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-[#0b0b0c]">
                    <MessageCircle size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-ivory">
                      لم تجد السيارة التي تناسبك؟
                    </h3>
                    <p className="mt-2 max-w-xl text-base leading-7 text-muted">
                      أخبرنا بما تبحث عنه، وسنوفره لك من شبكة وكلائنا.
                    </p>
                  </div>
                </div>
                <a
                  href={whatsappLink(
                    undefined,
                    'مرحبًا إكسبريس أوتو، أبحث عن سيارة محددة وأود المساعدة.',
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary w-full sm:w-auto"
                >
                  <MessageCircle size={16} />
                  اسأل مستشارًا
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  )
}
