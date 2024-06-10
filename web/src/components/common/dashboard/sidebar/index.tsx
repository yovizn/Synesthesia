import Link from 'next/link'
import Logo from '../../Logo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarPlus, Home, MessageSquareText, PlusSquare, Ticket } from 'lucide-react'
import LinkSideBar from '../ui/link-sb'

export default function DashboardSideBar() {
  return (
    <aside className="fixed z-20 w-full max-md:bottom-0 md:sticky md:top-0 md:h-screen md:max-w-96">
      <nav className="flex size-full flex-col justify-between py-4 pl-4 max-md:pr-4">
        <Card className="size-full max-w-[450px] overflow-hidden max-md:mx-auto md:max-w-full">
          <CardHeader className="hidden md:block">
            <CardTitle>
              <Link
                title="Home"
                href="/"
                className="text-3xl"
              >
                <Logo />
              </Link>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-2.5 md:p-6">
            <ul className="flex flex-row items-center justify-between text-lg font-light md:h-auto md:flex-col md:items-start">
              <LinkSideBar
                title="Home"
                href="/"
                className="block transition-colors duration-200 hover:text-foreground md:hidden"
              >
                <Home className="block size-6 text-muted-foreground md:hidden" />
              </LinkSideBar>

              <LinkSideBar
                title="Dashboard"
                href="/promotor/dashboard"
                className="transition-colors duration-200 hover:text-foreground"
              >
                <CalendarPlus className="block size-6 text-muted-foreground md:hidden" />
              </LinkSideBar>

              <LinkSideBar
                title="Create Event"
                href="/promotor/create-event"
                className="block transition-colors duration-200 hover:text-foreground md:hidden"
              >
                <PlusSquare className="block size-6 text-muted-foreground md:hidden" />
              </LinkSideBar>

              <LinkSideBar
                title="Event"
                href="/promotor/dashboard/event"
                className="transition-colors duration-200 hover:text-foreground"
              >
                <Ticket className="block size-6 text-muted-foreground md:hidden" />
              </LinkSideBar>

              <LinkSideBar
                title="Review"
                href="/promotor/dashboard/review"
                className="transition-colors duration-200 hover:text-foreground"
              >
                <MessageSquareText className="block size-6 text-muted-foreground md:hidden" />
              </LinkSideBar>
            </ul>
          </CardContent>
        </Card>
      </nav>
    </aside>
  )
}
