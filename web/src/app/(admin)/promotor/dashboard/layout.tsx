import DashboardHeader from '@/components/common/dashboard/header'
import DashboardSideBar from '@/components/common/dashboard/sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col md:flex-row">
      <DashboardSideBar />
      <main className="relative min-h-screen grow space-y-6 bg-secondary/20 p-6 mb-24 md:mb-0">
        <DashboardHeader />
        {children}
      </main>
    </div>
  )
}
