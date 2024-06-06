import { PromotorType } from '@/types/promotor.type'
import Link from 'next/link'
import Logo from '../../Logo'
import { getPromotor } from '@/utils/session/get-promotor'

export default async function DashboardSideBar() {
  const data = await getPromotor()

  return (
    <aside className="fixed bottom-0 h-24 w-full bg-background md:static md:h-screen md:w-96 md:border-r-2 z-20">
      <nav className="flex size-full flex-col">
        <Link
          href="/"
          className="hidden w-full items-center justify-center border-b-2 bg-secondary/50 py-4 text-center text-sm sm:h-20 sm:py-0 md:flex md:text-2xl"
        >
          <Logo />
        </Link>

        <div className="flex size-full flex-row items-center justify-evenly gap-0 px-0 py-0 text-muted-foreground md:flex-col md:items-start md:justify-normal md:gap-6 md:px-4 md:py-6">
          <Link
            href="/promotor/dashboard"
            className="transition-colors duration-200 hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/promotor/dashboard/event"
            className="transition-colors duration-200 hover:text-foreground"
          >
            Events
          </Link>
          <Link
            href="/promotor/dashboard/create-event"
            className="transition-colors duration-200 hover:text-foreground"
          >
            Events
          </Link>
        </div>
      </nav>
    </aside>
  )
}
