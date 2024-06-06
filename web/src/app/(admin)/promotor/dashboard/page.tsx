import { Metadata } from 'next'
import DashboardMain from '@/components/section/dashboard/Main'
import { getPromotor } from '@/utils/session/get-promotor'
import DashboardChart from '@/components/section/dashboard/Chart'

export async function generateMetadata(): Promise<Metadata> {
  const promotor = await getPromotor()
  return {
    title: promotor.promotorName,
  }
}
export default async function DashboardPage() {
  return (
    <div className="space-y-6">
        <DashboardMain />
        <DashboardChart />
    </div>
  )
}
