import { motion } from 'framer-motion'

export default function Logo({
  onClick,
  className = 'h-10 sm:h-11',
  loading = 'eager',
}) {
  const image = (
    <img
      src={`${import.meta.env.BASE_URL}logo.png`}
      alt="إكسبريس أوتو — شاهد الفرق"
      width="2048"
      height="2048"
      draggable="false"
      loading={loading}
      decoding="async"
      className={`w-auto shrink-0 object-contain mix-blend-screen ${className}`}
    />
  )

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        className="group flex min-h-11 cursor-pointer items-center text-right"
        aria-label="إكسبريس أوتو — الرئيسية"
      >
        {image}
      </motion.button>
    )
  }

  return <div className="flex items-center">{image}</div>
}
