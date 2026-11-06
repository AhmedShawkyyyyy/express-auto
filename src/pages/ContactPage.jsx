import { motion, useReducedMotion } from 'framer-motion'
import {
  Clock3,
  MapPin,
  MessageCircle,
  Navigation,
  PhoneCall,
  Sparkles,
} from 'lucide-react'
import PageIntro from '../components/PageIntro'
import Reveal from '../components/Reveal'
import { FacebookIcon, InstagramIcon } from '../components/icons/BrandIcons'
import {
  ADDRESS,
  MAPS_SHORT_LINK,
  PHONE_NUMBERS,
  PRIMARY_PHONE,
  formatPhone,
  mapEmbedUrl,
  telLink,
  whatsappLink,
} from '../data/contact'
import { siteConfig } from '../data/siteConfig'
import { easeLux } from '../lib/motion'

const advisorMessage = 'مرحبًا إكسبريس أوتو، أرغب في التحدث مع مستشار مبيعات.'

const socialLinks = [
  siteConfig.social.instagram && {
    label: 'إنستجرام',
    href: siteConfig.social.instagram,
    Icon: InstagramIcon,
  },
  siteConfig.social.facebook && {
    label: 'فيسبوك',
    href: siteConfig.social.facebook,
    Icon: FacebookIcon,
  },
].filter(Boolean)

function ContactQuickCard({
  href,
  external = false,
  icon: Icon,
  label,
  value,
  ltr = false,
  accent = false,
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="group flex min-h-[120px] items-center gap-4 rounded-[16px] border border-line bg-surface p-6 transition-colors duration-200 hover:border-ivory/25"
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
          accent
            ? 'bg-brand text-[#0b0b0c]'
            : 'bg-surface-2 text-ivory transition-colors group-hover:bg-brand group-hover:text-[#0b0b0c]'
        }`}
      >
        <Icon size={20} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <span className="text-sm text-dim">{label}</span>
        <span
          className={`mt-1 block truncate text-xl font-bold text-ivory ${
            ltr ? 'font-latin tracking-wide' : ''
          }`}
          dir={ltr ? 'ltr' : undefined}
        >
          {value}
        </span>
      </div>
    </a>
  )
}

function ContactPhoneCard({ phone, index, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.95,
        delay: Math.min(index * 0.08, 0.6),
        ease: easeLux,
      }}
      className="contact-phone-card group rounded-[16px] border border-line bg-surface p-5 transition-colors duration-200 hover:border-ivory/25"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-ivory transition-colors duration-200 group-hover:bg-brand group-hover:text-[#0b0b0c]">
          <PhoneCall size={16} aria-hidden="true" />
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-dim">مستشار مبيعات</span>
          <span className="font-latin text-[11px] font-semibold tracking-widest text-dim/70">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      <a
        href={telLink(phone)}
        dir="ltr"
        className="phone-number mt-4 block w-fit font-latin text-[1.35rem] font-bold tracking-wide text-ivory transition-colors hover:text-muted"
      >
        {formatPhone(phone)}
      </a>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <a
          href={telLink(phone)}
          aria-label={`اتصل على ${formatPhone(phone)}`}
          className="btn btn-secondary min-h-11 !px-3 text-sm"
        >
          <PhoneCall size={14} aria-hidden="true" />
          اتصال
        </a>
        <a
          href={whatsappLink(phone, advisorMessage)}
          target="_blank"
          rel="noreferrer"
          aria-label={`راسل ${formatPhone(phone)} على واتساب`}
          className="btn btn-secondary min-h-11 !px-3 text-sm"
        >
          <MessageCircle size={14} aria-hidden="true" />
          واتساب
        </a>
      </div>
    </motion.div>
  )
}

function ContactAddressCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-[#0b0b0c]">
          <MapPin size={17} aria-hidden="true" />
        </span>
        <span className="text-sm font-bold text-ivory">المعرض الرئيسي</span>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted">{ADDRESS}</p>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <a
          href={MAPS_SHORT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-ivory"
        >
          <Navigation size={14} aria-hidden="true" />
          الاتجاهات
        </a>
        {siteConfig.workingHours && (
          <span className="flex items-center gap-2 text-sm text-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {siteConfig.workingHours}
          </span>
        )}
      </div>
    </div>
  )
}

export default function ContactPage({ navigate }) {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <PageIntro
        current="تواصل معنا"
        onHome={() => navigate('home')}
        eyebrow="نحن هنا لخدمتك"
        title="مكالمة واحدة..."
        accent="تفصلك عن سيارتك."
        description="فريق من المستشارين المتخصصين جاهز لمساعدتك في اختيار السيارة ومعرفة المواصفات. تواصل بالطريقة التي تناسبك."
        aside={<ContactAddressCard />}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={telLink(PRIMARY_PHONE)} className="btn btn-primary">
            <PhoneCall size={17} />
            اتصل بنا الآن
          </a>
          <a
            href={whatsappLink(PRIMARY_PHONE, advisorMessage)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            <MessageCircle size={17} />
            راسلنا على واتساب
          </a>
        </div>
      </PageIntro>

      <div className="theme-light">
        <section className="home-section">
          <div className="container-lux">
            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal>
                <ContactQuickCard
                  href={telLink(PRIMARY_PHONE)}
                  icon={PhoneCall}
                  label="الخط المباشر"
                  value={formatPhone(PRIMARY_PHONE)}
                  ltr
                  accent
                />
              </Reveal>
              <Reveal delay={0.08}>
                <ContactQuickCard
                  href={whatsappLink(PRIMARY_PHONE, advisorMessage)}
                  external
                  icon={MessageCircle}
                  label="واتساب المبيعات"
                  value="راسلنا الآن"
                />
              </Reveal>
            </div>

            {socialLinks.length > 0 && (
              <Reveal className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-sm text-dim">تابعنا</span>
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ivory/25 hover:text-ivory"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </Reveal>
            )}

            <Reveal className="mt-16 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="home-section-title text-ivory">أرقام المبيعات</h2>
                <p className="home-section-lede mt-3">
                  اختر الرقم الأنسب لك للاتصال المباشر، أو أرسل رسالة واتساب
                  وسيتواصل معك المستشار المختص.
                </p>
              </div>
              <span className="rounded-full border border-line bg-surface-2 px-4 py-2 text-sm font-semibold text-ivory">
                <span className="font-latin">{PHONE_NUMBERS.length}</span> رقم
              </span>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PHONE_NUMBERS.map((phone, index) => (
                <ContactPhoneCard
                  key={phone}
                  phone={phone}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>

            <Reveal className="mt-8 flex items-center justify-center gap-2 text-sm text-muted">
              <Sparkles size={14} className="text-dim" aria-hidden="true" />
              جميع الأرقام رسمية وتتبع إكسبريس أوتو
            </Reveal>
          </div>
        </section>

        <section className="home-section">
          <div className="container-lux">
            <Reveal>
              <h2 className="home-section-title text-ivory">موقع المعرض</h2>
              <p className="home-section-lede mt-3">
                المعرض على طريق مصر – الإسماعيلية، بجوار الأكوابارك.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <Reveal className="loc-card rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8 lg:col-span-5">
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
                    href={MAPS_SHORT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
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
              </Reveal>

              <Reveal
                delay={0.12}
                className="loc-map relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2 lg:col-span-7"
              >
                <iframe
                  title="خريطة موقع معرض إكسبريس أوتو على طريق مصر الإسماعيلية"
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="loc-map-frame relative z-10 h-full w-full border-0 bg-surface-2"
                />
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
