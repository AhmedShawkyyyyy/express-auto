import { motion } from 'framer-motion'
import { easeLux } from '../lib/motion'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  y = 30,
  x = 0,
  once = true,
  amount = 0.2,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: easeLux }}
    >
      {children}
    </motion.div>
  )
}
