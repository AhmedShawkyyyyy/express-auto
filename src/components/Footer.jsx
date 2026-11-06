import { ArrowUp, Navigation } from 'lucide-react'
import Logo from './Logo'
import { FacebookIcon, InstagramIcon } from './icons/BrandIcons'
import { brands } from '../data/cars'
import {
  ADDRESS,
  MAPS_SHORT_LINK,
  PRIMARY_PHONE,
  formatPhone,
  telLink,
} from '../data/contact'
import { siteConfig } from '../data/siteConfig'
import '../styles/chrome.css'

const currentYear = new Date().getFullYear()
const footerBrands = brands.filter((brand) => brand !== 'الكل')
const brandCount = footerBrands.length
const hasSocialLinks = Boolean(
  siteConfig.social.instagram || siteConfig.social.facebook,
)

const quickLinks = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'showroom', label: 'معرض السيارات' },
  { id: 'contact', label: 'تواصل معنا' },
]

export default function Footer({ navigate }) {
  const selectBrand = (brand) => {
    window.sessionStorage.setItem('express:brand', brand)
    navigate('showroom')
    window.dispatchEvent(
      new CustomEvent('express:select-brand', { detail: brand }),
    )
  }

  return (
    <footer className="chrome-footer">
      <div className="container-lux">
        <div className="chrome-footer__grid">
          <div className="chrome-footer__brand">
            <Logo
              onClick={() => navigate('home')}
              className="h-10"
              loading="lazy"
            />
            <p className="chrome-footer__brand-desc">
              سيارات جديدة من {brandCount} علامات عالمية.
            </p>

            {hasSocialLinks && (
              <div className="chrome-footer__social">
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="إنستجرام"
                    className="chrome-footer__social-link"
                  >
                    <InstagramIcon size={18} />
                  </a>
                )}
                {siteConfig.social.facebook && (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="فيسبوك"
                    className="chrome-footer__social-link"
                  >
                    <FacebookIcon size={18} />
                  </a>
                )}
              </div>
            )}
          </div>

          <nav
            className="chrome-footer__col chrome-footer__cars"
            aria-label="السيارات"
          >
            <h2 className="chrome-footer__heading">السيارات</h2>
            {footerBrands.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => selectBrand(brand)}
                className="chrome-footer__link"
              >
                {brand}
              </button>
            ))}
          </nav>

          <nav
            className="chrome-footer__col chrome-footer__links"
            aria-label="روابط سريعة"
          >
            <h2 className="chrome-footer__heading">روابط سريعة</h2>
            {quickLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => navigate(link.id)}
                className="chrome-footer__link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="chrome-footer__col chrome-footer__contact">
            <h2 className="chrome-footer__heading">تواصل</h2>
            <p className="chrome-footer__address">{ADDRESS}</p>
            <a
              href={MAPS_SHORT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="chrome-footer__maps"
            >
              <Navigation size={15} aria-hidden="true" />
              افتح في خرائط جوجل
            </a>
            {siteConfig.workingHours && (
              <p className="chrome-footer__hours">
                ساعات العمل: {siteConfig.workingHours}
              </p>
            )}
            <a
              href={telLink(PRIMARY_PHONE)}
              dir="ltr"
              className="chrome-footer__phone"
            >
              {formatPhone(PRIMARY_PHONE)}
            </a>
            {siteConfig.secondaryPhone && (
              <a
                href={telLink(siteConfig.secondaryPhone)}
                dir="ltr"
                className="chrome-footer__phone-secondary"
              >
                {formatPhone(siteConfig.secondaryPhone)}
              </a>
            )}
            <button
              type="button"
              onClick={() => navigate('contact')}
              className="chrome-footer__link chrome-footer__all-numbers"
            >
              جميع أرقام المستشارين
            </button>
          </div>
        </div>

        <div className="chrome-footer__bottom">
          <p className="chrome-footer__copy">
            © {currentYear} إكسبريس أوتو. جميع الحقوق محفوظة.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="العودة إلى أعلى الصفحة"
            className="chrome-footer__top"
          >
            إلى الأعلى
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
