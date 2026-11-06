import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Clock3,
  Headset,
  MapPin,
  Navigation,
  PhoneCall,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import FadeImage from "../components/FadeImage";
import { WhatsAppIcon } from "../components/icons/BrandIcons";
import { brands, featuredCars, heroImage } from "../data/cars";
import {
  ADDRESS,
  PRIMARY_PHONE,
  formatPhone,
  mapsLink,
  telLink,
  whatsappLink,
} from "../data/contact";
import { siteConfig } from "../data/siteConfig";

const easeLux = [0.22, 1, 0.36, 1];
const easeSoft = [0.16, 1, 0.3, 1];

const homeBrands = brands.filter((brand) => brand !== "الكل");

const valueItems = [
  {
    icon: ShieldCheck,
    title: "ضمان على كل سيارة",
    text: "تفاصيل الضمان ومدته مكتوبة قبل الحجز.",
  },
  {
    icon: ReceiptText,
    title: "أسعار واضحة",
    text: "السعر والمصاريف معلنة من أول زيارة، بدون مفاجآت.",
  },
  {
    icon: Headset,
    title: "متابعة بعد التسليم",
    text: "فريق خدمة العملاء معك بعد الاستلام في الصيانة والضمان والاستفسارات.",
  },
];

const heroTrustItems = [
  "ضمان على جميع السيارات",
  "موديلات 2027 متاحة",
  "استشارة شخصية",
];

const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=15&output=embed&hl=ar`;

const heroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easeLux },
  },
};

const sectionContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.08 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.04 } },
};

const sectionItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeSoft },
  },
};

const brandContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const brandItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeSoft },
  },
};

function SectionReveal({
  children,
  className = "",
  amount = 0.15,
  variants = sectionContainer,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : "hidden"}
      animate={inView || reduceMotion ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

function HomeCarCard({ car, onOpen }) {
  const reduceMotion = useReducedMotion();
  const modelName = car.name.startsWith(car.brand)
    ? car.name.slice(car.brand.length).trim()
    : car.name;

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(car)}
      variants={sectionItem}
      whileHover={
        reduceMotion ? undefined : { y: -2, transition: { duration: 0.2 } }
      }
      whileTap={{ y: 0 }}
      className="cars-card group block w-full cursor-pointer overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface text-right transition-[transform,border-color] duration-200"
      aria-label={`عرض تفاصيل ${car.name}`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-surface-2">
        <FadeImage
          src={car.image}
          alt={car.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="cars-card-title truncate font-bold text-ivory">
          <span className="font-medium text-muted">{car.brand}</span>{" "}
          <bdi>{modelName}</bdi>
        </h3>

        <p className="cars-specs mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>{car.category}</span>
          <span aria-hidden="true">·</span>
          <span>{car.specs.fuel}</span>
          <span aria-hidden="true">·</span>
          <span>{car.specs.power}</span>
          <span aria-hidden="true">·</span>
          <span className="cars-year">موديل {car.year}</span>
        </p>

        <div className="mt-4 border-t border-line pt-4">
          <span className="cars-from block">يبدأ من</span>
          <span className="cars-price mt-1 block">
            <span dir="ltr" className="bidi-isolate font-latin">
              {car.price}
            </span>{" "}
            <span className="cars-currency">ج.م</span>
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export default function HomePage({ navigate, onOpenCar }) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="relative mt-[76px] min-h-[calc(100svh-76px)] overflow-hidden bg-night">
        <div className="absolute inset-x-0 top-0 h-[36svh] bg-surface-2 md:inset-0 md:h-full">
          <FadeImage
            src={heroImage}
            alt="سيارتا بي واي دي Ti 7 على طريق صحراوي"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[34%_center] md:object-[62%_center]"
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(to left, rgba(11,11,12,.88) 0%, rgba(11,11,12,.55) 38%, transparent 72%), linear-gradient(to top, #0b0b0c 0%, rgba(11,11,12,0) 26%)',
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

      <section
        aria-label="العلامات المتاحة"
        className="brand-strip border-y border-line bg-night"
      >
        <div className="container-lux">
          <SectionReveal
            amount={0.4}
            variants={brandContainer}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-1 sm:justify-between"
          >
            {homeBrands.map((brand) => (
              <motion.a
                key={brand}
                href="#/showroom"
                onClick={() =>
                  window.sessionStorage.setItem("express:brand", brand)
                }
                className="brand-strip-link flex min-h-11 items-center"
                aria-label={`عرض سيارات ${brand}`}
                variants={brandItem}
              >
                {brand}
              </motion.a>
            ))}
          </SectionReveal>
        </div>
      </section>

      <div className="theme-light">
        <section aria-labelledby="why-us-title" className="home-section">
          <SectionReveal className="container-lux why-layout">
            <motion.div className="why-head" variants={sectionItem}>
              <div>
                <h2 id="why-us-title" className="home-section-title text-ivory">
                  لماذا إكسبريس أوتو؟
                </h2>
                <p className="home-section-lede mt-3">
                  وضوح من أول زيارة، ودعم يستمر بعد التسليم.
                </p>
              </div>
            </motion.div>

            <motion.ul variants={staggerContainer} className="why-list">
              {valueItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.title}
                    variants={sectionItem}
                    className="why-row"
                  >
                    <Icon
                      size={28}
                      strokeWidth={1.6}
                      className="why-icon"
                      aria-hidden="true"
                    />
                    <div className="why-content">
                      <h3 className="why-title">{item.title}</h3>
                      <p className="why-desc">{item.text}</p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </SectionReveal>
        </section>

        <section>
          <SectionReveal className="container-lux home-section">
            <motion.div
              className="flex flex-wrap items-center justify-between gap-4"
              variants={sectionItem}
            >
              <h2 className="home-section-title text-ivory">سيارات مختارة</h2>
              <button
                type="button"
                onClick={() => navigate("showroom")}
                className="btn btn-secondary"
              >
                عرض جميع السيارات
                <ArrowLeft size={16} />
              </button>
            </motion.div>

            <motion.div
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
            >
              {featuredCars.map((car) => (
                <HomeCarCard key={car.id} car={car} onOpen={onOpenCar} />
              ))}
            </motion.div>
          </SectionReveal>
        </section>

        <section>
          <SectionReveal className="container-lux home-section">
            <motion.div variants={sectionItem}>
              <h2 className="home-section-title text-ivory">
                المعرض على طريق مصر – الإسماعيلية
              </h2>
            </motion.div>

            <motion.div
              className="mt-10 grid gap-6 lg:grid-cols-12"
              variants={staggerContainer}
            >
              <motion.div
                className="loc-card rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8 lg:col-span-5"
                variants={sectionItem}
              >
                <div className="loc-rows">
                  <div className="loc-row">
                    <MapPin
                      size={20}
                      strokeWidth={1.8}
                      className="mt-1 shrink-0 text-muted"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="loc-label">العنوان</h3>
                      <p className="loc-text mt-2">{ADDRESS}</p>
                    </div>
                  </div>

                  {siteConfig.workingHours && (
                    <div className="loc-row">
                      <Clock3
                        size={20}
                        strokeWidth={1.8}
                        className="mt-1 shrink-0 text-muted"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="loc-label">ساعات العمل</h3>
                        <p className="loc-note mt-1">
                          {siteConfig.workingHours}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="loc-row">
                    <PhoneCall
                      size={20}
                      strokeWidth={1.8}
                      className="mt-1 shrink-0 text-muted"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="loc-label">الهاتف</h3>
                      <a
                        href={telLink(PRIMARY_PHONE)}
                        className="phone-number loc-phone mt-1 flex min-h-11 items-center"
                      >
                        {formatPhone(PRIMARY_PHONE)}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="loc-actions">
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary loc-btn"
                  >
                    <Navigation size={16} />
                    افتح في خرائط جوجل
                  </a>
                  <a
                    href={telLink(PRIMARY_PHONE)}
                    className="btn btn-secondary loc-btn"
                  >
                    <PhoneCall size={16} />
                    اتصل بنا
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="loc-map relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2 lg:col-span-7"
                variants={sectionItem}
              >
                <iframe
                  title="خريطة موقع معرض إكسبريس أوتو على طريق مصر الإسماعيلية"
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="loc-map-frame relative z-10 h-full w-full border-0 bg-surface-2"
                />
              </motion.div>
            </motion.div>
          </SectionReveal>
        </section>

      </div>
    </>
  );
}
