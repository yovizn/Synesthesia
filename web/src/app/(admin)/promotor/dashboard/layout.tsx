import DashboardHeader from '@/components/common/dashboard/header'
import DashboardSideBar from '@/components/common/dashboard/sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/20 gap-4">
      <DashboardSideBar />
      <main className="flex size-full flex-col py-4 pr-4 max-md:px-4 gap-4 mb-20 md:mb-0">
        <DashboardHeader />
        {children}
      </main>
    </div>
  )
}
