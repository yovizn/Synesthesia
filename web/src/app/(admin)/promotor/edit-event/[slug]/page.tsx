import Logo from '@/components/common/Logo'
import EditEventForm from '@/components/form/edit-event'
import { Button } from '@/components/ui/button'
import { getEventsDetail } from '@/utils/session/getEvent'
import Link from 'next/link'

export default async function EditEventPage({ params }: { params: { slug: string } }) {
  const event = await getEventsDetail(params.slug)

  return (
    <>
      <header className="flex h-20 w-full border-b px-6 shadow">
        <div className="mx-auto size-full max-w-screen-xl">
          <div className="flex size-full items-center justify-between">
            <Link
              href="/"
              className="text-lg md:text-2xl"
            >
              <Logo />
            </Link>
            <Button
              asChild
              variant={'ghost'}
            >
              <Link
                href="/promotor/dashboard"
                className="font-light uppercase text-muted-foreground"
              >
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex min-h-screen flex-col bg-card">
        <EditEventForm data={event} />
      </main>
    </>
  )
}
