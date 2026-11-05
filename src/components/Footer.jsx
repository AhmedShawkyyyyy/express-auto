import { MapPin, PhoneCall } from 'lucide-react'
import Logo from './Logo'
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from './icons/BrandIcons'
import {
  ADDRESS,
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  formatPhone,
  telLink,
  whatsappLink,
} from '../data/contact'

const currentYear = new Date().getFullYear()

const navLinks = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'showroom', label: 'معرض السيارات' },
  { id: 'contact', label: 'تواصل معنا' },
]

export default function Footer({ navigate, onBook }) {
  return (
    <footer className="border-t border-line bg-night">
      <div className="container-lux pb-8 pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo onClick={() => navigate('home')} className="h-10" />
            <p className="mt-5 max-w-xs text-[15px] leading-[1.8] text-muted">
              سيارات جديدة من ست علامات عالمية.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <span
                role="img"
                aria-label="إنستغرام — الرابط غير متوفر"
                title="إنستغرام — الرابط غير متوفر"
                className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-line text-muted"
              >
                <InstagramIcon size={18} />
              </span>
              <span
                role="img"
                aria-label="فيسبوك — الرابط غير متوفر"
                title="فيسبوك — الرابط غير متوفر"
                className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-line text-muted"
              >
                <FacebookIcon size={18} />
              </span>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                aria-label="تواصل مع إكسبريس أوتو عبر واتساب"
                className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-line text-muted transition-colors duration-200 hover:border-white/20 hover:text-ivory"
              >
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </div>

          <nav className="lg:col-span-2" aria-label="روابط سريعة">
            <h2 className="text-[13px] font-semibold text-dim">روابط سريعة</h2>
            <div className="mt-4 flex flex-col items-start gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => navigate(link.id)}
                  className="min-h-11 text-[15px] text-muted transition-colors duration-200 hover:text-ivory"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={onBook}
                className="min-h-11 text-[15px] text-muted transition-colors duration-200 hover:text-ivory"
              >
                احجز تجربة قيادة
              </button>
            </div>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-[13px] font-semibold text-dim">العنوان</h2>
            <div className="mt-4 flex items-start gap-3 text-[15px] leading-[1.8] text-muted">
              <MapPin
                size={18}
                strokeWidth={1.7}
                className="mt-1 shrink-0"
                aria-hidden="true"
              />
              <p>{ADDRESS}</p>
            </div>
            <p className="mt-4 text-[13px] leading-6 text-dim">
              ساعات العمل: <span className="font-latin">TODO</span> — تُضاف ساعات
              العمل
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[13px] font-semibold text-dim">الهاتف</h2>
            <div className="mt-4 flex flex-col gap-1">
              <a
                href={telLink(PRIMARY_PHONE)}
                className="phone-number flex min-h-11 items-center gap-3 text-[15px] text-muted transition-colors duration-200 hover:text-ivory"
              >
                <PhoneCall size={17} strokeWidth={1.7} aria-hidden="true" />
                <span className="font-latin tracking-wide">
                  {formatPhone(PRIMARY_PHONE)}
                </span>
              </a>
              <a
                href={telLink(SECONDARY_PHONE)}
                className="phone-number flex min-h-11 items-center gap-3 text-[15px] text-muted transition-colors duration-200 hover:text-ivory"
              >
                <PhoneCall size={17} strokeWidth={1.7} aria-hidden="true" />
                <span className="font-latin tracking-wide">
                  {formatPhone(SECONDARY_PHONE)}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-[13px] text-dim">
            © {currentYear} إكسبريس أوتو. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}
