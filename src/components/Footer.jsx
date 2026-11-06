import { MapPin } from 'lucide-react'
import Logo from './Logo'
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from './icons/BrandIcons'
import { brands } from '../data/cars'
import {
  ADDRESS,
  PHONE_NUMBERS,
  telLink,
  whatsappLink,
} from '../data/contact'
import { siteConfig } from '../data/siteConfig'

const currentYear = new Date().getFullYear()
const brandCount = brands.filter((brand) => brand !== 'الكل').length
const hasSocialLinks = Boolean(
  siteConfig.social.instagram ||
    siteConfig.social.facebook ||
    siteConfig.whatsappNumber,
)

const navLinks = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'showroom', label: 'معرض السيارات' },
  { id: 'contact', label: 'تواصل معنا' },
]

export default function Footer({ navigate }) {
  return (
    <footer className="border-t border-line bg-night">
      <div className="container-lux pb-8 pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo
              onClick={() => navigate('home')}
              className="h-10"
              loading="lazy"
            />
            <p className="site-footer-text mt-5 max-w-xs">
              سيارات جديدة من {brandCount} علامات عالمية.
            </p>

            {hasSocialLinks && (
              <div className="mt-5 flex items-center gap-2">
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="إنستغرام إكسبريس أوتو"
                    className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-line text-muted transition-colors duration-200 hover:border-white/20 hover:text-ivory"
                  >
                    <InstagramIcon size={18} />
                  </a>
                )}
                {siteConfig.social.facebook && (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="فيسبوك إكسبريس أوتو"
                    className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-line text-muted transition-colors duration-200 hover:border-white/20 hover:text-ivory"
                  >
                    <FacebookIcon size={18} />
                  </a>
                )}
                {siteConfig.whatsappNumber && (
                  <a
                    href={whatsappLink(siteConfig.whatsappNumber)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="تواصل مع إكسبريس أوتو عبر واتساب"
                    className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-line text-muted transition-colors duration-200 hover:border-white/20 hover:text-ivory"
                  >
                    <WhatsAppIcon size={18} />
                  </a>
                )}
              </div>
            )}
          </div>

          <nav className="lg:col-span-2" aria-label="روابط سريعة">
            <h2 className="site-footer-heading">روابط سريعة</h2>
            <div className="mt-6 flex flex-col items-start gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => navigate(link.id)}
                  className="site-footer-link min-h-11"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="site-footer-heading">العنوان</h2>
            <div className="site-footer-text mt-6 flex items-start gap-3">
              <MapPin
                size={18}
                strokeWidth={1.7}
                className="mt-1 shrink-0"
                aria-hidden="true"
              />
              <p>{ADDRESS}</p>
            </div>
            {siteConfig.workingHours && (
              <p className="site-footer-text mt-4">
                ساعات العمل: {siteConfig.workingHours}
              </p>
            )}
          </div>

          <div className="lg:col-span-3">
            <h2 className="site-footer-heading">الهاتف</h2>
            <div
              dir="ltr"
              className="mt-6 grid grid-cols-2 gap-x-2 gap-y-1 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
            >
              {PHONE_NUMBERS.map((phone) => (
                <a
                  key={phone}
                  href={telLink(phone)}
                  aria-label={`اتصل على ${phone}`}
                  className="phone-number site-footer-link flex min-h-11 items-center justify-center whitespace-nowrap tracking-tight"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="site-footer-copy">
            © {currentYear} إكسبريس أوتو. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}
