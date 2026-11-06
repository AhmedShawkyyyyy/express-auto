import { useState } from 'react'
import '../styles/brands.css'

const BRAND_FILES = {
  'بي واي دي': 'byd.svg',
  ساوست: 'soueast.png',
  جيتور: 'jetour.svg',
  رينو: 'renault.svg',
  بيجو: 'peugeot.svg',
  'إم جي': 'mg.svg',
  كيا: 'kia.png',
  هوندا: 'honda.svg',
  فيات: 'fiat.png',
}

export default function BrandLogo({ brand, className = '' }) {
  const [failed, setFailed] = useState(false)
  const file = BRAND_FILES[brand]

  if (failed || !file) {
    return (
      <span className={`brand-logo-fallback ${className}`} aria-hidden="true">
        {brand}
      </span>
    )
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}brands/${file}`}
      alt={brand}
      height={28}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`brand-logo-img ${
        brand === 'بي واي دي' ? 'brand-logo-img--byd' : ''
      } ${className}`}
    />
  )
}
