import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import CarDetailsModal from './components/CarDetailsModal'
import HomePage from './pages/HomePage'
import ShowroomPage from './pages/ShowroomPage'
import ContactPage from './pages/ContactPage'
import { useScrollLock } from './lib/scrollLock'

const validPages = ['home', 'showroom', 'contact']

const pageTitles = {
  home: 'إكسبريس أوتو | معرض سيارات جديدة',
  showroom: 'معرض السيارات | إكسبريس أوتو',
  contact: 'تواصل معنا | إكسبريس أوتو',
}

function readPage() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return validPages.includes(hash) ? hash : 'home'
}

export default function App() {
  const [page, setPage] = useState(readPage)
  const [selectedCar, setSelectedCar] = useState(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#/home')
    }

    const onHashChange = () => {
      setPage(readPage())
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.title = pageTitles[page] || pageTitles.home
  }, [page])

  const overlayOpen = Boolean(selectedCar)

  useScrollLock(overlayOpen)

  const navigate = useCallback(
    (nextPage) => {
      if (!validPages.includes(nextPage)) return

      if (nextPage === page) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      window.location.hash = `/${nextPage}`
    },
    [page],
  )

  const openCar = useCallback((car) => setSelectedCar(car), [])
  const closeCar = useCallback(() => setSelectedCar(null), [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <Navbar page={page} navigate={navigate} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={page}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {page === 'home' && (
            <HomePage navigate={navigate} onOpenCar={openCar} />
          )}
          {page === 'showroom' && (
            <ShowroomPage navigate={navigate} onOpenCar={openCar} />
          )}
          {page === 'contact' && <ContactPage navigate={navigate} />}
        </motion.main>
      </AnimatePresence>

      <Footer navigate={navigate} />
      <FloatingContact />

      <AnimatePresence>
        {selectedCar && (
          <CarDetailsModal
            key={selectedCar.id}
            car={selectedCar}
            onClose={closeCar}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
