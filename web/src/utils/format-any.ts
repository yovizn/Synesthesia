import { formatDistanceToNowStrict } from 'date-fns'

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount)
}

const formatDistance = (from: Date) => {
  return formatDistanceToNowStrict(from, {
    addSuffix: true,
  })
}

export { formatMoney, formatDistance }
