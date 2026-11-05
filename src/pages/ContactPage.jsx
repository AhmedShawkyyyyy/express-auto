import { motion } from 'framer-motion'
import {
  ArrowUpLeft,
  CalendarDays,
  MapPin,
  MessageCircle,
  Navigation,
  PhoneCall,
  Sparkles,
} from 'lucide-react'
import MapArtwork from '../components/MapArtwork'
import Reveal from '../components/Reveal'
import {
  ADDRESS,
  PHONE_NUMBERS,
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  formatPhone,
  mapsLink,
  telLink,
  whatsappLink,
} from '../data/contact'

const advisorMessage = 'مرحبًا إكسبريس أوتو، أرغب في التحدث مع مستشار مبيعات.'

export default function ContactPage({ navigate, onBook }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.07] bg-black pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="grid-surface absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-brand/[0.07] blur-[140px]" />
        <div className="pointer-events-none absolute left-6 top-24 hidden select-none font-latin text-[17rem] font-extrabold leading-none tracking-[-0.08em] text-white/[0.018] xl:block">
          15
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
              <span className="text-brand">تواصل معنا</span>
            </div>
          </Reveal>

          <div className="mt-7 grid items-end gap-9 lg:grid-cols-12">
            <Reveal className="lg:col-span-8" delay={0.05}>
              <span className="eyebrow eyebrow-ar">نحن هنا لخدمتك</span>
              <h1 className="mt-5 text-[clamp(2.85rem,6.2vw,5.8rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
                مكالمة واحدة...
                <br />
                <span className="glow-yellow text-brand">تفصلك عن سيارتك.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-8 text-white/45 sm:text-base">
                فريق من المستشارين المتخصصين جاهز لمساعدتك في اختيار السيارة،
                معرفة المواصفات، وحجز تجربة القيادة. تواصل بالطريقة التي تناسبك.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={telLink(PRIMARY_PHONE)} className="btn btn-primary !px-7">
                  <PhoneCall size={17} />
                  اتصل بنا الآن
                </a>
                <a
                  href={whatsappLink(PRIMARY_PHONE, advisorMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary !px-7"
                >
                  <MessageCircle size={17} className="text-brand" />
                  راسلنا على واتساب
                </a>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-4" delay={0.14}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-black">
                    <MapPin size={15} />
                  </span>
                  <span className="text-xs font-bold text-white/75">المعرض الرئيسي</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/45">{ADDRESS}</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3.5">
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-white/60 transition-colors hover:text-brand"
                  >
                    <Navigation size={12} />
                    الاتجاهات
                  </a>
                  <span className="flex items-center gap-1.5 text-[10px] text-white/25">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    نستقبلكم طوال الأسبوع
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] bg-[#050505]">
        <div className="container-lux grid gap-px overflow-hidden py-0 sm:grid-cols-3">
          <Reveal className="flex items-center gap-4 border-b border-white/[0.07] py-7 sm:border-b-0 sm:border-l sm:px-6 sm:last:border-l-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-brand">
              <PhoneCall size={16} />
            </span>
            <div>
              <span className="block text-[9px] text-white/30">الخط المباشر</span>
              <a
                href={telLink(PRIMARY_PHONE)}
                dir="ltr"
                className="mt-1 block font-latin text-sm font-bold tracking-wider text-white transition-colors hover:text-brand"
              >
                {formatPhone(PRIMARY_PHONE)}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="flex items-center gap-4 border-b border-white/[0.07] py-7 sm:border-b-0 sm:border-l sm:px-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-brand">
              <MessageCircle size={16} />
            </span>
            <div>
              <span className="block text-[9px] text-white/30">واتساب المبيعات</span>
              <a
                href={whatsappLink(SECONDARY_PHONE, advisorMessage)}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-sm font-bold text-white transition-colors hover:text-brand"
              >
                استفسر الآن
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="flex items-center gap-4 py-7 sm:px-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-brand">
              <CalendarDays size={16} />
            </span>
            <div>
              <span className="block text-[9px] text-white/30">استشارة خاصة</span>
              <button
                type="button"
                onClick={onBook}
                className="mt-1 flex items-center gap-1.5 text-sm font-bold text-white transition-colors hover:text-brand"
              >
                احجز موعدك
                <ArrowUpLeft size={12} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-20 sm:py-28">
        <div className="pointer-events-none absolute left-0 top-1/2 h-[380px] w-[380px] rounded-full bg-brand/[0.035] blur-[130px]" />

        <div className="container-lux relative">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <span className="eyebrow eyebrow-ar">مستشارو المبيعات</span>
              <h2 className="display-title mt-4 text-white">
                أرقام رسمية.
                <br />
                <span className="text-white/30">استجابة أسرع.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-sm leading-7 text-white/40">
                اختر الرقم الأنسب لك للاتصال المباشر، أو أرسل رسالة واتساب وسيتواصل
                معك المستشار المختص.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PHONE_NUMBERS.map((phone, index) => (
              <motion.div
                key={phone}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index * 0.035, 0.28),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080808] p-4 transition-all duration-400 hover:border-brand/25 hover:bg-[#0b0b0b] sm:p-5"
              >
                <span className="pointer-events-none absolute -left-2 -top-5 font-latin text-6xl font-extrabold leading-none tracking-tighter text-white/[0.025] transition-colors duration-500 group-hover:text-brand/[0.035]">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="relative flex items-start justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand/15 bg-brand/[0.05] text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-black">
                    <PhoneCall size={14} />
                  </span>
                  <span className="text-[9px] font-semibold text-white/24">
                    مستشار مبيعات
                  </span>
                </div>

                <a
                  href={telLink(phone)}
                  dir="ltr"
                  className="relative mt-4 block w-fit font-latin text-lg font-bold tracking-[0.06em] text-white transition-colors hover:text-brand sm:text-xl"
                >
                  {formatPhone(phone)}
                </a>

                <div className="relative mt-3.5 grid grid-cols-2 gap-2">
                  <a
                    href={telLink(phone)}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] py-2 text-[10px] font-semibold text-white/55 transition-all duration-300 hover:border-brand/40 hover:text-brand"
                  >
                    <PhoneCall size={11} />
                    اتصال
                  </a>
                  <a
                    href={whatsappLink(phone, advisorMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.025] py-2 text-[10px] font-semibold text-white/55 transition-all duration-300 hover:border-brand/40 hover:text-brand"
                  >
                    <MessageCircle size={11} />
                    واتساب
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <Reveal className="mt-7 flex items-center justify-center gap-2 text-[10px] text-white/25">
            <Sparkles size={12} className="text-brand/70" />
            جميع الأرقام رسمية وتتبع إكسبريس أوتو
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/[0.07] bg-[#050505] py-20 sm:py-28">
        <div className="pointer-events-none absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-brand/[0.05] blur-[125px]" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-64 w-64 rounded-full bg-brand/[0.035] blur-[110px]" />
        <div className="container-lux relative">
          <div className="grid items-stretch gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="flex h-full flex-col justify-center rounded-[22px] border border-white/[0.08] bg-[#080808] p-7 sm:p-10">
                <span className="eyebrow eyebrow-ar">موقع المعرض</span>
                <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  الطريق إلينا
                  <br />
                  <span className="text-brand">أسهل من أي وقت.</span>
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/40">{ADDRESS}</p>

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-brand" />
                  <div>
                    <p className="text-xs font-semibold text-white/70">علامات مميزة</p>
                    <p className="mt-1 text-[11px] leading-6 text-white/35">
                      بجوار الأكوابارك، أمام مدينة المستقبل — على طريق مصر
                      الإسماعيلية الصحراوي.
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary flex-1"
                  >
                    <Navigation size={15} />
                    افتح الخريطة
                  </a>
                  <a href={telLink(PRIMARY_PHONE)} className="btn btn-secondary flex-1">
                    <PhoneCall size={15} />
                    اتصل بنا
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="min-h-[360px] overflow-hidden rounded-[22px] border border-white/[0.08] lg:col-span-7">
              <MapArtwork className="h-full min-h-[360px]" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-16 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[620px] -translate-x-1/2 rounded-full bg-brand/[0.04] blur-[120px]" />
        <div className="container-lux relative">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-6 rounded-[24px] border border-brand/15 bg-[linear-gradient(110deg,rgba(242,227,10,0.075),rgba(10,10,10,0.6)_55%)] p-7 text-center sm:flex-row sm:p-9 sm:text-right">
              <div>
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                  تفضل بزيارة المعرض؟
                </h2>
                <p className="mt-2 text-sm text-white/40">
                  احجز استشارتك الشخصية قبل الزيارة، ونجهز لك تجربة مخصصة.
                </p>
              </div>
              <button type="button" onClick={onBook} className="btn btn-primary shrink-0 !px-7">
                احجز استشارتك
                <ArrowUpLeft size={16} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
