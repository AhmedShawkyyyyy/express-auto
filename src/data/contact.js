export const ADDRESS =
  'طريق مصر الإسماعيلية الصحراوي، بجوار الأكوابارك، أمام مدينة المستقبل'

export const PHONE_NUMBERS = [
  '01207294000',
  '01207194000',
  '01207243000',
  '01207183000',
  '01207293000',
  '01207264000',
  '01226888227',
  '01207284000',
  '01226888229',
  '01260070558',
  '01260050633',
  '01260090244',
  '01226888225',
  '01270005178',
  '01260020661',
]

export const PRIMARY_PHONE = PHONE_NUMBERS[0]
export const SECONDARY_PHONE = PHONE_NUMBERS[1]

export const formatPhone = (phone) =>
  phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')

export const telLink = (phone = PRIMARY_PHONE) => `tel:${phone}`

export const whatsappLink = (
  phone = PRIMARY_PHONE,
  message = 'مرحبًا إكسبريس أوتو، أرغب في الاستفسار عن السيارات المتاحة.',
) => {
  if (!phone) return null

  const international = phone.replace(/\D/g, '').replace(/^0/, '20')
  return `https://wa.me/${international}?text=${encodeURIComponent(message)}`
}

export const COORDS = { lat: 30.1730633, lng: 31.5350207 }

export const MAPS_SHORT_LINK = 'https://maps.app.goo.gl/9q9G4D42wfAxvqnm6'

export const mapEmbedUrl = `https://www.google.com/maps?q=${COORDS.lat},${COORDS.lng}&z=16&output=embed&hl=ar`

export const carInquiryMessage = (car) =>
  `مرحبًا إكسبريس أوتو، أرغب في معرفة المزيد عن ${car.name} موديل ${car.year} وسعرها وتوافرها.`
