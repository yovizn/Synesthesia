import HeaderDashboard from '@/components/common/dashboard/header'
import { ReactNode } from 'react'

export const metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Dashboard',
  },
}

export default function PromotorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
