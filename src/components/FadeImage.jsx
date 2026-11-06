import { useEffect, useRef, useState } from 'react'

export default function FadeImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority,
  ...props
}) {
  const imageRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (imageRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-200 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
      {...props}
    />
  )
}
