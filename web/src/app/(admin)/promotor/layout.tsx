import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Dashboard',
  },
}

export default function PromotorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
