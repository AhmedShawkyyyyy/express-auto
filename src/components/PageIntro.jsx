import Reveal from './Reveal'

export default function PageIntro({
  current,
  onHome,
  eyebrow,
  title,
  accent,
  description,
  image,
  imageAlt = '',
  aside,
  children,
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-night pb-16 pt-36 sm:pb-20 sm:pt-44">
      {image ? (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={imageAlt}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-night via-night/75 to-night/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/85" />
          <div className="grid-surface absolute inset-0 opacity-50" />
        </div>
      ) : (
        <>
          <div className="grid-surface absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-brand/[0.05] blur-[140px]" />
        </>
      )}

      <div className="container-lux relative">
        <Reveal delay={0.1}>
          <nav
            className="flex items-center gap-2 text-sm text-muted"
            aria-label="مسار التنقل"
          >
            <button
              type="button"
              onClick={onHome}
              className="transition-colors hover:text-ivory"
            >
              الرئيسية
            </button>
            <span className="text-dim">/</span>
            <span className="text-brand">{current}</span>
          </nav>
        </Reveal>

        <div className="mt-7 grid items-end gap-9 lg:grid-cols-12">
          <Reveal className="lg:col-span-8" delay={0.2}>
            <span className="eyebrow eyebrow-ar">{eyebrow}</span>
            <h1 className="display-title mt-5 text-ivory">
              {title}
              <br />
              <span className="text-brand">{accent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted">
              {description}
            </p>
            {children}
          </Reveal>

          {aside && (
            <Reveal className="lg:col-span-4" delay={0.35}>
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
