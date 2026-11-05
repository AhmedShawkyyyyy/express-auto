import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  Clock3,
  Headset,
  MapPin,
  Navigation,
  PhoneCall,
  ReceiptText,
  ShieldCheck,
} from 'lucide-react'
import { WhatsAppIcon } from '../components/icons/BrandIcons'
import { brands, featuredCars, heroImage } from '../data/cars'
import {
  ADDRESS,
  PRIMARY_PHONE,
  formatPhone,
  mapsLink,
  telLink,
  whatsappLink,
} from '../data/contact'

const easeLux = [0.22, 1, 0.36, 1]

const brandSlugs = {
  ساوست: 'soueast',
  جيتور: 'jetour',
  'بي واي دي': 'byd',
  رينو: 'renault',
  بيجو: 'peugeot',
  'إم جي': 'mg',
}

const homeBrands = brands
  .filter((brand) => brand !== 'الكل')
  .map((brand) => ({ name: brand, slug: brandSlugs[brand] }))
  .filter((brand) => brand.slug)

const valueItems = [
  {
    icon: ShieldCheck,
    title: 'ضمان على كل سيارة',
    text: 'تفاصيل الضمان ومدته مكتوبة قبل الحجز.',
  },
  {
    icon: ReceiptText,
    title: 'أسعار واضحة',
    text: 'السعر والمصاريف معلنة من أول زيارة، بدون مفاجآت.',
  },
  {
    icon: Headset,
    title: 'متابعة بعد التسليم',
    text: 'فريق خدمة العملاء معك بعد الاستلام في الصيانة والضمان والاستفسارات.',
  },
]

const heroTrustItems = [
  'ضمان على جميع السيارات',
  'موديلات 2025 متاحة',
  'استشارة شخصية',
]

const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&hl=ar&z=15&output=embed`

const heroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeLux },
  },
}

const valueContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const valueItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function Reveal({
  children,
  className = '',
  delay = 0,
  y = 18,
  amount = 0.2,
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, delay, ease: easeLux }}
    >
      {children}
    </motion.div>
  )
}

function HomeCarCard({ car, onOpen, index = 0 }) {
  const reduceMotion = useReducedMotion()
  const modelName = car.name.startsWith(car.brand)
    ? car.name.slice(car.brand.length).trim()
    : car.name

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(car)}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.08, 0.24),
        ease: easeLux,
      }}
      className="group block w-full cursor-pointer overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface text-right transition-colors duration-200 hover:border-white/20"
      aria-label={`عرض تفاصيل ${car.name}`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-surface-2">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="home-card-title truncate font-bold text-ivory">
          <span className="font-medium text-muted">{car.brand}</span>{' '}
          <bdi>{modelName}</bdi>{' '}
          <span className="home-caption font-normal text-dim">{car.year}</span>
        </h3>

        <p className="home-card-meta mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
          <span>{car.category}</span>
          <span aria-hidden="true">·</span>
          <span>{car.specs.fuel}</span>
          <span aria-hidden="true">·</span>
          <span>{car.specs.power}</span>
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <span className="home-caption text-dim">يبدأ من</span>
          <span className="home-card-title font-bold text-ivory">
            <span dir="ltr" className="bidi-isolate font-latin">
              {car.price}
            </span>{' '}
            <span className="home-caption font-medium text-muted">ج.م</span>
          </span>
        </div>
      </div>
    </motion.button>
  )
}

export default function HomePage({ navigate, onOpenCar, onBook }) {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <section className="relative mt-[76px] min-h-[calc(100svh-76px)] overflow-hidden bg-night">
        <div className="absolute inset-x-0 top-0 h-[36svh] md:inset-0 md:h-full">
          <motion.img
            src={heroImage}
            alt="سيارة بي واي دي Ti 7 على طريق صحراوي"
            initial={reduceMotion ? false : { scale: 1.035 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: easeLux }}
            className="h-full w-full object-cover object-[34%_center] md:object-[55%_center]"
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(to left, rgba(0,0,0,.85), rgba(0,0,0,.35) 50%, transparent 80%)',
            }}
          />
          <div className="absolute inset-0 md:hidden bg-[linear-gradient(to_top,#0B0B0C_2%,rgba(11,11,12,.8)_36%,rgba(11,11,12,.08)_78%)]" />
        </div>

        <div className="container-lux relative flex min-h-[calc(100svh-76px)] flex-col justify-end pb-4 pt-[32svh] md:justify-center md:pb-20 md:pt-20">
          <motion.div
            className="max-w-[660px]"
            variants={heroContainer}
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
          >
            <motion.h1 variants={heroItem} className="home-h1 text-ivory">
              <span className="block">سيارات جديدة.</span>
              <span className="block text-brand">هتشوف الفرق بعينك.</span>
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="home-body mt-4 max-w-[590px] text-muted md:mt-5"
            >
              ساوست وجيتور وبي واي دي ورينو وبيجو وإم جي في مكان واحد. شاهد
              السيارة على الطبيعة، وجرّبها، ثم قرّر.
            </motion.p>

            <motion.div
              variants={heroItem}
              className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8"
            >
              <button
                type="button"
                onClick={() => navigate('showroom')}
                className="btn btn-primary"
              >
                استعرض السيارات
                <ArrowLeft size={17} />
              </button>
              <a
                href={whatsappLink(
                  PRIMARY_PHONE,
                  'مرحبًا إكسبريس أوتو، أرغب في الاستفسار عن السيارات المتاحة.',
                )}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                <WhatsAppIcon size={17} />
                تواصل واتساب
              </a>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="home-small mt-8 flex flex-wrap gap-x-7 gap-y-2 border-t border-line pt-4 text-muted md:mt-10 md:pt-5"
            >
              {heroTrustItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section aria-label="العلامات المتاحة" className="border-y border-line bg-night">
        <div className="container-lux py-5">
          <Reveal amount={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-1 sm:justify-between">
              {homeBrands.map((brand) => (
                <a
                  key={brand.name}
                  href="#/showroom"
                  onClick={() =>
                    window.sessionStorage.setItem('express:brand', brand.name)
                  }
                  className="flex min-h-11 items-center opacity-70 transition-opacity duration-200 hover:opacity-100"
                  aria-label={`عرض سيارات ${brand.name}`}
                >
                  <img
                    src={`/brands/${brand.slug}.svg`}
                    alt={brand.name}
                    className="h-7 w-auto"
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="why-us-title" className="section-space">
        <div className="container-lux">
          <Reveal>
            <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
              <h2 id="why-us-title" className="home-h2 text-ivory lg:col-span-7">
                لماذا إكسبريس أوتو؟
              </h2>
              <p className="home-card-meta max-w-md text-muted lg:col-span-5 lg:justify-self-end lg:pb-1">
                وضوح من أول زيارة، ودعم يستمر بعد التسليم.
              </p>
            </div>
          </Reveal>

          <motion.ul
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={valueContainer}
            className="mt-12 grid gap-10 md:grid-cols-3"
          >
            {valueItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.li
                  key={item.title}
                  variants={valueItem}
                  transition={{ duration: 0.55, ease: easeLux }}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.7}
                    className="text-muted"
                    aria-hidden="true"
                  />
                  <h3 className="home-card-title mt-4 font-bold text-ivory">
                    {item.title}
                  </h3>
                  <p className="home-card-meta mt-2 text-muted">{item.text}</p>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-lux section-space">
          <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="home-h2 text-ivory">سيارات مختارة</h2>
            <button
              type="button"
              onClick={() => navigate('showroom')}
              className="home-card-meta flex min-h-11 items-center gap-2 font-semibold text-muted transition-colors duration-200 hover:text-ivory"
            >
              عرض جميع السيارات
              <ArrowLeft size={16} />
            </button>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCars.map((car, index) => (
              <HomeCarCard
                key={car.id}
                car={car}
                index={index}
                onOpen={onOpenCar}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-lux section-space">
          <Reveal>
            <h2 className="home-h2 text-ivory">
              المعرض على طريق مصر – الإسماعيلية
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <Reveal className="rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8 lg:col-span-5">
              <div className="flex items-start gap-3">
                <MapPin
                  size={19}
                  strokeWidth={1.8}
                  className="mt-1 shrink-0 text-muted"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="home-caption font-medium text-dim">العنوان</h3>
                  <p className="mt-2 text-[16px] leading-[1.8] text-ivory">
                    {ADDRESS}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <div className="flex items-start gap-3">
                  <Clock3
                    size={19}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-muted"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="home-caption font-medium text-dim">ساعات العمل</h3>
                    <p className="home-card-meta mt-1 text-muted">
                      يرجى الاتصال للتأكيد
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3">
                  <PhoneCall
                    size={19}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-muted"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="home-caption font-medium text-dim">الهاتف</h3>
                    <a
                      href={telLink(PRIMARY_PHONE)}
                      className="phone-number home-card-meta mt-1 block font-semibold text-ivory transition-colors duration-200 hover:text-muted"
                    >
                      {formatPhone(PRIMARY_PHONE)}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary flex-1"
                >
                  <Navigation size={16} />
                  افتح في خرائط جوجل
                </a>
                <a href={telLink(PRIMARY_PHONE)} className="btn btn-secondary flex-1">
                  <PhoneCall size={16} />
                  اتصل بنا
                </a>
              </div>
            </Reveal>

            <Reveal
              delay={0.08}
              className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface lg:col-span-7"
            >
              <iframe
                title="موقع معرض إكسبريس أوتو على الخريطة"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0 sm:h-[420px]"
                style={{ filter: 'grayscale(1) invert(.9) contrast(.9)' }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-lux section-space">
          <Reveal className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] border border-line bg-surface-2 p-6 md:flex-row md:items-center md:p-8">
            <h2 className="home-h2 max-w-[560px] text-ivory">
              جرّب السيارة قبل أن تقرّر
            </h2>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button type="button" onClick={onBook} className="btn btn-primary">
                احجز تجربة قيادة
              </button>
              <a
                href={whatsappLink(
                  PRIMARY_PHONE,
                  'مرحبًا إكسبريس أوتو، أرغب في حجز تجربة قيادة.',
                )}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                <WhatsAppIcon size={17} />
                تواصل واتساب
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
