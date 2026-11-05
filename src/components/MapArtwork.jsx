import { MapPin, Navigation } from 'lucide-react'

export default function MapArtwork({ className = '' }) {
  return (
    <div className={`map-grid relative overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_40%,rgba(242,227,10,0.1),transparent_28%)]" />

      <svg
        viewBox="0 0 700 520"
        className="absolute inset-0 h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-40 410C110 360 150 275 278 272C395 269 450 330 560 300C640 278 690 220 750 218"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="34"
          strokeLinecap="round"
        />
        <path
          d="M-40 410C110 360 150 275 278 272C395 269 450 330 560 300C640 278 690 220 750 218"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth="1.5"
          strokeDasharray="10 14"
        />
        <path
          d="M175 -40C194 80 270 116 280 235C288 331 250 420 282 560"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="22"
        />
        <path
          d="M-40 155C115 145 200 105 330 140C438 169 480 235 740 240"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="12"
        />
        <path
          d="M470 -40C450 95 510 155 515 250C520 345 460 410 450 560"
          stroke="rgba(255,255,255,0.055)"
          strokeWidth="8"
        />
        <path
          d="M75 75C145 150 170 220 215 285C280 378 395 425 540 430"
          stroke="rgba(242,227,10,0.6)"
          strokeWidth="2.5"
          strokeDasharray="8 9"
          strokeLinecap="round"
        />
        <path
          d="M48 320C85 276 118 234 148 215C180 195 205 183 236 166"
          stroke="rgba(242,227,10,0.18)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      <span className="absolute right-[13%] top-[19%] text-[10px] font-medium text-white/30">
        مدينة المستقبل
      </span>
      <span className="absolute bottom-[22%] right-[19%] rounded-md border border-white/[0.06] bg-black/35 px-2 py-1 text-[9px] text-white/35 backdrop-blur-sm">
        طريق مصر الإسماعيلية
      </span>
      <span className="absolute left-[12%] top-[28%] text-[9px] font-medium text-white/25">
        طريق مصر — الإسماعيلية
      </span>

      <div className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="pulse-ring absolute inset-0 rounded-full border border-brand/50" />
          <span className="absolute inset-2 rounded-full bg-brand/[0.08]" />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brand text-black shadow-[0_0_38px_rgba(242,227,10,0.5)]">
            <MapPin size={19} strokeWidth={2.4} />
          </span>
        </div>
        <div className="absolute right-1/2 top-16 w-max translate-x-1/2 rounded-full border border-white/10 bg-black/75 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
          إكسبريس أوتو
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/45 backdrop-blur-md">
        <Navigation size={14} />
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[9px] text-white/40 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        الموقع التقريبي
      </div>
    </div>
  )
}
